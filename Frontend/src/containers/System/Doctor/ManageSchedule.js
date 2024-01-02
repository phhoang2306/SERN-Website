import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class ManageSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot){
    }

    render() {
        return (
            <Fragment>
                Hello
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);