import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageHistory.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import LoadingOverlay from 'react-loading-overlay';
import { getAllHistoriesForDoctor } from '../../../services/userService';
import moment from 'moment';
import DatePicker from '../../../components/Input/DatePicker';
import DetailDesModal from './DetailDesModal';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { CommonUtils } from '../../../utils';

class ManageHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataHistories: [],
            isOpenDetailDesModal: false,
            dataModal: {},
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
                dataHistories: res.data,
            })
            //console.log('check res.data: ', res.data)
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
        let data = {
            descriptionHTML: item.descriptionHTML
        }
        this.setState({
            isOpenDetailDesModal: true,
            dataModal: data
        })
    }


    closeDetailDesModal = () => {
        this.setState({
            isOpenDetailDesModal: false,
            dataModal: {}
        })
    }

    openPreviewImage = (item) => {
        if (!item) return;

        this.setState({
            isOpen: true
        })
    }

    render() {
        let { dataHistories, isOpenDetailDesModal, dataModal, imageBase64 } = this.state;
        let { language } = this.props
        //console.log('check dataHistories', this.state)
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
                                <table id="histories" style={{ width: '100%' }}>
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
                                            let imageBase64 = new Buffer(item.files, 'base64').toString('binary');

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
                                                    <td>
                                                        <div className='preview-img-container'>
                                                            <div className="preview-image"
                                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                                                onClick={() => this.openPreviewImage(imageBase64)}
                                                            >
                                                            </div>
                                                            {this.state.isOpen === true &&
                                                                <Lightbox
                                                                    mainSrc={imageBase64}
                                                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                                                />
                                                            }

                                                        </div>

                                                    </td>

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

                    <DetailDesModal
                        isOpenModal={isOpenDetailDesModal}
                        dataModal={dataModal}
                        closeDetailDesModal={this.closeDetailDesModal}
                    />

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
