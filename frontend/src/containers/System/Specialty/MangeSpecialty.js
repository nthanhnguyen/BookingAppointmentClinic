import React, { Component } from 'react';
import { connect } from "react-redux";
import './MangeSpecialty.scss';
import { LANGUAGES, CRUD_ACTONS } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils'
import { getAllDetailSpecialtyById, deleteSpecialtyService } from '../../../services/userService'
import { toast } from "react-toastify"
import Select from 'react-select';
import Lightbox from 'react-image-lightbox';
import * as actions from '../../../store/actions'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class MangeSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            selectedOption: '',
            action: '',
            listSpecialties: [],
            action: CRUD_ACTONS.CREATE
        }
    }

    async componentDidMount() {
        this.props.fetchAllSpecialties();
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.allSpecialties !== this.props.allSpecialties) {
            let dataSelect = this.buildDataInputSelect(this.props.allSpecialties)
            this.setState({
                listSpecialties: dataSelect,
            })
        }
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


    handleSaveSpecialty = async () => {
        let { action } = this.state;
        if (action === CRUD_ACTONS.CREATE) {
            this.props.createSpecialtyRedux({
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                selectedOption: '',
                action: CRUD_ACTONS.CREATE
            })
        }
        if (action === CRUD_ACTONS.EDIT) {
            this.props.updateSpecialtyRedux({
                id: this.state.selectedOption.value,
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                address: this.state.address,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })
            this.setState({
                name: '',
                imageBase64: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                selectedOption: '',
                action: CRUD_ACTONS.CREATE
            })
        }
        this.props.fetchAllSpecialties();
    }

    handleDeleteSpecialty = async (specialtyId) => {
        let res = await deleteSpecialtyService(specialtyId);
        if (res && res.errCode === 0) {
            toast.success('Delete this specialty succeed!');
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                selectedOption: '',
                action: CRUD_ACTONS.CREATE
            })
            this.props.fetchAllSpecialties();
        }
        else toast.error('Delete this specialty failed!');
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let res = await getAllDetailSpecialtyById({
            id: selectedOption.value,
            location: 'ALL'
        })
        let image = '';
        if (res.data.image) {
            image = new Buffer(res.data.image, 'base64').toString('binary');
        }
        if (res && res.errCode === 0 && res.data) {
            this.setState({
                name: res.data.name,
                descriptionHTML: res.data.descriptionHTML,
                descriptionMarkdown: res.data.descriptionMarkdown,
                imageBase64: image,
                action: CRUD_ACTONS.EDIT
            })
        }
        console.log(this.state)
    };

    openPreviewImage = () => {
        if (!this.state.imageBase64) return;

        this.setState({
            isOpen: true
        })
    }


    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý chuyên khoa</div>

                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handOnChangeInput(event, 'name')}
                        />

                    </div>

                    <div className='col-6 form-group'>
                        <label>Ảnh chuyên khoa</label>
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
                            onChange={this.handleChangeSelect}
                            options={this.state.listSpecialties}
                            placeholder={<label>Chọn phòng khám</label>}

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
                            onClick={() => this.handleSaveSpecialty()}>Save</button>
                        <button className='btn-delete-specialty'
                            onClick={() => this.handleDeleteSpecialty(this.state.selectedOption.value)}>
                            Delete
                        </button>

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
        allSpecialties: state.admin.allSpecialties,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialties: () => dispatch(actions.fetchAllSpecialties()),
        createSpecialtyRedux: (data) => dispatch(actions.createSpecialty(data)),
        updateSpecialtyRedux: (data) => dispatch(actions.updateSpecialty(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MangeSpecialty);
