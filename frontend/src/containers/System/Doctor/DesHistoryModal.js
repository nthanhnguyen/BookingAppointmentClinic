import React, { Component } from 'react';
import { connect } from "react-redux";
//import './DefalutClass.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class DefalutClass extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }



    render() {

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

export default connect(mapStateToProps, mapDispatchToProps)(DesHistoryModal);
