import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu,doctorMenu } from './menuApp';
import './Header.scss';
import {LANGUAGES, USER_ROLE} from '../../utils'
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUsersRectangle} from '@fortawesome/free-solid-svg-icons';
import {faUserCircle} from '@fortawesome/free-regular-svg-icons'
import _ from 'lodash'

class Header extends Component {
    constructor(props){
        super(props);
        this.state=({
            menuApp:[]
        })
    }
    handleChanguages=(language)=>{
        this.props.changeLanguageAppRedux(language)


    }
    componentDidMount=()=>{
      let {useInfo}=this.props
      let menu=[]
      if(useInfo && !_.isEmpty(useInfo)){
        let role=useInfo.roleId;
        if(role===USER_ROLE.ADMIN){
            menu=adminMenu
        }
        if(role===USER_ROLE.DOCTOR){
            menu= doctorMenu
        }

      }
      this.setState({
        menuApp:menu
      })
      console.log('check info',this.props.useInfo)
    }

    render() {
        const { processLogout,language,useInfo } = this.props;
        console.log('check user info',useInfo)


        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className='languages'>
                    <span className='welcome'><FontAwesomeIcon className='user_icon' icon={faUserCircle}/><FormattedMessage id='home-header.Welcome' />{useInfo && useInfo.firstName ? useInfo.firstName :''}</span>
                <span 
                className={language===LANGUAGES.VI ?'vi active':'vi'} 
                onClick={()=>this.handleChanguages(LANGUAGES.VI)}>VN</span>
                <span 
                className={language===LANGUAGES.EN ?'en active':'en'} 
                onClick={()=>this.handleChanguages(LANGUAGES.EN)}>EN</span>
                <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
                </div>

                {/* nút logout */}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        useInfo:state.user.useInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux:(laguage)=>dispatch(actions.changeLanguageApp(laguage))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
