import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class UserRedux extends Component {

    state = {
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="redux-contaier" >
                <div className='redux-title'>
                    <div className='title'>
                        USER MANAGER
                    </div>
                </div>
                <div className='redux-body'>
                    <div className='text-center'>Hello World</div>
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
