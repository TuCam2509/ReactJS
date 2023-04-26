import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorInfoExtra.scss'
import  NumberFormat  from 'react-number-format';
import {getDetailExtraDoctorInfo} from '../../../services/useService'
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from '../../../utils'

class DoctorInfoExtra extends Component {
    constructor(props) {
    super(props);
        this.state={
            isShowDetail:false,
            extrainfo:{}
           
            
        }
    
    }
    async componentDidMount(){
        if(this.props.doctorIdFromParent){
            let res=await getDetailExtraDoctorInfo(this.props.doctorIdFromParent)
                    if(res && res.errCode===0){
                        this.setState({
                            extrainfo:res.data
                        })
    
                    }

        }
        }
       
        async componentDidUpdate(prevProps,prevState,snapshot){
            if(this.props.doctorIdFromParent !==prevProps.doctorIdFromParent){
                let res=await getDetailExtraDoctorInfo(this.props.doctorIdFromParent)
                if(res && res.errCode===0){
                    this.setState({
                        extrainfo:res.data
                    })

                }
            
            }
            }
        showDetailInfo=(status)=>{
            this.setState({
                isShowDetail:status
            })

        }
        render() {
            let {isShowDetail,extrainfo}=this.state
            let {language}=this.props
            return (
         <div className='doctor-extra-info'>
          <div className='content-up'>
           <div className='text-address'><FormattedMessage id="parient.extra-detail-doctor.address-clinic"/></div>
           <div className='name-clinic'>{extrainfo && extrainfo.nameClinic ? extrainfo.nameClinic : ''}</div>
           <div className='detail-address'>{extrainfo && extrainfo.addressClinic
           ? extrainfo.addressClinic : ''}</div>
          </div>
          <div className='content-downs'>
         
            {isShowDetail===false &&
          <div className='short-info'>
            <FormattedMessage id="parient.extra-detail-doctor.price"/>:
            {extrainfo && extrainfo.priceTypeData && language===LANGUAGES.VI && 
                <NumberFormat
                className='currency'
                value={extrainfo.priceTypeData.valueVi}
                  thousandSeparator={true}
                   displayType="text"
                   suffix={'VND'}
   />
                }
                 {extrainfo && extrainfo.priceTypeData && language===LANGUAGES.EN && 
                     <NumberFormat
                     className='currency'
                     value={extrainfo.priceTypeData.valueEn}
                       thousandSeparator={true}
                        displayType="text"
                        suffix={'USD'}
        />
                }

            <span className='detail' onClick={()=>this.showDetailInfo(true)}><FormattedMessage id="parient.extra-detail-doctor.See details"/></span>
          </div>
        }
        {isShowDetail===true &&
        <>
          <div className='detail-info'>
            <div className='price'>
                <span className='left'><FormattedMessage id="parient.extra-detail-doctor.price"/></span>
                <span className='right'>
                {extrainfo && extrainfo.priceTypeData && language===LANGUAGES.VI && 
                <NumberFormat
                className='currency'
                value={extrainfo.priceTypeData.valueVi}
                  thousandSeparator={true}
                   displayType="text"
                   suffix={'VND'}
   />
                }
                 {extrainfo && extrainfo.priceTypeData && language===LANGUAGES.EN && 
                     <NumberFormat
                     className='currency'
                     value={extrainfo.priceTypeData.valueEn}
                       thousandSeparator={true}
                        displayType="text"
                        suffix={'USD'}
        />
                }
                </span>
            </div>
            <div className='note'>
             <span> <FormattedMessage id="parient.extra-detail-doctor.note"/></span>
            {extrainfo && extrainfo.note ? extrainfo.note : ''}

            </div>
          </div>
          <div className='payment'>
          <FormattedMessage id="parient.extra-detail-doctor.payment"/>:
          {extrainfo && extrainfo.payTypeData && language===LANGUAGES.VI ?
               extrainfo.payTypeData.valueVi : ''}
                {extrainfo && extrainfo.payTypeData && language===LANGUAGES.EN ?
               extrainfo.payTypeData.valueEn : ''}

          </div>
          <div className='hiddeen-price'>
              <span onClick={()=>this.showDetailInfo(false)}> <FormattedMessage id="parient.extra-detail-doctor.Hide price list"/></span>
          </div>
        </>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfoExtra);
