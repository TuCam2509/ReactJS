import React, { Component } from 'react';
import { connect } from "react-redux";
import './Schedule.scss'
import moment from 'moment';
import localization from 'moment/locale/vi'
import {getScheduleDoctorDate} from '../../../services/useService'
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons'
import {LANGUAGES} from '../../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHand} from '@fortawesome/free-solid-svg-icons'
import {FormattedMessage} from "react-intl"
import BookingModal from './Modal/BookingModal';
class DSchedule extends Component {
    constructor(props) {
    super(props);
        this.state={
           allDays:[],
           allavaibleTime:[],
           isOpenBooking:false,
           dataScheduleTime:{}
            
        }
    
    }
    async componentDidMount(){
        let {language}=this.props
        let allDays=this.getAllDay(language)
        if(this.props.doctorIdFromParent){
            let res=await getScheduleDoctorDate(this.props.doctorIdFromParent,allDays[0].value)
            this.setState({
                allavaibleTime:res.data ? res.data :[]
            })

        }
            this.setState({
                allDays:allDays
            })
       
        //console.log("check day:",allDays)
            
        }
        capitalizeFirstLetter=(string)=> {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        getAllDay=(language)=>{
            let allDays=[]
            for(let i=0;i<7;i++){
                let object={}
                if(this.props.language===LANGUAGES.VI){
                    if(i===0){
                        let valueVi2=moment(new Date()).format('DD/MM')
                        let today=`Hôm nay -${valueVi2}`
                        object.label=today

                        
                    }else{
                        let valueVi=moment(new Date()).add(i,'days').format('dddd-DD/MM')
                        object.label=this.capitalizeFirstLetter(valueVi)
                    }
    
                }else{
                    if(i===0){
                        let valueVi2=moment(new Date()).format('DD/MM')
                        let today=`Today -${valueVi2}`
                        object.label=today
                    }else{

                        object.label=moment(new Date()).add(i,'days').locale('en').format('ddd-DD/MM')
                    }
                }
                object.value=moment(new Date()).add(i,'days').startOf('day').valueOf()//startOf lấy đầu ngày  trên máy của bạn là 00:00:00
                allDays.push(object)
            }
           
           return allDays;
        


        }
        async componentDidUpdate(prevProps,prevState,snapshot){
            if(this.props.language !==prevProps.language){
            let allDays=this.getAllDay(this.props.language)
            this.setState({
                allDays:allDays
            })

            }
            if(this.props.doctorIdFromParent !==prevProps.doctorIdFromParent){
                let allDays=this.getAllDay(this.props.language)
                let res=await getScheduleDoctorDate(this.props.doctorIdFromParent,allDays[0].value)
                this.setState({
                    allavaibleTime:res.data ? res.data :[]
                })

            }
        }
        handleChangeSelect=async(event)=>{
            if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !==-1){
                let doctorId=this.props.doctorIdFromParent
                let date=event.target.value
                let res=await getScheduleDoctorDate(doctorId,date)
                if(res && res.errCode===0){
                    this.setState({
                        allavaibleTime:res.data? res.data:[]
                    })
                }
                console.log(res)
            }

        }
        handleClickSleduleTime=(time)=>{
            this.setState({
                isOpenBooking:true,
                dataScheduleTime:time
            })
            console.log('check time data',time)

        }
        closeBookingModal=()=>{
            this.setState({
                isOpenBooking:false
            })
        }
        
        render() {
        let {allDays,allavaibleTime,isOpenBooking,dataScheduleTime}=this.state
        let {language}=this.props
        return (
            <>
           <div className='doctor-schedule-container'>
            <div className='all-schedule'>
            <select onChange={(event)=>this.handleChangeSelect(event)}>
                {allDays && allDays.length>0 && allDays.map((item,index)=>{
                    return (

                        <option value={item.value} key={index}>{item.label}</option>
                    )
                })}
            </select>
            </div>
            <div className='all-timeavaible'>
                 <div className='text-calendar'>
                 <span><FontAwesomeIcon className='calendar' icon={faCalendarDay}/><FormattedMessage id="parient.detail-doctor.schedule"/></span>
                 </div>
                 <div className='time-container'>

                    {allavaibleTime && allavaibleTime.length>0 ?
                    <>
                    <div className='time-container-button'>
                     {allavaibleTime.map((item,index)=>{
                        let timeDisplay=language===LANGUAGES.VI?item.timeTypeData.valueVi:item.timeTypeData.valueEn
                        return(
                            <button 
                            onClick={()=>this.handleClickSleduleTime(item)}
                            className={language===LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                            key={index}>{timeDisplay}
                            
                            </button>

                        )
                    })
                }
                    </div>
                <div className='book-free'>
                     <FormattedMessage id="parient.detail-doctor.booking"/> <FontAwesomeIcon icon={faHand}/> 
                </div>
                    </>
                    :
                    <span><FormattedMessage id="parient.detail-doctor.no-schedule"/></span>
                
                }
                  
                 </div>
            </div>
           </div>
           <BookingModal 
           dataSchedule={dataScheduleTime}
           isCloseBooking={this.closeBookingModal}
           isOpenModal={isOpenBooking}/>

            </>
          
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DSchedule);
