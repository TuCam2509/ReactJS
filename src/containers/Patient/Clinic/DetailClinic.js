import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss'
import HomeHeader from '../../homepage/HomeHeader';
import DSchedule from '../Doctor/DSchedule';
import DoctorInfoExtra from '../Doctor/DoctorInfoExtra';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import {getDetailClinicById,getAllCodeSevice}  from '../../../services/useService'
import _ from 'lodash'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
class DetailClinic extends Component {
    constructor(props) {
    super(props);
        this.state={
            arrDoctorId:[],
            dataDetailClinic:[], 
        }
    
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id=this.props.match.params.id
            let res=await getDetailClinicById({
                id:id,
            })
                if(res && res.errCode===0){
                    let data=res.data
                    let arrDoctorId=[]
                    if(data && !_.isEmpty(res.data)){
                        let arr=data.doctorClinicId
                        if(arr && arr.length>0){
                            arr.map(item=>{
                                arrDoctorId.push(item.doctorId)
                            })
                        }
                    }
                    this.setState({
                        dataDetailClinic:res.data,
                        arrDoctorId:arrDoctorId,

                    })
                }
                
            }

            
        }
       
        async componentDidUpdate(prevProps,prevState,snapshot){
            if(this.props.language !== prevProps.language){
                
            }
           
            }
       
        render() {
            let {arrDoctorId,dataDetailClinic}=this.state
            let {language}=this.props
            console.log("check state:",this.state)

          
            
            return (
                <div className='detail-clinic-container'>
                <HomeHeader/>
                <div className='detail-clinic-body'>
                <div className='description-clinic'>
                    {dataDetailClinic && !_.isEmpty(dataDetailClinic) 
                    &&
                    <>
                    <div className='detail-clinic'>{dataDetailClinic.name}</div>
                    <div dangerouslySetInnerHTML={{__html:dataDetailClinic.descriptionHTML}}></div>

                    </>
                     }
                </div>
                {arrDoctorId && arrDoctorId.length>0 && arrDoctorId.map((item,index)=>{
                    return (
                        <div className='each-doctor'  key={index}>
                        <div className='detail-content-left'>
                          <div className='profile-doctor'>
                            <ProfileDoctor 
                             doctorId={item}
                             isShowDetailDesc={true}
                             isShowLinkDetail={true}
                             isPriceDetail={false}
                             //dataSchedule={dataSchedule}
                            />
                          </div>
                        </div>
                        <div className='detail-content-right'>
                            <div className='doctor-schedule'>
                        <DSchedule
                        doctorIdFromParent={item}
                       
                        />
                            </div>
                            <div className='doctor-extra-in'>
                        <DoctorInfoExtra
                          doctorIdFromParent={item}
                        />

                            </div>
     
                        </div>
     
                     </div>

                    )
                })}

                </div>
               
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
