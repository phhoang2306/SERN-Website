import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions"
import './ManageSchedule.scss'
import Select from 'react-select'
import DatePicker from '../../../components/Input/DatePicker';
import {LANGUAGES} from '../../../utils';
class ManageSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            doctors: [],
            selectedOption:'',
            time: [],
            currentDate: new Date()
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
            this.setState({
                time: this.props.time_allcodes
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
    handleOnChangeDate = (date) =>{
        this.setState({
            currentDate: date[0]
        })
    }
    render() {
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
                                    minDate = {new Date()}
                                />
                            </div>
                            <div className='col-12 pick-hour-container'>
                                {time && time.length > 0 && 
                                    time.map((item, index) => {
                                        return(
                                            <button className='btn chooose-time' key = 'index'>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                    )
                                })}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors:() => dispatch(actions.fetchGetAllDoctors()),
        getTimeAllCodes:() => dispatch(actions.fetchTimeStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);