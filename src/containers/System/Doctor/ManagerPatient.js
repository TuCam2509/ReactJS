import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagerPatient.scss'
import DatePicker from '../../../components/Input/DatePicker'
import { FormattedMessage } from 'react-intl';
import {getListPatientForDoctor,postSendRemedy} from '../../../services/useService'
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import Remady_modal from './Remady_modal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
class ManagerPatient extends Component {
    constructor(props) {
    super(props);
        this.state={
            currentDate:moment(new Date()).startOf('day').valueOf(),
            dataPatient:[],
            isOpenRemedayModal:false,
            dataModal:{},
            isShowLoading:false
        }
    
    }
    async componentDidMount(){
     
      
       this.getDataPatient()
        }
        getDataPatient=async()=>{
          let {user}=this.props
          let {currentDate}=this.state
          let formatedDate=new Date(currentDate).getTime()
          
         
          let res=await getListPatientForDoctor({
            doctorId:user.id,
            date:formatedDate
          
         })
        if(res && res.errCode===0){
          this.setState({
            dataPatient:res.data
          })
        }

        }
       
        async componentDidUpdate(prevProps,prevState,snapshot){
            if(this.props.language !== prevProps.language){
                
            }
           
            }
            handleChangePicked=(date)=>{
                this.setState({
                    currentDate:date[0]
                },async()=>{
                     await this.getDataPatient()
                })
        
              }
              hanldeBtnConfirm=(item)=>{
              let data={
                doctorId:item.doctorId,
                patientId:item.patientId,
                email:item.patientData.email,
                timeType:item.timeType,
                patientName:item.patientData.firstName
              }
              this.setState({
                isOpenRemedayModal:true,
                dataModal:data
              })
        console.log("check data:",data)

              }
            isOpenRemedayModal=()=>{
              this.setState({
                isOpenRemedayModal:false,
                dataModal:{}
              })
            }
            sendMedy=async(dataChild)=>{
              let {dataModal}=this.state
              this.setState({
                isShowLoading:true
              })
              let res=await postSendRemedy({
                email:dataChild.email,
                imageBase64:dataChild.imageBase64,
                doctorId:dataModal.doctorId,
                patientId:dataModal.patientId,
                timeType:dataModal.timeType,
                language:this.props.language,
                patientName:dataModal.patientName

              })
              if(res && res.errCode===0){
                this.setState({
                  isShowLoading:false
                })
                toast.success("Remedy email success")
                this.isOpenRemedayModal()
                await this.getDataPatient()

              }else{
                this.setState({
                  isShowLoading:false
                })
                toast.error('Something wrong')
              }
              //console.log("check res:",res)
              
             
            }

       
        render() {
          let {dataPatient,isOpenRemedayModal,dataModal}=this.state
          let {language}=this.props
         
          
            
            return (
              <>
               <LoadingOverlay
             active={this.state.isShowLoading}
             spinner
             text='Loading...'
              >
                <div className='manager-patient-container'>
                    <div className='mp-title title'>
                       Quản lý bệnh nhân khám bệnh
                    </div>
                    <div className='manager-patient-body row'>
                        <div className='col-4 form-group'>
                          <label>Chọn ngày khám</label>
                          <DatePicker 
                            onChange={this.handleChangePicked}
                            className='form-control'
                            value={this.state.currentDate}
                            />
                        </div>
                        <div className='col-12 manager-table'>
                        <table className="table table-bordered">
                   <thead>
                 <tr>
                   <th scope="col">STT</th>
                  
                   <th scope="col">Họ và tên</th>
                   <th scope="col">Giới tính</th>
                   <th scope="col">Địa chỉ</th>
                   <th scope="col">Triệu chứng</th>
                   <th>Thời gian</th>
                   <th scope="col">Action</th>
                 </tr>
               </thead>
               <tbody>
                {dataPatient && dataPatient.length>0 ? dataPatient.map((item,index)=>{
                  console.log("check item:",item)
                  return (
                 <tr key={index}>
                   <td>{index+1}</td>
                   {<td>{item.patientData.firstName}</td>}
                   <td>{language===LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn }</td>
                   <td>{item.patientData.address}</td>
                   <td>{item.patientData.reason}</td>
                   <td>{language===LANGUAGES.VI ? item.timeTypeDataPatient.valueVi:item.timeTypeDataPatient.valueEn}</td>
                   <td>
                   <button type="button" className="btn btn-success success" onClick={()=>this.hanldeBtnConfirm(item)}>Xác nhận</button>
                   </td>
                 </tr>

                  )
                })
                : <tr>
                   <td>No Data...</td>
                </tr>
              }
               </tbody>
                  </table>
            </div>

        </div>

             </div>
            
             <Remady_modal
             isOpenModal={isOpenRemedayModal}
             dataModal={dataModal}
             isCloseRemady={this.isOpenRemedayModal}
             sendMedy={this.sendMedy}

             />
              </LoadingOverlay>
              </>

            )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user:state.user.useInfo
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerPatient);
