import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss'
import ProfileDoctor from '../ProfileDoctor';
import { Modal } from 'reactstrap';
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from '../../../../components/Input/DatePicker'
import _ from 'lodash'
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import {postPatientBooking} from '../../../../services/useService'
import Select from 'react-select'
import { toast } from 'react-toastify';
import moment from 'moment/moment';


class BookingModal extends Component {
    constructor(props) {
    super(props);
        this.state={
            fullName:'',
            phoneNumber:'',
            email:'',
            address:'',
            reason:'',
            birthday:'',
            selectedGernders:null,
            genders:'',
            doctorId:'',
            timeType:''
          
           
            
        }
    
    }
    
    async componentDidMount(){
        this.props.getGender()
        
            
        }
       
        builDataGender=(data)=>{
            let result=[]
            let language=this.props.language

            if(data && data.length>0){
                data.map(item=>{
                    let object={}
                    object.label=language===LANGUAGES.VI ? item.valueVi:item.valueEn
                    object.value=item.keyMap
                    result.push(object)
                })
            }
            return result

        }
        async componentDidUpdate(prevProps,prevState,snapshot){
            if(this.props.language !== prevProps.language){
                this.setState({
                    genders:this.builDataGender(this.props.genders)
                })
                
            }
            if(this.props.genders !==prevProps.genders){
                
                this.setState({
                    genders:this.builDataGender(this.props.genders)
                })

            }
            {if(this.props.dataSchedule !==prevProps.dataSchedule){
                if(this.props.dataSchedule && !_.isEmpty(this.props.dataSchedule)){
                    let doctorId=this.props.dataSchedule.doctorId
                    let timeType=this.props.dataSchedule.timeType
                    this.setState({
                        doctorId:doctorId,
                        timeType:timeType
                    })
                }

            }}
           
            }

