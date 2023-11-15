import React, { Component } from 'react';
import { connect } from "react-redux";



class ManageShedule extends Component {
    render() {

        return (
            <React.Fragment>
                <div>Manage Shedule</div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageShedule);
