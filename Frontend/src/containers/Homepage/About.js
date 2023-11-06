import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './About.scss';
class About extends Component {
    render() {
        return (
            <div className='about-container'>
                <div className='about-header'>
                    <span><FormattedMessage id ='common.social'/></span>
                </div>  
                <div className='about-body'> 
                    <div className='content-left'>         
                        <iframe width="50%" height="400px" 
                        src="https://www.youtube.com/embed/psZ1g9fMfeo" 
                        title="SƠN TÙNG M-TP | CHÚNG TA CỦA HIỆN TẠI | OFFICIAL MUSIC VIDEO" 
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen>
                        </iframe>
                    </div> 
                    <div className='content-right'>
                        <p> 
                            Chúng ta của hiện tại, em dành cả thanh xuân cho anh. Anh dành cả thanh xuân cho em. Chúng ta dành cả thanh xuân cho nhau mà không hề nghĩ suy. Gặp nhau là duyên phận. Xa nhau cũng là duyên phận. Chẳng ai biết tương lai sau này. Dù sau này có nhau hay không thể bên nhau cũng đừng quên rằng, chúng ta đã dành tất cả điều tuyệt vời nhất cho nhau. Thương em !
                        </p>
                    </div>   
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
