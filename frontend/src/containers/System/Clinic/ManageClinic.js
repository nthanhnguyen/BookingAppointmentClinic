import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageClinic.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils'
import { saveClinicService, getAllDetailClinicById } from '../../../services/userService'
import { toast } from "react-toastify"
import Select from 'react-select';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import * as actions from '../../../store/actions';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: '',
            listClinics: [],
            selectedOption: ''

        }
    }

    async componentDidMount() {
        this.props.fetchAllClinics();
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = item.name;
                object.value = item.id
                result.push(object)
            })
        }
        return result;
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allClinics !== this.props.allClinics) {
            let dataSelect = this.buildDataInputSelect(this.props.allClinics)
            this.setState({
                listClinics: dataSelect
            })
        }
        // if (this.props.language !== prevProps.language) {
        //     console.log('check this.props.allClinics: ', this.props.allClinics)
        //     let dataSelect = this.buildDataInputSelect(this.props.allClinics)
        //     this.setState({
        //         listClinics: dataSelect
        //     })
        // }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    handOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })

    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            this.setState({
                imageBase64: base64
            })
        }
    }

    handleSaveNewClinic = async () => {
        let res = await saveClinicService(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new clinic succeed!')
            this.setState({
                name: '',
                imageBase64: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
        } else {
            toast.error('Something wrongs...')
            console.log('Check err res: ', res)
        }
    }

    openPreviewImage = () => {
        if (!this.state.imageBase64) return;

        this.setState({
            isOpen: true
        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let res = await getAllDetailClinicById({ id: selectedOption.value })
        console.log('check res: ', res)
        let image = '';
        if (res.data.image) {
            image = new Buffer(res.data.image, 'base64').toString('binary');
        }
        if (res && res.errCode === 0 && res.data) {
            this.setState({
                descriptionHTML: res.data.descriptionHTML,
                descriptionMarkdown: res.data.descriptionMarkdown,
                address: res.data.address,
                imageBase64: image
            })
        }
    };


    render() {
        //let { listClinics } = this.state;
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý phòng khám</div>

                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên Phòng Khám</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handOnChangeInput(event, 'name')}
                        />

                    </div>

                    <div className='col-6 form-group'>
                        <label>Ảnh Phòng khám</label>
                        <div className='preview-img-container'>
                            <input id="previewImg" type="file" hidden
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />

                            <label className="label-upload" htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>
                            <div className="preview-image"
                                style={{ backgroundImage: `url(${this.state.imageBase64})` }}
                                onClick={() => this.openPreviewImage()}
                            >

                            </div>
                        </div>
                    </div>
                    <div className='col-6 form-group'>

                        <label>Chọn phòng khám</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}/////////////////
                            options={this.state.listClinics}
                            placeholder={<label>Chọn phòng khám</label>}

                        />
                    </div>

                    <div className='col-6 form-group'>
                        <label>Địa Chỉ Phòng Khám</label>
                        <input className='form-control' type='text' value={this.state.address}
                            onChange={(event) => this.handOnChangeInput(event, 'address')}
                        />

                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                            onClick={() => this.handleSaveNewClinic()}
                        >Save</button>

                    </div>

                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.imageBase64}
                        onCloseRequest={() => this.setState({ isOpen: false })}

                    />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allClinics: state.admin.allClinics,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllClinics: () => dispatch(actions.fetchAllClinics()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
