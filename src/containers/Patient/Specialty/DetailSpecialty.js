import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss'
import HomeHeader from '../../homepage/HomeHeader';
import DSchedule from '../Doctor/DSchedule';
import DoctorInfoExtra from '../Doctor/DoctorInfoExtra';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import {getDetailSpecialtyById,getAllCodeSevice}  from '../../../services/useService'
import _ from 'lodash'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
class DetailSpecialty extends Component {
    constructor(props) {
    super(props);
        this.state={
            arrDoctorId:[],
            dataDetailSpecialty:[],
            listProviced:[]
          
           
            
        }
    
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id=this.props.match.params.id
            let res=await getDetailSpecialtyById({
                id:id,
                location:"ALL"
            })
            let resProvice=await getAllCodeSevice('PROVINCE')
            console.log("check res",res)
                if(res && res.errCode===0 && resProvice && resProvice.errCode===0){
                    let data=res.data
                    let arrDoctorId=[]
                    if(data && !_.isEmpty(res.data)){
                        let arr=data.doctorspecialtyId
                        if(arr && arr.length>0){
                            arr.map(item=>{
                                arrDoctorId.push(item.doctorId)
                            })
                        }
                    }
                    let dataProvice=resProvice.data
                    let result=[]
                    if(dataProvice && dataProvice.length>0){
                            dataProvice.unshift({
                                createAt:null,
                                keyMap:"ALL",
                                type:"PROVINCE",
                                valueEn:"ALL",
                                valueVi:"Toàn quốc"

                            })
                    }
                    this.setState({
                        dataDetailSpecialty:res.data,
                        arrDoctorId:arrDoctorId,
                        listProviced:dataProvice ? dataProvice :''

                    })
                }
                
            }

            
        }
       
        async componentDidUpdate(prevProps,prevState,snapshot){
            if(this.props.language !== prevProps.language){
                
            }
           
            }
            handleChangeProviced=async(event)=>{
                if(this.props.match && this.props.match.params && this.props.match.params.id){
                    let id=this.props.match.params.id
                    let location=event.target.value
                    let res=await getDetailSpecialtyById({
                        id:id,
                        location:location
                    })
                    console.log("check res",res)
                        if(res && res.errCode===0){
                            let data=res.data
                            let arrDoctorId=[]
                            if(data && !_.isEmpty(res.data)){
                                let arr=data.doctorspecialtyId
                                if(arr && arr.length>0){
                                    arr.map(item=>{
                                        arrDoctorId.push(item.doctorId)
                                    })
                                }
                            }
                            this.setState({
                                dataDetailSpecialty:res.data,
                                arrDoctorId:arrDoctorId,
                            })
                        }
                }
                 
            }
       
        render() {
            let {arrDoctorId,dataDetailSpecialty,listProviced}=this.state
            let {language}=this.props
            console.log("check state:",this.state)

          
            
            return (
                <div className='detail-spec-container'>
                <HomeHeader/>
                <div className='detail-spec-body'>
                <div className='description-spec'>
                    {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) 
                    &&
                    <div dangerouslySetInnerHTML={{__html:dataDetailSpecialty.descriptionHTML}}></div>
                     }
                </div>
                <div className='search-sp'>
                     <select onChange={(event)=>this.handleChangeProviced(event)}>
                        {listProviced && listProviced.length>0 && listProviced.map((item,index)=>{
                            return (
                                <option key={index} value={item.keyMap}>
                                    {language===LANGUAGES.VI ? item.valueVi : item.valueEn}
                                </option>

                            )
                        })}
                     </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
