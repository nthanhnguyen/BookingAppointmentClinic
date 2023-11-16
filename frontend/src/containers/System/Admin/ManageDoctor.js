import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';
import 'react-markdown-editor-lite/lib/index.css';
import { CRUD_ACTONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';
import { has } from 'markdown-it/lib/common/utils';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,
            //save to doctor infor table
            listPrice: [],
            listPayment: [],
            listProvinces: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note:''


        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTONS.EDIT : CRUD_ACTONS.CREATE
        })
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });

        let res = await getDetailInforDoctor(selectedOption.value)
        // MarkDown lấy từ db (ko phải Markdown)
        // Các điều kiện trong đây khác trong video, đc cutomzie lại để chạy cho đúng luồng (Nó vẫn đúng)
        if (res && res.errCode === 0 && res.data && res.data.MarkDown
            && res.data.MarkDown.contentHTML !== null
            && res.data.MarkDown.contentMarkdown !== null
            && res.data.MarkDown.description !== null) {
            let markdown = res.data.MarkDown
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }

        console.log('check res data: ', res)
    };

    handleOnChangeDesc = (event) => {
        this.setState(
            {
                description: event.target.value
            }
        )
    }
    componentDidMount() {
        this.props.fetchAllDoctors()
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id
                result.push(object)
            })

        }

        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({

                listDoctors: dataSelect
            })
        }
    }

    render() {
        let { hasOldData } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'> <FormattedMessage id={"admin.manage-doctor.title"}/></div>

                <div className='more-infor'>
                    <div className='content-left from-group'>

                        <label><FormattedMessage id={"admin.manage-doctor.select-doctor"}/> </label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={'Chọn bác sĩ'}

                        />
                    </div>
                    <div className='content-right '>
                        <label> <FormattedMessage id={"admin.manage-doctor.intro"}/> </label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            //value={this.state.description !== null ? this.state.description : ''} // Sửa tạm (khác trong video)
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 from-group'>
                        <label>Chọn giá</label>
                        <input className='form-control'/>
                    </div>
                    <div className='col-4 from-group'>
                        <label>Chọn Phương thức thanh toán</label>
                        <input className='form-control'/>
                    </div>
                    <div className='col-4 from-group'>
                        <label>Chọn tỉnh thành</label>
                        <input className='form-control'/>
                    </div>
                    <div className='col-4 from-group'>
                        <label>Tên Phòng Khám</label>
                        <input className='form-control'/>
                    </div>
                    <div className='col-4 from-group'>
                        <label>Địa chỉ Phòng khám</label>
                        <input className='form-control'/>
                    </div>
                    <div className='col-4 from-group'>
                        <label>Note</label>
                        <input className='form-control'/>
                    </div>
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        //value={this.state.contentMarkdown !== null ? this.state.contentMarkdown : ''} // Sửa tạm (khác trong video)
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"} >
                    {hasOldData === true ?
                        <span><FormattedMessage id={"admin.manage-doctor.add"}/></span> : <span><FormattedMessage id={"admin.manage-doctor.save"}/></span>
                    }

                </button>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
