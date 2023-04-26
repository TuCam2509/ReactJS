import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import ManagerDoctor from '../containers/System/Admin/ManagerDoctor'
import Header from '../containers/Header/Header';
import DetailDoctor from '../containers/Patient/Doctor/DetailDoctor';
import Manager_specialty from '../containers/System/Specialty/Manager_specialty';
import ManagerClinic from '../containers/System/Clinic/ManagerClinic';


class System extends Component {
    render() {
        const { systemMenuPath,isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/user-redux" component={UserRedux} />
                        <Route path="/system/manager-doctor" component={ManagerDoctor} />
                        <Route path="/system/manage-specialty" component={Manager_specialty} />
                        <Route path ="/system/manage-clinic" component={ManagerClinic}/>
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
