
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import {FormattedMessage} from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,faQuestionCircle,faSearch,faMobile,faHospitalUser,faFlaskVial,faHeadSideVirus,faTooth,faFlagUsa} from '@fortawesome/free-solid-svg-icons';
import {faHospital,faFlag} from '@fortawesome/free-regular-svg-icons'
import logo from '../../assets/booking.png'
import {LANGUAGES} from '../../utils'
import {changeLanguageApp} from '../../store/actions'
import {withRouter} from 'react-router'

class HomeHeader extends Component {
    handleLanguage=(language)=>{
        this.props.changeLanguageAppRedux(language)

    }
    returnToHome=()=>{
        if(this.props.history){
            this.props.history.push('/home')
        }
    }

    render() {
        let language=this.props.language
      

        return (
            <React.Fragment>
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <FontAwesomeIcon className='menu' icon={faBars}/>
                        <div className='header-logo'>
                         <img src={logo} onClick={()=>this.returnToHome()}/>
                        </div>

                    </div>
                 <div className='center-content'>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home-header.spec"/></b></div>
                            <div className='sub-title'><FormattedMessage id="home-header.searchdoctor"/></div>

                         </div>
                    <div className='child-content'>
                          <div><b><FormattedMessage id="home-header.head-infrastructure"/></b></div>
                           <div className='sub-title'><FormattedMessage id="home-header.head-clinic"/></div>
                    </div>
                    <div className='child-content'>
                            <div><b><FormattedMessage id="home-header.doctor"/></b></div>
                            <div className='sub-title'><FormattedMessage id="home-header.select-doctor"/></div>
                     </div>
                     <div className='child-content'>
                            <div><b><FormattedMessage id="home-header.examination package"/></b></div>
                            <div className='sub-title'><FormattedMessage id="home-header.General health check"/></div>
                     </div>


                </div>
                    <div className='right-content'>
                         <div className='support'><FontAwesomeIcon className='iconQuestion' icon={faQuestionCircle}/><FormattedMessage id="home-header.supported"/></div>
                         <div className={language===LANGUAGES.VI ? 'language-vi active':'language-vi'}><FontAwesomeIcon className='iconFlag' icon={faFlag}/><span onClick={()=>{this.handleLanguage(LANGUAGES.VI)}}>VN</span></div>
                         <div className={language===LANGUAGES.EN ? 'language-en active':'language-en'}><FontAwesomeIcon className='iconUsa' icon={faFlagUsa}/><span onClick={()=>{this.handleLanguage(LANGUAGES.EN)}}>English</span></div>
                    </div>

                    </div>

                </div>
                {this.props.isShowBanner===true &&
                <div className='home-header-baner'>
            <div className='content-up'>
                <div className='title1'><FormattedMessage id="home-header.economic background"/></div>
                <div className='title2'><FormattedMessage id="home-header.care"/></div>
                <div className='search'>
                   <FontAwesomeIcon icon={faSearch} className='iconSearch'/>
                    <input type='text' placeholder='Tìm kiếm nơi khám bệnh' />
                </div>
            </div>
            <div className='content-down'>

                <div className='opistion'>
                    <div className='child-opition'>
                     <div className='icon-child'><FontAwesomeIcon icon={faHospital} className='iconHopital'/></div>
                     <div className='text-child'><FormattedMessage id="opition.specialist examination"/></div>
                    </div>
                    <div className='child-opition'>
                     <div className='icon-child'><FontAwesomeIcon icon={faMobile} className='iconHopital'/></div>
                     <div className='text-child'><FormattedMessage id="opition.remote examination"/></div>
                    </div>
                    <div className='child-opition'>
                     <div className='icon-child'><FontAwesomeIcon icon={faHospitalUser} className='iconHopital'/></div>
                     <div className='text-child'><FormattedMessage id="opition.general examination"/></div>
                    </div>
                    <div className='child-opition'>
                     <div className='icon-child'><FontAwesomeIcon icon={faFlaskVial} className='iconHopital'/></div>
                     <div className='text-child'><FormattedMessage id="opition.medical test"/></div>
                    </div>
                    <div className='child-opition'>
                     <div className='icon-child'><FontAwesomeIcon icon={faHeadSideVirus} className='iconHopital'/></div>
                     <div className='text-child'><FormattedMessage id="opition.mental health"/></div>
                    </div>
                    <div className='child-opition'>
                     <div className='icon-child'><FontAwesomeIcon icon={faTooth} className='iconHopital'/></div>
                     <div className='text-child'><FormattedMessage id="opition.tooth"/></div>
                    </div>
                </div>
            </div>

                </div>
    }

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux:(laguage)=>dispatch(changeLanguageApp(laguage))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
