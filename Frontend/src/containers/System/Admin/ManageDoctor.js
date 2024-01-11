import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES, CRUD_ACTIONS} from '../../../utils'
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
            doctors: [],
            doctor_detail: '',
            action: CRUD_ACTIONS.CREAT
        }
    }
    async componentDidMount() {
        await this.props.getAllDoctors()
        await this.props.getDoctorAllCode()
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.alldoctors !== this.props.alldoctors){
            let list = this.buildDoctorData(this.props.alldoctors)
            this.setState({
                doctors: list
            })
        }
        if(prevProps.data_doctor !== this.props.data_doctor){
            this.setState({
                doctor_detail: this.props.data_doctor
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            textHTML: html,
            textMarkdown: text
        })
    }
    handleChangeSelect = async(selectedOption) => {
        await this.setState({ selectedOption });
        await this.props.getDetailDoctor(this.state.selectedOption.value)   
        if(this.state.doctor_detail && this.state.doctor_detail.errCode === 0)
            //console.log(this.props.data_doctor.data.infoData)
            if(this.state.doctor_detail.data.infoData.contentHTML !== null){
                this.setState({
                    description: this.state.doctor_detail.data.infoData.description,
                    textHTML: this.state.doctor_detail.data.infoData.contentHTML,
                    textMarkdown: this.state.doctor_detail.data.infoData.contentMarkdown,
                    action: CRUD_ACTIONS.EDIT
                })
            }
            else{
                this.setState({
                    description: '',
                    textHTML: '',
                    textMarkdown: '',
                    action: CRUD_ACTIONS.CREAT
                })
            }

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
            doctorID: this.state.selectedOption.value,
            action: this.state.action
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
            if(this.state.action === CRUD_ACTIONS.CREAT){
                toast.success(this.props.language === LANGUAGES.VI ? 'Tạo thông tin thành công': res.message)
            } else {
                toast.success(this.props.language === LANGUAGES.VI ? 'Lưu thông tin thành công': res.message)
            }
        }
        this.setState({
            description : '',
            textHTML : '',
            textMarkdown : '',
            action : CRUD_ACTIONS.CREAT
        })
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
                                placeholder={'Choose doctor'}                           
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
                    <div className='further-info row'>
                        <div className='info col-6 form-group'>
                            <label><FormattedMessage id ='doctor.price'/></label>
                            <input className='form-control'/>
                        </div>
                        <div className='info col-6 form-group'>
                            <label><FormattedMessage id ='doctor.payment'/></label>
                            <input className='form-control'/>
                        </div>
                        <div className='info col-6 form-group'>
                            <label><FormattedMessage id ='doctor.province'/></label>
                            <input className='form-control'/>
                        </div>
                        <div className='info col-6 form-group'>
                            <label><FormattedMessage id ='doctor.clinic'/></label>
                            <input className='form-control'/>
                        </div>
                        <div className='info col-6 form-group'>
                            <label><FormattedMessage id ='doctor.address'/></label>
                            <input className='form-control'/>
                        </div>
                        <div className='info col-6 form-group'>
                            <label><FormattedMessage id ='doctor.note'/></label>
                            <input className='form-control'/>
                        </div>
                    </div>
                    <div className='body-editor'>
                        <MdEditor 
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value = {this.state.textMarkdown}/>
                    </div>
                </div>
            <button className= {this.state.action === CRUD_ACTIONS.CREAT ? 'btn create-btn' : 'btn edit-btn'}
                onClick={()=>this.handleSaveInfo()}
            >
                <FormattedMessage id ={this.state.action === CRUD_ACTIONS.CREAT ? 'system.create' : 'system.save'}/>
            </button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        alldoctors: state.doctor.doctors,
        language: state.app.language,
        res: state.doctor.res,
        resAdmin: state.admin.resAdmin,
        data_doctor: state.doctor.doctor_data
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors:() => dispatch(actions.fetchGetAllDoctors()),
        createDoctorInfo:(data) => dispatch(actions.creatDoctorInfo(data)),
        getDetailDoctor:(id) => dispatch(actions.getDetailDoctor(id)),
        getDoctorAllCode:() => dispatch(actions.fetchDoctorAllCode())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);