import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import Select from 'react-select';
import 'react-markdown-editor-lite/lib/index.css';


const mdParser = new MarkdownIt(/* Markdown-it options */);



const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
           contentMarkdown:'',
           contentHtml:'',
           selectedOption:'',
           description:'',
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.state = {
            contentMarkdown:text,
            contentHtml:html    ,
        }
      }
    handleSaveContentMarkdown =() => {
        console.log('check state', this.state)
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
      };

    handleOnChangeDesc = (event) => {
        this.setState(
            {
                description: event.target.value
            }
        )
    }
    componentDidMount() {
        
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

  
    render() {
      
        
        return (
            <div className='manage-doctor-container'>
            <div className='manage-doctor-title'> Taọ thêm thông tin Doctors</div>
            
            <div className='more-infor'>
                <div className='content-left from-group'>
                    
                    <label>Chọn bác sĩ</label>
                    <Select 
                        value={this.state.selectedOption }
                        onChange={this.handleChange}
                        options={options}
                        
                    />
                </div>
                <div className='content-right '>
                <label> Thông tin giới thiệu: </label>
                    <textarea className='form-control' rows='4'
                     onChange={(event) => this.handleOnChangeDesc(event)}
                     value={this.state.description}>
                       bzbasbas
                    </textarea>
                </div>
            </div>
           
            
            <div className='manage-doctor-editor'>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />   
            </div>
            <button 
                onClick={()=>this.handleSaveContentMarkdown()}
                className='save-content-doctor'>Lưu thông tin</button>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
