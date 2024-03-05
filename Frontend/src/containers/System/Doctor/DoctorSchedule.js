import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions"
import moment from 'moment'
import localization from 'moment/locale/vi';
import {LANGUAGES} from '../../../utils'
import './DoctorSchedule.scss'

class DoctorSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            listDay: [],
            idDoctor: '',
            today: '', 
            clinicName: '',
            clinicAddress: ''
        }
    }
    async componentDidMount (){
        await this.handlecreateDate()
    }
    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){
            this.handlecreateDate()
        }
        if(prevProps.doctorDatafromParent !== this.props.doctorDatafromParent){
            let id = this.props.doctorDatafromParent.id
            await this.props.handleGetSchedule(id, this.state.today)
            this.setState({
                idDoctor: id
            })
            await this.props.getClinicInfo(id)
        }
        if(prevProps.clinic_data !== this.props.clinic_data){
            this.setState({
                clinicName: this.props.clinic_data.nameClinic,
                clinicAddress: this.props.clinic_data.addressClinic
            })
        }
    }
    capitalizeFirstLetter = (word) =>{
         return word.charAt(0).toUpperCase() + word.slice(1);
    }
    handlecreateDate(){
        let {language} = this.props
        // Check Language and create list
        let arr = []
        for (let i = 0; i < 7; ++i){
            let object = {}
            object.label = language === LANGUAGES.VI ? 
            this.capitalizeFirstLetter(moment(new Date()).add(i, 'days').format('dddd - DD/MM')) :  moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            arr.push(object)
        }
        this.setState({
            listDay: arr,
            today: arr[0].value
        })

    }
    handleOnChangeDate = async(event)  => {
        let id = this.props.doctorDatafromParent.id
        let date = event.target.value 
        await this.props.handleGetSchedule(id, date)
    }
    render() {
        let {listDay, clinicName, clinicAddress} = this.state
        const {schedule, language, clinic_data} = this.props
        return (
            <div className='schedule-content'>
                <div className='left-schedule-content'>
                    <div className='left-icon'>
                        <span className='tittle'><i class="fa fa-calendar">  <FormattedMessage id="schedule.schedule"/></i></span>
                    </div>
                    <select className='select-date'onChange={(event)=>this.handleOnChangeDate(event)}>
                        {}
                        {listDay && listDay.length > 0 && 
                        listDay.map((item, index)=>{
                            return(
                                <option key ={index} value = {item.value}>{item.label}</option>
                            )
                        })
                    }
                    </select>
                    <div className='time-choose'>
                        {schedule && schedule.length > 0 ?
                        <>
                            <div className='schedule-btn'>
                                {schedule.map((item, index) => 
                                {
                                    return(
                                        <button className='time-exist' key={index}>{language === LANGUAGES.VI ? item.timeData.valueVi : item.timeData.valueEn}</button>
                                    )
                                })}
                            </div>
                            <div className='choose-schedule-text'><FormattedMessage id="schedule.choose"/></div>
                        </>
                        : <div className='no-schedule'><FormattedMessage id="schedule.noti"/></div>}
                    </div>
                </div>
                <div className='right-schedule-content'>
                    <div className='address-title'><FormattedMessage id="schedule.address"/> </div>
                    <div className='clinic-name'>{clinicName}</div>
                    <div className='clinic-address'>{clinicAddress}</div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        schedule: state.doctor.schedule,
        clinic_data: state.doctor.clinic_data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleGetSchedule:(id, date) => dispatch(actions.getDoctorSchedule(id, date)),
        getClinicInfo:(id) => dispatch(actions.getClinicInfo(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);