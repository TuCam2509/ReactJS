
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FormattedMessage} from 'react-intl';

class  HomeFooter extends Component {
    render() {
        return (
             <div className='section_homefooter'>
              <p>&copy; 2023 CamTu More information,please visit my youtube.&#8594;<a target='_blank' href='https://youtu.be/FyDQljKtWnI'> Click me &#8592;</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)( HomeFooter);
