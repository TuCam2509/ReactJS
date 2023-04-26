import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss'
import {getProfileDoctorById} from '../../../services/useService'
import { LANGUAGES } from '../../../utils';
import  NumberFormat  from 'react-number-format';
import _ from 'lodash'
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import localization from 'moment/locale/vi'
class ProfileDoctor extends Component {
    constructor(props) {
    super(props);
        this.state={
            dataProfile:{}
          
           
            
        }
    
    }
    async componentDidMount(){
       let data= await this.getInforData(this.props.doctorId)
       this.setState({
        dataProfile:data
       })
          
        }
        getInforData=async(id)=>{
            let result={}
            if(id){
                let res=await getProfileDoctorById(id)
                if(res && res.errCode===0){
                    result=res.data
                }
            }
            return result

        }
       
        async componentDidUpdate(prevProps,prevState,snapshot){
            if(this.props.language !== prevProps.language){
                
            }
            if(this.props.doctorId !==prevProps.doctorId){
                //this.getInforData(this.props.doctorId)

            }
           
            }
            returnTimeBooking=(dataSchedule)=>{
                let {language}=this.props
                if(dataSchedule && !_.isEmpty(dataSchedule)){
                    let time=language===LANGUAGES.VI ? dataSchedule.timeTypeData.valueVi:dataSchedule.timeTypeData.valueEn
                    let date=language===LANGUAGES.VI ? moment.unix(+dataSchedule.date /1000).format('dddd-DD/MM/YYYY'):
                    moment.unix(+dataSchedule.date /1000).locale('en').format('ddd-MM/DD/YYYY')//đơn vị của hàm unix là s còn đơn lưu gettime trong java là ms
                    return (
                        <>
                        <div>{time} - {date} </div>
                        <div><FormattedMessage id="parient.booking-modal.free"/></div>
                        </>
                    )

                }

            }
       
        render() {
            let {dataProfile}=this.state
            let {language,isShowDetailDesc,dataSchedule,isShowLinkDetail,isPriceDetail,doctorId}=this.props
            let nameVi=''
            let nameEn=''
            if(dataProfile && dataProfile.positionData){
                nameVi=`${dataProfile.positionData.valueVi},${dataProfile.lastName} ${dataProfile.firstName}`
                nameEn=`${dataProfile.positionData.valueEn},${dataProfile.firstName} ${dataProfile.lastName}`

            }
            return (
                <div className='profile-doctor-conainer'>
                <div className='intro-doctor'>
                     <div 
                     className='content-left'  
                     style={{backgroundImage:`url(${dataProfile && dataProfile.image ? dataProfile.image:'' })`}}  >

                     </div>
                     <div className='content-right'>
                        <div className='up'>
                         {language===LANGUAGES.VI ? nameVi : nameEn}
            </div>
                        <div className='down'>
                            {isShowDetailDesc===true ?
                            <>
                         {dataProfile.Markdown && dataProfile.Markdown.description && 
                         <span>
                            {dataProfile.Markdown.description}
                         </span>
                          }
                            </>
                            :
                            <>
                            {this.returnTimeBooking(dataSchedule)}
                            </>
        }
                            
                        </div>
                     </div>
                    
                    </div>
                    {isShowLinkDetail===true && <div className='view-detail-doctor'>
                        <Link to ={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                        </div>}
                    {isPriceDetail===true && 
                    <div className='price'>
                        Giá khám:
                        {dataProfile && dataProfile.Doctor_info && language===LANGUAGES.VI ? 
                       <NumberFormat
                      className='currency'
                      value={ dataProfile.Doctor_info.priceTypeData.valueVi }
                      thousandSeparator={true}
                       displayType="text"
                       suffix={'VND'}
   />
                       :''}
                        {dataProfile && dataProfile.Doctor_info && language===LANGUAGES.EN ? 
                      
                       <NumberFormat
                       className='currency'
                       value={dataProfile.Doctor_info.priceTypeData.valueEn}
                       thousandSeparator={true}
                        displayType="text"
                        suffix={'USD'}
    />
                        :''}
                        
                     </div>
        }

                </div>

            )
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
