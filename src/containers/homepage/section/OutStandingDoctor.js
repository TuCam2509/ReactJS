import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FormattedMessage} from 'react-intl';
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import {withRouter} from 'react-router'
import DetailDoctor from '../../Patient/Doctor/DetailDoctor';
import { ConnectedRouter as Router } from 'connected-react-router';
import { Link, Route, Switch } from 'react-router-dom';
import { path } from '../../../utils';
class  OutStandingDoctor extends Component {
    constructor(props){
        super(props)
        this.state=({
            arrTopDoctor:[]
        })

    }
    componentDidUpdate(prevProps,prevState,snapshot){//check sự thay đổi của props để gán lại giá trị
     if(prevProps.topDoctorRedux !==this.props.topDoctorRedux){
        this.setState({
            arrTopDoctor:this.props.topDoctorRedux
        })

     }
    }
    componentDidMount(){
        this.props.loadTopDoctor()


    }
    handleViewDoctor=(doctor)=>{
       if(this.props.history){
           this.props.history.push(`/detail-doctor/${doctor.id}`)
       }

    }

    render() {
        let allDoctor=this.state.arrTopDoctor
        let {language}=this.props
        //allDoctor=allDoctor.concat(allDoctor).concat(allDoctor)
        return (
            <div className=' section_share section_outstanding'>
                <div className='section-container'>
                  <div className=' section-header'>
                    <span className='title-section'><FormattedMessage id="homepage.outstanding-doctor"/></span>
                    <button className='btn-section'><FormattedMessage id="homepage.more"/></button>
                  </div>
                  <div className=' section-body'>
            <Slider {...this.props.settings}>
                {allDoctor && allDoctor.length>0 && allDoctor.map((item,index)=>{
                    let imageBase64='';
                    console.log('image:',imageBase64)

                    if(item.image){
                        imageBase64=new Buffer(item.image,'base64',toString('binary'))
                    }
                    let nameVi=`${item.positionData.valueVi},${item.lastName} ${item.firstName}`
                    let nameEn=`${item.positionData.valueEn},${item.firstName} ${item.lastName}`
                    return (
                    <div className='section-customzie' key={index} onClick={()=>this.handleViewDoctor(item)}>
                        <div className='customzie-body'>
                            <div className='outder'>
                            <div className='bg-img section_OutStandingDoctor' 
                             style={{backgroundImage:`url(${imageBase64})`}} 
                            />
                            </div>
                            <div className='position text-center'>
                             <div>{language===LANGUAGES.VI ? nameVi:nameEn}</div>
                             <div>Cơ xương khớp</div>
                            </div>
                        </div>
                    </div>

                    )
                        })}

                  
            </Slider>

                  </div>
                </div>

             </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux:state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor:()=>dispatch(actions.getTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( OutStandingDoctor));
