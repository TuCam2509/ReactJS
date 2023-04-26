import React, { Component } from 'react';
import { connect } from "react-redux";
import {FormattedMessage} from "react-intl"
import Select from 'react-select';
import { LANGUAGES,dateFormat } from '../../../utils';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker'
import {toast} from 'react-toastify'
import moment from 'moment'
import './DoctorSchedule.scss'
import _ from 'lodash'
import {saveBulkScheduleDoctor} from '../../../services/useService'




class DoctorSchedule extends Component {
    constructor(props){
        super(props)
        this.state={
            listDoctors:[],
            selectedDoctor:{},
            currentDate:'',
            rangeTime:[],



        }
    }
    componentDidMount(){
        this.props.fetchAllDoctors()
        this.props.fetchAllScheduleTime()
    }
    componentDidUpdate(prevProps, prevState,snapshot){
        if(prevProps.allDoctors !==this.props.allDoctors){//nếu như state allDoctors thay đổi
            let dataSelect=this.buidInputDataSelect(this.props.allDoctors)
            this.setState({
                listDoctors:dataSelect
            })
        }
        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            let data=this.props.allScheduleTime
            if(data && data.length>0){
                data=data.map(item=>{
                    item.isSeclected=false
                    return item
                })
            }

            this.setState({
               rangeTime:data
            })
        }
        //if(prevProps.language !==this.props.language){
            //let dataSelect=this.buidInputDataSelect(this.props.allDoctors)
            //this.setState({
                //listDoctors:dataSelect
            //})
        //}
       
        }
    buidInputDataSelect=(inputData)=>{
        let result=[];
        let {language}=this.props
        if(inputData && inputData.length>0){
            inputData.map((item,index)=>{
                let object={}
                let labelVi=`${item.lastName} ${item.firstName}`
                let labelEn= `${item.firstName} ${item.lastName}`

                object.label=language===LANGUAGES.VI ? labelVi : labelEn
                object.value=item.id
                result.push(object)

            })

        }
        return result

    }
    handleChange = async(selectedDoctor) => {
        this.setState({selectedDoctor:selectedDoctor })
        
    
      };
      handleChangePicked=(date)=>{
        this.setState({
            currentDate:date[0]
        })

      }
      handleClickBtnTime=(time)=>{
        console.log(time)
        let {rangeTime}=this.state
        if(rangeTime && rangeTime.length>0){
            rangeTime=rangeTime.map(item=>{
                if(item.id===time.id) item.isSeclected=!item.isSeclected
                return item;
            })
            this.setState({
                rangeTime:rangeTime
            })
        }

      }
      handleScheduleSave=async()=>{
        let result=[]
          let {rangeTime,selectedDoctor,currentDate}=this.state
          if(!currentDate){
              toast.error("Invalid date!")
              return;
          }
          if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error('Invalid select doctor')
            return;
          }
          //let formatDate=moment(currentDate).format(dateFormat.SEND_TO_SERVER)
          //let formatDate=moment(currentDate).unix()
          let formatDate=new Date(currentDate).getTime()

          if(rangeTime && rangeTime.length>0){
            let selectedTime=rangeTime.filter(item=>item.isSeclected===true)
            if(selectedTime && selectedTime.length>0){
                selectedTime.map(item=>{
                    let obj={}
                    obj.doctorId=selectedDoctor.value
                    obj.date=formatDate
                    obj.timeType=item.keyMap
                    result.push(obj)


                })

            }else{
                 toast.error("Invalid selected time!")
                  return;

            }
            let res=await saveBulkScheduleDoctor({
                arrSchedule:result,
                doctorId:selectedDoctor.value,
                formatDate:formatDate,


            })
            if(res && res.errCode===0){
                toast.success('Save infor successfull')
            }else{
                toast.error('Error savebulkCreate')
                console.log('Error:',res)
            }
          }
        
        

      }
    render() {
        let {rangeTime}=this.state
        let {language}=this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));

        return (
                <div className='manager-schedule-container'>
                    <div className='m-s title'>
                       <FormattedMessage id="manager-schedule.title"/>
                    </div>
                    <div className='container'>
                     <div className='row'>
                      <div className='col-6 form-group'>
                        <label><FormattedMessage id="manager-schedule.choose-doctor"/></label>
                        <Select
                         value={this.state.selectedDoctor}
                         onChange={this.handleChange}
                         options={this.state.listDoctors}
                       />
                               
                      </div>
                      <div className='col-6 form-group'>
                           <label><FormattedMessage id="manager-schedule.choose-date"/></label>
                            <DatePicker 
                            onChange={this.handleChangePicked}
                            className='form-control'
                            value={this.state.currentDate}
                            minDate={yesterday}
                            />
                      </div>
                      <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length>0 && 
                            rangeTime.map((item,index)=>{
                                return (
                                    <button 
                                    className={item.isSeclected===true ? "btn-schedule active" : "btn-schedule"}
                                    key={index}
                                    onClick={()=>this.handleClickBtnTime(item)}
                                    >{language===LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    
                                    </button>
                                )
                            })
                            }
                      </div>
                      <div className='col-12'>

                      <button 
                      className='btn btn btn-outline-info btn-save-schedule'
                      onClick={()=>this.handleScheduleSave()}
                    >
                        <FormattedMessage id="manager-schedule.save"/></button>
                      </div>
                     </div>
                    </div>
                   
                </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors:state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime:state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors:()=>dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime:()=>dispatch(actions.fetchAllScheduleTime())
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
