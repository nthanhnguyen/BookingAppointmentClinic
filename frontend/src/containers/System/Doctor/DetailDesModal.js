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

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
    }


    // handleEditorChange = ({ html, text }) => {
    //     this.setState({
    //         descriptionHTML: html,
    //         descriptionMarkdown: text
    //     })
    // }

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
