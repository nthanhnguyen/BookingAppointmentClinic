import React, { Component } from 'react';
import { connect } from "react-redux";
import './ContactUs.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';

class ContactUs extends Component {

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
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="support-container">
                    <h1 className='name'>Thông tin liên hệ</h1>
                    <div className="support-content">
                        <p>
                            <strong>Nền tảng Đặt khám Care For You</strong>
                        </p>
                        <p>Điện thoại: 0-123-456-789</p>
                        <p>Email: 20110398@student.hcmute.edu.vn</p>
                        <p>
                            <strong>
                                <em>Trực thuộc:</em>
                            </strong>
                        </p>
                        <p >Trường Đại học Sư phạm Kỹ thuật TP.Hồ Chí Minh</p>
                        <p>Địa chỉ: 01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh</p>
                    </div>
                </div>
            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
