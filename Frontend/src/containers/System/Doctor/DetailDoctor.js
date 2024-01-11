import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../store/actions"
import {LANGUAGES} from '../../../utils'
import Header from '../../Homepage/Header'
import Footer from '../../Homepage/Footer';
import DoctorSchedule from './DoctorSchedule';
import "./DetailDoctor.scss"
class DetailDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: '',
            description: '',
            contentHTML: '',
            position: ''
        }
    }
    async componentDidMount() {
        if(this.props.match  && this.props.match.params && this.props.match.params.id){
            let id =  this.props.match.params.id
            await this.props.getDetailDoctor(id)
    }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.data_doctor !== this.props.data_doctor){
            this.setState({
                data: this.props.data_doctor.data,
                description: this.props.data_doctor.data.infoData.description,
                position: this.props.data_doctor.data.positionData,
                contentHTML: this.props.data_doctor.data.infoData.contentHTML
            })
        }
    }
    render() {
        const {data, contentHTML, description, position} = this.state
        const {language} = this.props
        const viName = position.valueVi + ' ' + data.fullname;
        const enName = position.valueEn + ' ' + data.fullname;
        let imageBase64= '';
        if(data.image){
            imageBase64 = new Buffer(data.image, 'base64').toString('binary');
        }
        return(
            <Fragment>
                <Header isShow ={false}/>
                <div className='detail-container'>
                    <div className='detail-header'>
                        <div className='doctor-image'
                        style={{backgroundImage: `url(${imageBase64})`}}>
                        </div>
                        <div className='doctor-description'> 
                            <div className='doctor-name'> {language === LANGUAGES.VI ? viName : enName}
                                </div>
                            <div className='doctor-sub'>{description}</div>
                        </div>
                    </div>
                    <div className='schedule-body'>
                        <DoctorSchedule doctorDatafromParent = {data}/>
                    </div>
                    <div className='detail-body'>
                        {contentHTML !== '' && 
                            <div dangerouslySetInnerHTML={{__html:contentHTML}}>
                        </div>}
                        <div className='h3'></div>
                    </div>
                </div>
                <Footer isShow ={true}/>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        data_doctor: state.doctor.doctor_data, 
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctor:(id) => dispatch(actions.getDetailDoctor(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
