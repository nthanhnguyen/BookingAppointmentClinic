import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailDesModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class DetailDesModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            descriptionHTML: '',
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                descriptionHTML: this.props.dataModal.descriptionHTML
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                descriptionHTML: this.props.dataModal.descriptionHTML
            })
        }
    }

    render() {
        let { isOpenModal, closeDetailDesModal, dataModal } = this.props;
        //console.log('descriptionHTML: ', this.state)
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size="md"
                centered
            >
                <div className='modal-header'>
                    <h5 className='modal-title'>Chi tiết mô tả</h5>
                    <button type='button' className='close' aria-label='Close' onClick={closeDetailDesModal}>
                        <span aria-hidden='true'>x</span>
                    </button>

                </div>

                <ModalBody>
                    <div className='row'>
                        <div className='detail-infor-doctor'>
                            {dataModal && dataModal.descriptionHTML && dataModal.descriptionHTML &&
                                <div dangerouslySetInnerHTML={{ __html: dataModal.descriptionHTML }}></div>
                            }
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='secondary' onClick={closeDetailDesModal}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDesModal);
