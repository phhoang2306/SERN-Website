import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserRedux.scss"
class UserRedux extends Component {

    state = {
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="redux-container" >
                <div className='redux-title'>
                    <div className='title'>
                        USER MANAGER REDUX
                    </div>
                </div>
                <div className='redux-body'>
                    <div className='text-center'><FormattedMessage id ='user.add'/></div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-3 mt-2'>
                                <label><FormattedMessage id ='user.email'/></label>
                                <input className = "form-control" type ="email" placeholder ="@gmail.com"/>
                            </div>
                            <div className='col-3 mt-2'>
                                <label><FormattedMessage id ='user.password'/></label>
                                <input className = "form-control" type ="password"/>
                            </div>
                           <div className='col-3 mt-2'>
                                <label><FormattedMessage id ='user.fullname'/></label>
                                <input className = "form-control" type ="text" placeholder ="Full name"/>
                            </div>
                            <div className='col-3 mt-2'>
                                <label><FormattedMessage id ='user.phone'/></label>
                                <input className = "form-control" type ="text" placeholder ="+84"/>
                            </div>
                            <div className='col-6 mt-2'>
                                <label><FormattedMessage id ='user.address'/></label>
                                <input className = "form-control" type ="text" placeholder ="Ho Chi Minh City"/>
                            </div>
                            <div className='col-6 mt-2'>
                                <label><FormattedMessage id ='user.image'/></label>
                                <input className = "form-control" type ="text" placeholder =".jpeg"/>
                            </div>
                            <div className='col-3 mt-2'>
                                <label><FormattedMessage id ='user.gender'/></label>
                                <select class="form-control">
                                    <option value = '1'>Male</option>
                                    <option value = '0'>Female</option>
                                </select>
                            </div>
                            <div className='col-3 mt-2'>
                                <label><FormattedMessage id ='user.role'/></label>
                                <select class="form-control">
                                    <option value = '1'>Admin</option>
                                    <option value = '2'>User</option>
                                </select>
                            </div>
                            <div className='col-3 mt-2'>
                                <label><FormattedMessage id ='user.position'/></label>
                                <select class="form-control">
                                    <option value = '1'>Patient</option>
                                    <option value = '2'>Doctor</option>
                                </select>
                            </div>
                            <div className='col-3 mt-2'></div>
                            <div className='col-3 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id ='user.save'/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
