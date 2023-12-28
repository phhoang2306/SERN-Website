import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES} from '../../../utils'
import MarkdownIt from 'markdown-it';
import * as actions from "../../../store/actions"
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import Select from 'react-select'
import {toast} from 'react-toastify';
// Const variables
const mdParser = new MarkdownIt(/* Markdown-it options */)
class ManageDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedOption: '',
            textHTML: '',
            textMarkdown: '',
            description: '',
            doctors: []
        }
    }
    async componentDidMount() {
        this.props.getAllDoctors()
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.alldoctors !== this.props.alldoctors){
            let list = this.buildDoctorData(this.props.alldoctors)
            this.setState({
                doctors: list
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            textHTML: html,
            textMarkdown: text
        })
    }
    handleChangeSelect = selectedOption =>{
        this.setState({selectedOption});
    }
    handleChangeDecription = (event) =>{
        this.setState({
            description: event.target.value
        })
    }
    handleSaveInfo = async () =>{
        let data = {
            contentHTML: this.state.textHTML,
            contentMarkdown: this.state.textMarkdown,
            description: this.state.description,
            doctorID: this.state.selectedOption.value
        }
        //console.log(this.state.doctors)
        //console.log(data)
        await this.props.createDoctorInfo(data)
        let {res} = this.props
       // console.log(res)
        if(res.errCode === 1){
            toast.error(this.props.language === LANGUAGES.VI ? 'Thiếu nội dung HTML!': res.message)
        }
        else if(res.errCode === 2){
            toast.error(this.props.language === LANGUAGES.VI ? 'Thiếu nội dung Markdown!': res.message)
        }
        else if(res.errCode === 3){
            toast.error(this.props.language === LANGUAGES.VI ? 'Thiếu ID bác sĩ!': res.message)
        }
        else{
            toast.success(this.props.language === LANGUAGES.VI ? 'Lưu  thông tin thành công': res.message)
        }

    }
    buildDoctorData = (doctors) => {
        let result = [];
        let object = {};
        if(doctors && doctors.length > 0){
            doctors.map((item, index) => {
                object = {};
                object.label = item.fullname
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }
    render() {
        return (
            <div className='manage-container'>
                <div className='manage-title'><FormattedMessage id ='menu.admin.manage-doctor-info'/></div>
                <div className='manage-body'>
                    <div className='body-info'>
                        <div className='body-info-left'>
                            <label className='body-title'><FormattedMessage id ='doctor.choose'/></label>
                            <Select
                                value ={this.state.selectedOption}
                                onChange = {this.handleChangeSelect}
                                options={this.state.doctors}                            
                            />
                        </div>                    
                        <div className='body-info-right'>
                            <label className='body-title'><FormattedMessage id ='doctor.information'/></label>
                            <textarea className='form-control' rows={4}
                                onChange={(event)=>this.handleChangeDecription(event)}
                                value = {this.state.description}
                            >
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
            <button className='save-button'
                onClick={()=>this.handleSaveInfo()}
            >
                <FormattedMessage id ='system.save'/>
            </button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        alldoctors: state.doctor.doctors,
        language: state.app.language,
        res: state.doctor.res
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors:() => dispatch(actions.fetchGetAllDoctors()),
        createDoctorInfo:(data) => dispatch(actions.creatDoctorInfo(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);