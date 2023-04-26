
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FormattedMessage} from 'react-intl';

class  About extends Component {
    render() {
        return (
             <div className=' section_share section_about'>
              <div className='section_about_header'>
                Truyền thông nói về BookingDoctor
              </div>
              <div className='section_content_about'>
                <div className='section_about_left'>
                <iframe 
                width="100%" 
                height="400px" 
                src="https://www.youtube.com/embed/L6cNUvmbgnY" 
                title="Hướng dẫn nộp hồ sơ dịch vụ công trực tuyến Sở Y tế" 
                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className='section_content_right'>
                 <p>BookingDoctor là nền tảng nền tảng đặt lịch khám giúp bệnh nhân có thể dễ dàng lựa chọn bác sĩ chuyên khoa phù hợp từ mạng lưới bác sĩ giỏi, với thông tin đã xác thực và cách thức đặt lịch nhanh chóng, thuận tiện, BookingCare (https://bookingcare.vn) đã chính thức đi vào hoạt động từ tháng 7/2016. Hiện tại, BookingCare tập trung phục vụ khách hàng khu vực miền Bắc (từ Hà Tĩnh trở ra), với mạng lưới bác sĩ, cơ sở y tế tập trung ở Hà Nội.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)( About);
