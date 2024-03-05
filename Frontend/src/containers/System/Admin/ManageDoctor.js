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
            list_province: [],
            list_payment: [],
            list_price: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note:'',
            action: CRUD_ACTIONS.CREATE
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
         if(prevProps.language!== this.props.language){
            let list_pro = this.buildListFromAllCode(this.props.province)
            let list_pay = this.buildListFromAllCode(this.props.payment)
            let list_pri = this.buildListFromAllCode(this.props.price)
            this.setState({
                list_price: list_pri,
                list_payment : list_pay,
                list_province: list_pro
            })
         }
        if(prevProps.province!== this.props.province){
            let list = this.buildListFromAllCode(this.props.province)
            this.setState({
                list_province: list
            })
        }
        if(prevProps.payment!== this.props.payment){
            let list = this.buildListFromAllCode(this.props.payment)
            this.setState({
                list_payment: list
            })
        }
        if(prevProps.price!== this.props.price){
            let list = this.buildListFromAllCode(this.props.price)
            this.setState({
                list_price: list
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            textHTML: html,
            textMarkdown: text
        })
    }
    handleOnChangeText = async(event, id) => {
        let stateCopy = {...this.state}
        stateCopy[id] = event.target.value
        await this.setState({...stateCopy})
    }
    handleChangeSelect = async(selectedOption) => {
        await this.setState({ selectedOption });
        await this.props.getDetailDoctor(this.state.selectedOption.value)   
        if(this.state.doctor_detail && this.state.doctor_detail.errCode === 0)
            if(this.state.doctor_detail.data.infoData.contentHTML !== null){
                // Variable
                let {nameClinic, addressClinic, note, selectedPayment, selectedPrice, selectedProvince} = ''
                const {list_payment, list_price, list_province} = this.state
                // Have data
                if(this.state.doctor_detail.data.doctorData.nameClinic){
                    let paymentID = this.state.doctor_detail.data.doctorData.paymentID
                    let priceID = this.state.doctor_detail.data.doctorData.priceID
                    let provinceID = this.state.doctor_detail.data.doctorData.provinceID
                    nameClinic = this.state.doctor_detail.data.doctorData.nameClinic
                    addressClinic = this.state.doctor_detail.data.doctorData.addressClinic
                    note= this.state.doctor_detail.data.doctorData.note
                    selectedPrice = list_price.find(item => {
                        return item && item.value === priceID
                    })
                    selectedPayment = list_payment.find(item => {
                        return item && item.value === paymentID
                    })
                    selectedProvince = list_province.find(item => {
                        return item && item.value === provinceID
                    })
                }
                else{
                    nameClinic = ''
                    addressClinic = ''
                    note = ''
                }
                this.setState({
                    description: this.state.doctor_detail.data.infoData.description,
                    textHTML: this.state.doctor_detail.data.infoData.contentHTML,
                    textMarkdown: this.state.doctor_detail.data.infoData.contentMarkdown,
                    nameClinic: nameClinic,
                    addressClinic: addressClinic,
                    note: note,
                    action: CRUD_ACTIONS.EDIT,
                    selectedPrice: selectedPrice,
                    selectedPayment: selectedPayment,
                    selectedProvince: selectedProvince,
                })
            }
            else{
                this.setState({
                    description: '',
                    textHTML: '',
                    textMarkdown: '',
                    nameClinic: '',
                    addressClinic: '',
                    note: '',
                    selectedPrice: '',
                    selectedPayment: '',
                    selectedProvince: '',
                    action: CRUD_ACTIONS.CREATE
                })
            }

    }
    handleOnChangeDoctorInfo = async(selectedOption, name) => {
        let stateName = name.name
        let stateCopy = {...this.state}
        stateCopy[stateName] = selectedOption
        await this.setState({...stateCopy})
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
            selectedPrice: this.state.selectedPrice,
            selectedPayment: this.state.selectedPayment,
            selectedProvince: this.state.selectedProvince,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note:this.state.note,
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
        else if(res.errCode === 4){
            toast.error(this.props.language === LANGUAGES.VI ? 'Thiếu giá khám bệnh!': res.message)
        }
        else if(res.errCode === 5){
            toast.error(this.props.language === LANGUAGES.VI ? 'Thiếu phương thức thanh toán!': res.message)
        }
        else if(res.errCode === 6){
            toast.error(this.props.language === LANGUAGES.VI ? 'Thiếu tỉnh!': res.message)
        }
        else if(res.errCode === 7){
            toast.error(this.props.language === LANGUAGES.VI ? 'Thiếu tên phòng khám!': res.message)
        }
        else if(res.errCode === 8){
            toast.error(this.props.language === LANGUAGES.VI ? 'Thiếu địa chỉ phòng khám!': res.message)
        }
        else{
            if(this.state.action === CRUD_ACTIONS.CREATE){
                toast.success(this.props.language === LANGUAGES.VI ? 'Tạo thông tin thành công': res.message)
            } else {
                toast.success(this.props.language === LANGUAGES.VI ? 'Lưu thông tin thành công': res.message)
            }
        }
        this.setState({
            description : '',
            textHTML : '',
            textMarkdown : '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note:'',
            action : CRUD_ACTIONS.CREATE
        })
    }
    buildDoctorData = (data) => {
        let result = [];
        let object = {};
        if(data && data.length > 0){
            data.map((item, index) => {
                object = {};
                object.label = item.fullname
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }
    buildListFromAllCode = (data) => {
        let {language} = this.props
        let result = [];
        let object = {};
        if(data && data.length > 0){
            data.map((item, index) => {
                object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result;
    }
    render() {
        const {language} = this.props
        const {list_province, list_payment, list_price} = this.state
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
                                placeholder={language === LANGUAGES.VI ?'Bác sĩ' : 'Doctor'}                           
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
                            <Select
                                value ={this.state.selectedPrice}
                                onChange = {this.handleOnChangeDoctorInfo}
                                options={list_price}
                                placeholder={language === LANGUAGES.VI ?'Giá khám bệnh' : 'Price'}
                                name ="selectedPrice"                           
                            />
                        </div>
                        <div className='info col-6 form-group'>
                            <label><FormattedMessage id ='doctor.payment'/></label>
                            <Select
                                value ={this.state.selectedPayment}
                                onChange = {this.handleOnChangeDoctorInfo}
                                options={list_payment}
                                placeholder={language === LANGUAGES.VI ?'Phương thức thanh toán' : 'Payment'}
                                name ="selectedPayment"                            
                            />
                        </div>
                        <div className='info col-6 form-group'>
                            <label><FormattedMessage id ='doctor.province'/></label>
                            <Select
                                value ={this.state.selectedProvince}
                                onChange = {this.handleOnChangeDoctorInfo}
                                options={list_province}
                                placeholder={language === LANGUAGES.VI ?'Tỉnh thành' : 'Province'} 
                                name ="selectedProvince"                           
                            />
                        </div>
                        <div className='info col-6 form-group'>
                            <label><FormattedMessage id ='doctor.clinic'/></label>
                            <input className='form-control'
                             onChange={(event)=>this.handleOnChangeText(event, 'nameClinic')}
                             value = {this.state.nameClinic}
                             />
                        </div>
                        <div className='info col-6 form-group'>
                            <label><FormattedMessage id ='doctor.address'/></label>
                            <input className='form-control'
                             onChange={(event)=>this.handleOnChangeText(event, 'addressClinic')}
                             value = {this.state.addressClinic}
                            />
                        </div>
                        <div className='info col-6 form-group'>
                            <label><FormattedMessage id ='doctor.note'/></label>
                            <input className='form-control'
                             onChange={(event)=>this.handleOnChangeText(event, 'note')}
                             value = {this.state.note}
                             />
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
            <button className= {this.state.action === CRUD_ACTIONS.CREATE ? 'btn create-btn' : 'btn edit-btn'}
                onClick={()=>this.handleSaveInfo()}
            >
                <FormattedMessage id ={this.state.action === CRUD_ACTIONS.CREATE ? 'system.create' : 'system.save'}/>
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
        province: state.admin.province,
        price: state.admin.price,
        payment: state.admin.payment,
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