import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Speciatly from './section/Speciatly';
import Medical from './section/Medical'
import OutStandingDoctor from './section/OutStandingDoctor';
import Handbook from './section/Handbook';
import About from './section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DetailDoctor from '../Patient/Doctor/DetailDoctor';

class HomePage extends Component {
    

    render() {
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
          };

        return (
            <div>
               <HomeHeader isShowBanner={true}/>
               <Speciatly settings={settings}/>
               <Medical settings={settings}/>
               <OutStandingDoctor settings={settings}/>
               <Handbook settings={settings}/>
               <About/>
               <HomeFooter/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
