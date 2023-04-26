
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FormattedMessage} from 'react-intl';
import Slider from "react-slick";


class  Handbook extends Component {
    render() {
        return (
             <div className=' section_share section_handbook'>
                <div className='section-container'>
                  <div className=' section-header'>
                    <span className='title-section'>Cẩm nang</span>
                    <button className='btn-section'>Xem thêm</button>
                  </div>
                  <div className=' section-body'>
            <Slider {...this.props.settings}>
                   <div className=' section-customzie'>
                    <div className='bg-img section_handbook'/>
                     <div>Cơ xương khớp 1</div>
                   </div>
                   <div className=' section-customzie'>
                     <div className='bg-img section_handbook'/>
                     <div>Cơ xương khớp 2</div>
                   </div>
                   <div className=' section-customzie'>
                     <div className='bg-img section_handbook'/>
                     <div>Cơ xương khớp 3</div>
                   </div>
                    <div className=' section-customzie'>
                      <div className='bg-img section_handbook'/>
                     <div>Cơ xương khớp 4</div>
                   </div>
                   <div className=' section-customzie'>
                     <div className='bg-img section_handbook'/>
                     <div>Cơ xương khớp 5</div>
                   </div>
                   <div className=' section-customzie'>
                     <div className='bg-img section_handbook'/>
                     <div>Cơ xương khớp </div>
                   </div>
            </Slider>

                  </div>
                </div>

             </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)( Handbook);
