import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Medical.scss';
import {FormattedMessage} from 'react-intl';
import Slider from "react-slick";
import {getAllClinic} from '../../../services/useService'
import {withRouter} from 'react-router'


class  Medical extends Component {

  constructor(props){
    super(props)
    this.state={
      dataClinics:[]
    }

  }
  async componentDidMount(){
    let res=await getAllClinic()
    if(res && res.errCode===0){
      this.setState({
        dataClinics:res.data ? res.data :[]
      })
    }
    console.log("check res clinic:",res)

  }
  handleChangeClinic=(clinnic)=>{
    if(this.props.history){
      this.props.history.push(`/detail-clinic/${clinnic.id}`)
  }

  }

    render() {
      let {dataClinics}=this.state


        return (
            <div className=' section_share section_medical'>
                <div className='section-container'>
                  <div className=' section-header'>
                    <span className='title-section'><FormattedMessage id="homepage.outstanding-medical"/></span>
                    <button className='btn-section'><FormattedMessage id="homepage.more"/></button>
                  </div>
                  <div className=' section-body'>
            <Slider {...this.props.settings}>
              {dataClinics && dataClinics.length>0 && dataClinics.map((item,index)=>{
                   return (
                   <div className=' section-customzie'
                   onClick={()=>this.handleChangeClinic(item)}
                    key={index}>
                    <div className='bg-img section_medical'
                       style={{backgroundImage:`url(${item.image})`}}
                    />
                     <div className='clinic-name'>{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( Medical));
