import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES} from '../../../utils'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import Select from 'react-select'

// Const variables
const mdParser = new MarkdownIt(/* Markdown-it options */)
const options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'},
]

class ManageDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedOption: '',
        }
    }
    async componentDidMount() {
    }
    
    componentDidUpdate(prevProps, prevState, snapshot){
    }

    handleEditorChange({ html, text }) {
        console.log('handleEditorChange', html, text);
    }

    handleChangeSelect = selectedOption =>{
        this.setState({selectedOption});
        console.log("Option selected: ", selectedOption)
    }
    render() {
        return (
            <div className='manage-container'>
                <div className='manage-title'><FormattedMessage id ='menu.admin.manage-doctor-info'/></div>
                <div className='manage-body'>
                    <div className='body-info'>
                        <div className='body-info-left'>
                            <label className='body-title'><FormattedMessage id ='doctor.information'/></label>
                            <Select
                                value ={this.state.selectedOption}
                                onChange = {this.handleChangeSelect}
                                options={options}                            
                            />
                        </div>                    
                        <div className='body-info-right'>
                            <label className='body-title'><FormattedMessage id ='doctor.choose'/></label>
                            <textarea className='form-control' rows={4}>
                                Hello
                            </textarea>
                        </div>
                    </div>
                    <div className='body-editor'>
                        <MdEditor 
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} />
                    </div>
                </div>
            <button className='save-button'>
                <FormattedMessage id ='system.save'/>
            </button>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);