            handleOnChangeInput=(event,id)=>{
                let valueInput=event.target.value
                let stateCopy={...this.state}
                stateCopy[id]=valueInput
                this.setState({
                    ...stateCopy
                })

            }
            handleChangePicked=(date)=>{
                this.setState({
                    birthday:date[0]
                })

            }
            handleChangeSelect=(selectedOptions)=>{
                this.setState({
                    selectedGernders:selectedOptions
                })

            }
            handleConformBooking=async()=>{
                let date=new Date(this.state.birthday).getTime()
                let timeString=this.buildTimeBooking(this.props.dataSchedule)
                let doctorName=this.buildDoctorName(this.props.dataSchedule)
                let res=await postPatientBooking({
                    fullName:this.state.fullName,
                    phoneNumber:this.state.phoneNumber,
                    email:this.state.email,
                    address:this.state.address,
                    reason:this.state.reason,
                    date:this.props.dataSchedule.date,
                    birthday:date,
                    selectedGernders:this.state.selectedGernders.value,
                    doctorId:this.state.doctorId,
                    timeType:this.state.timeType,
                    language:this.props.language,
                    timeString:timeString,
                    doctorName:doctorName,

                })
                if(res && res.errCode===0){
                    toast.success('Booking a new appoiment success!')
                    this.props.isCloseBooking()
                }else{
                    toast.error('Booking a appoiment error')
                }


                console.log('check conformbooking',this.state)
            }
            buildTimeBooking=(dataSchedule)=>{
                let {language}=this.props
                if(dataSchedule && !_.isEmpty(dataSchedule)){
                    let time=language===LANGUAGES.VI ? dataSchedule.timeTypeData.valueVi:dataSchedule.timeTypeData.valueEn
                    let date=language===LANGUAGES.VI ? moment.unix(+dataSchedule.date /1000).format('dddd-DD/MM/YYYY'):
                    moment.unix(+dataSchedule.date /1000).locale('en').format('ddd-MM/DD/YYYY')//đơn vị của hàm unix là s còn đơn lưu gettime trong java là ms
                    return `${time} - ${date}`

                }
                return ''

            }
            buildDoctorName=(dataSchedule)=>{
                let {language}=this.props
                if(dataSchedule && !_.isEmpty(dataSchedule)){
                   let name=language===LANGUAGES.VI ? `${dataSchedule.doctorData.lastName} ${dataSchedule.doctorData.firstName} `
                   : 
                   `${dataSchedule.doctorData.lastName} ${dataSchedule.doctorData.firstName}`
                   return name

                }
                
            }
         check=()=>
    {
         var mobile = document.getElementById('phoneNumber');
   
    
         var message = document.getElementById('message');

        var goodColor = "#FF0000";
        var badColor = "#FFFFFF";
  
        if(mobile.value.length>10 || mobile.value.length<10 ){
       
        mobile.style.backgroundColor = badColor;
        message.style.color = goodColor;
        message.innerHTML = "required 10 digits, match requested format!"
        }else{
        message.innerHTML=""
        }
    }
    checkemail=()=>{
        const input = document.querySelector("#email");
        const display = document.querySelector("#result");
        if (input.value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi)) {
         display.style.color='#008000'
         display.innerHTML = input.value + ' is valid';
       } else {
        display.style.color='#FF0000'

         display.innerHTML = input.value + ' is not a valid email';
       }
   }
    
    

        render() {
            let {isOpenModal,isCloseBooking,dataSchedule,isShowLinkDetail,isPriceDetail}=this.props
            let doctorId=''
            if(dataSchedule && !_.isEmpty(dataSchedule)){
                doctorId=dataSchedule.doctorId
            }
            //toggle={toogle}
            
            return (
               <Modal 
               isOpen={isOpenModal}  
               className={'booking-modal-container'} 
               size='lg' 
               centered>
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id="parient.booking-modal.title"/></span>
                        <span 
                        className='right'
                        onClick={isCloseBooking}
                        >
                            <FontAwesomeIcon icon={faTimes}/>
                            </span>
                    
                    </div>
                 
                <div className='booking-modal-body'>
                    {/*{JSON.stringify(dataSchedule)}*/}
                    <div className='doctor-info'>
                         <ProfileDoctor 
                         doctorId={doctorId}
                         isShowDetailDesc={false}
                         dataSchedule={dataSchedule}
                         isShowLinkDetail={false}
                         isPriceDetail={true}
                         
                         />
                    </div>
                   
                        <form action='#'> 
                            <div className='row'>

                        <div className='col-6 form-group'>
                        <label><FormattedMessage id="parient.booking-modal.fullName"/></label>
                        <input 
                        className='form-control'
                        value={this.state.fullName}
                        onChange={(event)=>this.handleOnChangeInput(event,'fullName')}
                        />
                        </div>
                        <div className='col-6 form-group'>
                        <label><FormattedMessage id="parient.booking-modal.phone"/></label>
                        <input className='form-control'
                        type='number'
                        id='phoneNumber'
                         value={this.state.phoneNumber}
                         onChange={(event)=>this.handleOnChangeInput(event,'phoneNumber')}
                         onKeyUp={()=>this.check()}
                        />
                        <span id='message'></span>
                        </div>
                        <div className='col-6 form-group'>
                        <label><FormattedMessage id="parient.booking-modal.email"/></label>
                        <input className='form-control'
                         value={this.state.email}
                         id="email"
                         onChange={(event)=>this.handleOnChangeInput(event,'email')}
                         onKeyUp={()=>this.checkemail()}
                        />
                        <p id='result'></p>
                        </div>
                        <div className='col-6 form-group'>
                        <label><FormattedMessage id="parient.booking-modal.address"/></label>
                        <input className='form-control'
                        value={this.state.address}
                        onChange={(event)=>this.handleOnChangeInput(event,'address')}
                        />
                        </div>
                        <div className='col-6 form-group'>
                        <label><FormattedMessage id="parient.booking-modal.reason"/></label>
                        <input className='form-control'
                        value={this.state.reason}
                        onChange={(event)=>this.handleOnChangeInput(event,'reason')}
                        />
                        </div>
                        <div className='col-6 form-group'>
                        <label><FormattedMessage id="parient.booking-modal.birthday"/></label>
                        <DatePicker 
                            onChange={this.handleChangePicked}
                            className='form-control'
                            value={this.state.birthday}
                           
                            />
                        </div>
                        <div className='col-6 form-group'>
                        <label><FormattedMessage id="parient.booking-modal.genders"/></label>
                        <Select
                        value={this.state.selectedGernders}
                        onChange={this.handleChangeSelect}
                        options={this.state.genders}
                        />
            
                        </div>
                            </div>
                            
                        </form>


                    
                     
                </div>
                <div className='booking-modal-footer'>
                   <button 
                   className='btn btn-outline-success' onClick={()=>this.handleConformBooking()}><FormattedMessage id="parient.booking-modal.btnConfrom"/></button>
                   <button className='btn btn-outline-danger'  onClick={isCloseBooking}><FormattedMessage id="parient.booking-modal.btnCancel"/></button>
                </div>
                </div>
                
               </Modal>

            )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders:state.admin.genders,
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender:() =>dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
