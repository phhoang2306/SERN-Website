import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions"
import './ManageSchedule.scss'
import Select from 'react-select'
import DatePicker from '../../../components/Input/DatePicker';
import {LANGUAGES} from '../../../utils';
import {toast} from 'react-toastify';
import _ from 'lodash';

class ManageSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            doctors: [],
            selectedOption:'',
            time: [],
            currentDate: ''
        }
    }

    async componentDidMount() {
        await this.props.getAllDoctors()
        await this.props.getTimeAllCodes()
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.alldoctors !== this.props.alldoctors){
            let list = this.buildDoctorData(this.props.alldoctors)
            this.setState({
                doctors: list
            })
        }
        if(prevProps.time_allcodes !== this.props.time_allcodes){
            let data = this.props.time_allcodes
            if (data && data.length > 0){
                data = data.map(item =>({...item, isSelected: false}));
            }
            this.setState({
                time: data
            })
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
    handleChangeSelect = async(selectedOption) => {
        await this.setState({ selectedOption });
    }
    handleOnChangeTime = (data) =>{
        let {time} = this.state;
        if(time && time.length > 0 &&
            time.map((item, index)=> {
                if(item.id === data.id){
                    item.isSelected =! item.isSelected
                }
            }))
        this.setState({
            time: time
        }) 
    }
    handleOnChangeDate = (date) =>{
        this.setState({
            currentDate: date[0]
        })
    }
    handleOnSave = async() =>{
        let result = []
        let {res} = this.props
        let {selectedOption, currentDate, time} = this.state
        if(!selectedOption && _.isEmpty(selectedOption)){
            toast.error(this.props.language === LANGUAGES.VI ?'Vui lòng chọn bác sĩ' : "Please choose doctor")
            return result;
        }
        if(!currentDate){
            toast.error(this.props.language === LANGUAGES.VI ?'Vui lòng chọn ngày khám' : "Please choose date")
            return result;
        }
        let formate_date = new Date(currentDate).getTime()
        if(time && time.length){
            let seleted = time.filter(item =>item.isSelected===true)
            if(seleted && seleted.length >0){
                seleted.map(item =>{
                if(item.isSelected === true){
                    let temp = {}
                    temp.doctorID = selectedOption.value;
                    temp.date = formate_date;
                    temp.timeType = item.keyMap;
                    result.push(temp)
                }
                })
            }else{
                toast.error(this.props.language === LANGUAGES.VI ?'Vui lòng chọn giờ khám' : "Please choose time")
                return result;
            }
        }
        await this.props.handleCreateSchedule(result)
        if(res && res.errCode === 0){
            toast.success(this.props.language === LANGUAGES.VI ?'Tạo lịch khám thành công' : res.errMessage)
        }
        return result;
    }
    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        const {time} = this.state
        const {language} = this.props
        return (
            <Fragment>
                <div className='schedule-container'>
                    <div className='schedule-tittle'><FormattedMessage id="schedule.manage"/></div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id ='doctor.choose'/></label>
                                <Select
                                value ={this.state.selectedOption}
                                onChange = {this.handleChangeSelect}
                                options={this.state.doctors}                            
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id ='schedule.date'/></label>
                                <DatePicker 
                                    onChange={this.handleOnChangeDate}
                                    className= 'form-control'
                                    value = {this.state.currentDate}
                                    minDate = {yesterday}
                                />
                            </div>
                            <div className='col-12 pick-hour-container'>
                                {time && time.length > 0 && 
                                    time.map((item, index) => {
                                        return(
                                            <button className= {item.isSelected === false ? 'btn chooose-time' : 'btn chooose-time active'}
                                            key = {index}
                                            onClick={() => this.handleOnChangeTime(item)}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                    )
                                })}
                            </div>
                            <div className='col-12 btn-container'>
                                <button className='btn btn-primary btn-save-schedule'
                                    onClick={()=>this.handleOnSave()}><FormattedMessage id="system.save"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        alldoctors: state.doctor.doctors,
        time_allcodes: state.admin.time,
        language: state.app.language,
        res: state.doctor.res,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors:() => dispatch(actions.fetchGetAllDoctors()),
        getTimeAllCodes:() => dispatch(actions.fetchTimeStart()),
        handleCreateSchedule:(data) =>dispatch(actions.creatDoctorSchedule(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);