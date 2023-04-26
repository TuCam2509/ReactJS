import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actions from '../../../store/actions'
import {faEdit,faTrash,faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import './ManagerDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import {getDetailInforDoctor} from '../../../services/useService'

const mdParser = new MarkdownIt(/* Markdown-it options */);//covert từ html sang text
class ManagerDoctor extends Component {
    constructor(props){
        super(props)
        this.state={
            contentMarkDown:'',
            contentHTML:'',
           selectedOption:null,
           description:'',
           listDoctors:[],
           hashOldData:false,
           listPrice:[],
           listPayment:[],
           listProvider:[],
           listClicnic:[],
           listSpecialty:[],
           selectePrice:'',
           selectesPay:'',
           selectedProvider:'',
           selectedClinic:'',
           slectedSpecialty:'',
           nameClinic:'',
           addressClinic:'',
           note:'',
           specialtyId:'',
           clinicId:''

          
        }
    }
    componentDidMount(){
        this.props.fetchAllDoctors()
        this.props.getRequiedDcotorInfo()
    
    }
    buidInputDataSelect=(inputData,type)=>{
        let result=[];
        let {language}=this.props
        if(inputData && inputData.length>0){
            if(type==='USER'){
                inputData.map((item,index)=>{
                    let object={}
                    let labelVi=`${item.lastName} ${item.firstName}`
                    let labelEn=`${item.firstName} ${item.lastName}`
    
                    object.label=language===LANGUAGES.VI ? labelVi : labelEn
                    object.value=item.id
                    result.push(object)
    
                })
            }
            if(type==='PRICE'){
                inputData.map((item,index)=>{
                    let object={}
                    let labelVi=`${item.valueVi}`
                    let labelEn=`${item.valueEn}`
    
                    object.label=language===LANGUAGES.VI ? labelVi : labelEn
                    object.value=item.keyMap
                    result.push(object)
    
                })
            }
            if(type==='PAYMENT' || type==='PROVINCE'){
                inputData.map((item,index)=>{
                    let object={}
                    let labelVi=`${item.valueVi}`
                    let labelEn=`${item.valueEn}`
    
                    object.label=language===LANGUAGES.VI ? labelVi : labelEn
                    object.value=item.keyMap
                    result.push(object)
    
                })

            }
            if(type==='SPECIALTY'){
                inputData.map((item,index)=>{
                    let object={}
                    object.label=item.name
                    object.value=item.id
                    result.push(object)
    
                })

            }
            if(type==='CLINIC'){
                inputData.map((item,index)=>{
                    let object={}
                    object.label=item.name
                    object.value=item.id
                    result.push(object)
    
                })

            }

        }
        return result

    }
    componentDidUpdate(prevProps, prevState,snapshot){
        if(prevProps.allDoctors !==this.props.allDoctors){//nếu như state allDoctors thay đổi
            let dataSelect=this.buidInputDataSelect(this.props.allDoctors,'USER')
            this.setState({
                listDoctors:dataSelect
            })
        }
       
        if(prevProps.allRequireData !==this.props.allRequireData){
            let {resPrice,resPayment,resPro,resSpecialty,resClinic}=this.props.allRequireData
            let dataSelectPrice=this.buidInputDataSelect(resPrice,'PRICE')
            let dataSelectPayment=this.buidInputDataSelect(resPayment,'PAYMENT')
            let dataSelectProvi=this.buidInputDataSelect(resPro,'PROVINCE')
            let dataSelectSpec=this.buidInputDataSelect(resSpecialty,'SPECIALTY')
            let dataSelectClinic=this.buidInputDataSelect(resClinic,"CLINIC")

            console.log(dataSelectPrice)
            console.log(dataSelectPayment)
            console.log(dataSelectProvi)

            this.setState({
           listPrice:dataSelectPrice,
           listPayment:dataSelectPayment,
           listProvider:dataSelectProvi,
           listSpecialty:dataSelectSpec,
           listClicnic:dataSelectClinic

            })
            
        }
        if(prevProps.language !==this.props.language){
            let dataSelect=this.buidInputDataSelect(this.props.allDoctors,'USER')
            let {resPrice,resPayment,resPro}=this.props.allRequireData
            let dataSelectPrice=this.buidInputDataSelect(resPrice,'PRICE')
            let dataSelectPayment=this.buidInputDataSelect(resPayment,'PAYMENT')
            let dataSelectProvi=this.buidInputDataSelect(resPro,'PROVINCE')
            this.setState({
                listDoctors:dataSelect,
                listPrice:dataSelectPrice,
                listPayment:dataSelectPayment,
                listProvider:dataSelectProvi
            })
        }
       
        }

    
       handleEditorChange=({ html, text }) =>{
        this.setState({
            contentHTML:html,
            contentMarkDown:text
        })
          }
        handleSaveContentMark=()=>{
            let {hashOldData}=this.state
            this.props.saveDetailDoctor({
                    contentHTML:this.state.contentHTML,
                    contentMarkDown:this.state.contentMarkDown,
                    description	:this.state.description,
                    doctorId:this.state.selectedOption.value,
                    action:hashOldData===true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

           selectePrice:this.state.selectePrice.value,
           selectesPay:this.state.selectesPay.value,
           selectedProvider:this.state.selectedProvider.value,
           nameClinic:this.state.nameClinic,
           addressClinic:this.state.addressClinic,
           note:this.state.note,
           clinicId:this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value :'',
           specialtyId:this.state.slectedSpecialty.value

            })
            console.log("check manager doctor:",this.state.selectedOption)

          }
          handleChange = async( selectedOption) => {
            this.setState({selectedOption })
            let {listPrice,listPayment,listProvider,listSpecialty,listClicnic}=this.state
            let res=await getDetailInforDoctor(selectedOption.value)
            if(res && res.errCode===0 && res.data && res.data.Markdown){
                let markdown=res.data.Markdown;
                let addressClinic=''
                let nameClinic=''
                let note=''
                let paymentId=''
                let priceId=''
                let provienceId=''
                let specialtyId=''
                let clinicId=''
                let selectesPay=''
                let selectePrice=''
                let selectedProvider=''
                let slectedSpecialty=''
                let selectedClinic=''

                 
                if(res.data.Doctor_info){
                    addressClinic=res.data.Doctor_info.addressClinic
                    nameClinic=res.data.Doctor_info.nameClinic
                    note=res.data.Doctor_info.note
                    paymentId=res.data.Doctor_info.paymentId
                    priceId=res.data.Doctor_info.priceId
                    provienceId=res.data.Doctor_info.provienceId
                    specialtyId=res.data.Doctor_info.specialtyId
                    clinicId=res.data.Doctor_info.clinicId

                    
                    selectesPay=listPayment.find(item=>{
                        return item && item.value===paymentId
                    
                })
                selectePrice=listPrice.find(item=>{
                    return item && item.value===priceId
                
            })
             selectedProvider=listProvider.find(item=>{
                return item && item.value===provienceId
            
        })
        slectedSpecialty=listSpecialty.find(item=>{
                return item && item.value===specialtyId

            })
            selectedClinic=listClicnic.find(item=>{
                return item && item.value===clinicId

            })

                //console.log("check find array:",findItem,listPayment,paymentId)
                }
                this.setState({
                    contentHTML:markdown.contentHTML,
                    contentMarkDown:markdown.contentMarkDown,
                    description	:markdown.description,
                    hashOldData:true,
                    addressClinic:addressClinic,
                    nameClinic:nameClinic,
                    note:note,
                    selectesPay:selectesPay,
                    selectePrice:selectePrice,
                    selectedProvider:selectedProvider,
                    slectedSpecialty:slectedSpecialty,
                    selectedClinic:selectedClinic
                })

            }else{
                this.setState({
                    contentHTML:'',
                    contentMarkDown:'',
                    description	:'',
                    hashOldData:false,
                    addressClinic:'',
                    nameClinic:'',
                    note:'',
                    paymentId:'',
                    priceId:'',
                    provienceId:'',
                    selectesPay:'',
                    selectePrice:'',
                    selectedProvider:'',
                    slectedSpecialty:'',
                    selectedClinic:''

                })

            }
              console.log(`Value:`,res)
        
          };
          handleChangeDoctorInfor=async(selectedOption,name)=>{
            let stateName=name.name
            let stateCopy={...this.state}
            stateCopy[stateName]=selectedOption

            this.setState({
                ...stateCopy
            })

            console.log("check doctor info:",selectedOption,stateName)



          }
          handleChangeDescText=(event,id)=>{
            let stateCopy={...this.state}
            stateCopy[id]=event.target.value
            this.setState({
                ...stateCopy
            })
          }

    render() {
        let { hashOldData,listSpecialty}=this.state
        console.log(this.state)
        return (
            <div className='manager-doctor-container'>
                <div className='manager-doctor-title'>
                  <FormattedMessage id="admin.manager-doctor"/>
                </div>
                <div className='more-infor'>
                <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.choose-doctor"/></label>
                        <Select
                         value={this.state.selectedOption}
                         onChange={this.handleChange}
                         options={this.state.listDoctors}
                         placeholder={<FormattedMessage id="admin.choose-doctor"/>}
                         name={"selectedOption"}
                       />
                    </div>
                    <div className='content-right form-group'>
                    <label><FormattedMessage id="admin.introductory information"/></label>
                <textarea 
                className="form-control" 
                onChange={(event)=>this.handleChangeDescText(event,'description')}
                value={this.state.description}
                >
                
                </textarea>

                    </div>
                </div>
                <div className='more-info-extra row'>
                  <div className='col-4 form-group'>
                    <label><FormattedMessage id="admin.choose-price"/></label>
                    <Select
                         value={this.state.selectePrice}
                         onChange={this.handleChangeDoctorInfor}
                         options={this.state.listPrice}
                         placeholder={<FormattedMessage id="admin.choose-price"/>}
                         name="selectePrice"
                       />
                  </div>
                  <div className='col-4 form-group'>
                    <label><FormattedMessage id="admin.paymentmethods"/></label>
                    <Select
                         value={this.state.selectesPay}
                         onChange={this.handleChangeDoctorInfor}
                         options={this.state.listPayment}
                         placeholder={<FormattedMessage id="admin.paymentmethods"/>}
                         name="selectesPay"
                       />
                  </div>
                  <div className='col-4 form-group'>
                    <label><FormattedMessage id="admin.province"/></label>
                    <Select
                       value={this.state.selectedProvider}
                        onChange={this.handleChangeDoctorInfor}
                         options={this.state.listProvider}
                         placeholder={<FormattedMessage id="admin.province"/>}
                         name="selectedProvider"
                       />
                    
                  </div>
                  <div className='col-4 form-group'>
                    <label><FormattedMessage id="admin.clinicname"/></label>
                    <input 
                    className='form-control'
                    onChange={(event)=>this.handleChangeDescText(event,'nameClinic')}
                    value={this.state.nameClinic}
                    />
                  </div>
                  <div className='col-4 form-group'>
                    <label><FormattedMessage id="admin.addressclinic"/></label>
                    <input 
                    className='form-control'
                    onChange={(event)=>this.handleChangeDescText(event,'addressClinic')}
                    value={this.state.addressClinic}
                    />
                  </div>
                  <div className='col-4 form-group'>
                    <label><FormattedMessage id="admin.note"/></label>
                    <input className='form-control'
                    onChange={(event)=>this.handleChangeDescText(event,'note')}
                    value={this.state.note}
                    />
                  </div>
                  
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.specialty"/></label>
                        <Select
                       value={this.state.slectedSpecialty}
                        onChange={this.handleChangeDoctorInfor}
                        placeholder={<FormattedMessage id="admin.specialty"/>}
                         options={this.state.listSpecialty}
                         name='slectedSpecialty'
                       />

                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.selectedClinic"/></label>
                        <Select
                       value={this.state.selectedClinic}
                        onChange={this.handleChangeDoctorInfor}
                        placeholder={<FormattedMessage id="admin.selectedClinic"/>}
                         options={this.state.listClicnic}
                         name='selectedClinic'
                       />
                        

                    </div>

                </div>
                <div className='manager-doctor-editor'>
                <MdEditor 
                style={{ height: '300px' }} 
                renderHTML={text => mdParser.render(text)}
                value={this.state.contentMarkDown}
                 onChange={this.handleEditorChange} />
                </div>
               
                <button 
                onClick={()=>this.handleSaveContentMark()}
                className={hashOldData===true ? 'manager-doctor-save' :'create-doctor' }>
                    {hashOldData===true ? <span><FormattedMessage id="admin.save-info"/></span>:<span><FormattedMessage id="admin.create-info"/></span>}
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors:state.admin.allDoctors,
        language: state.app.language,
        allRequireData:state.admin.allRequireData

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux:() =>dispatch(actions.fetchAllUserStart()),
        deleteNewUserRedux:(id) =>dispatch(actions.deleteNewUser(id)),
        fetchAllDoctors:()=>dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor:(data)=>dispatch(actions.saveDetailDoctor(data)),
        getRequiedDcotorInfo:() =>dispatch(actions.getRequiedDcotorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDoctor);
