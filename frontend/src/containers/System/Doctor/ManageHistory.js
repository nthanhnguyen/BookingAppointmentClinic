import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageHistory.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import LoadingOverlay from 'react-loading-overlay';
import { getAllHistoriesForDoctor } from '../../../services/userService';
import moment from 'moment';
import DatePicker from '../../../components/Input/DatePicker';

class ManageHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataHistories: [],
            //isOpenDesHistoryModal: false
            //dataModal: {},
            //isShowLoading: false
        }
    }

    getDataHistories = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();

        let res = await getAllHistoriesForDoctor({
            doctorID: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataHistories: res.data
            })
        }
    }

    async componentDidMount() {
        this.getDataHistories()
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataHistories()
        })
    }

    handleBtnDetail = (item) => {
        // let data = {
        //     descriptionHTML: item.descriptionHTML
        // }
        // this.setState({
        //     isOpenDesHistoryModal: true,
        //     dataModal: data
        // })
        alert('Yes')
    }

    // closeDetailModal = () => {
    //     this.setState({
    //         isOpenDesHistoryModal: false,
    //         //dataModal: {}
    //     })
    // }

    render() {
        let { dataHistories } = this.state;
        let { language } = this.props
        console.log('check dataHistories', this.state)
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className='manage-patient-container'>
                        <div className='m-p-title'>
                            Quản lý lịch sử khám bệnh của bệnh nhân
                        </div>
                        <div className='manage-patient-body row'>
                            <div className='col-4 form-group'>
                                <label>Chọn ngày khám</label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className='col-12 table-manage-patient'>
                                <table id="patients" style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ và tên</th>
                                            <th>Giới tính</th>
                                            <th>Địa chỉ</th>
                                            <th>Mô tả thông tin bệnh</th>
                                            <th>File</th>
                                        </tr>
                                        {dataHistories && dataHistories.length > 0 && dataHistories.map((item, index) => {
                                            let time = language === LANGUAGES.VI ?
                                                item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                            let gender = language === LANGUAGES.VI ?
                                                item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{time}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{gender}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>
                                                        <button className='mp-btn-confirm'
                                                            onClick={() => this.handleBtnDetail(item)}>Xem chi tiết
                                                        </button>

                                                    </td>
                                                    <td>{item.patientData.files}</td>
                                                </tr>
                                            )
                                        })
                                            // :
                                            // <tr>
                                            //     <td colSpan="6" style={{ textAlign: "center" }}>No data</td>
                                            // </tr>

                                        }


                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>

                </LoadingOverlay>
            </>
        )

    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHistory);
