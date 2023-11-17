import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import {  Modal } from 'reactstrap';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    async componentDidMount(){
       
    }
    

    async componentDidUpdate(prevProps, prevState, snapshot) {
        
    }
    
   

    render() {
        let {isOpenModal,closeBookingModal,dataTime} = this.props;
            return (
                <Modal
                isOpen={isOpenModal}
                // toggle={() => { this.toggle() }}
                className={'booking-modal-container'}
                size="lg"
                centered
                >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Thông tin đặt lịch khám bệnh</span>
                        <span className='right'
                            onClick={closeBookingModal}
                        ><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-infor'>

                        </div>
                        <div className='price'>
                            Giá Khám 500.000VNĐ
                        </div>
                        <div className='row'>
                            <div className='col-6 from-group'>
                                <label> Họ và Tên</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-6 from-group'>
                                <label> Số Điện Thoại</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-6 from-group'>
                                <label>Địa chỉ Email</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-6 from-group'>
                                <label> Địa chỉ liên hệ</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-12 from-group'>
                                <label> Lý Do Khám</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-6 from-group'>
                                <label> Đặt cho ai</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-6 from-group'>
                                <label> Giới tính</label>
                                <input className='form-control'></input>
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'> 
                        <button className='btn-booking-confirm' onClick={closeBookingModal} >Xác Nhận</button>
                        <button className='btn-booking-cancel' onClick={closeBookingModal}>Hủy</button>
                    </div>
                    

                </div>
                </Modal>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
