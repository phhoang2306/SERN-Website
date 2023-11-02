import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss'
class Header extends Component {

    render() {
        return (
            <React.Fragment>
                <div className='header-container'>
                    <div className='header-content'>
                        <div className='left-content'>
                            <i class="fa fa-bars"></i>
                            <div className ='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className = 'child-content'>
                                <div> <b>Chuyên khoa</b> </div>
                                <div className='sub-tittle'>Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className = 'child-content'>
                                <di> <b>Cơ sở y tế</b> </di>
                                <div className='sub-tittle'>Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className = 'child-content'>
                                <div> <b>Bác sĩ</b> </div>
                                <div className='sub-tittle'>Chọn bác sĩ giỏi</div>
                            </div>
                            <div className = 'child-content'>
                                <div> <b>Gói khám</b> </div>
                                <div className='sub-tittle'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support-content'><i class="fa fa-question-circle"></i> Hỗ trợ </div>
                            <div className='language-content'>VN</div>
                        </div>
                    </div>
                </div>
                <div className ='banner-container'>
                    <div className = 'banner-content-up'>
                        <div className = 'banner-tittle-1'>NỀN TẢNG Y TẾ</div>
                        <div className = 'banner-tittle-2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className = 'banner-search'>
                            <i className="fa fa-search"></i>
                            <input type='text' placeholder='Tìm chuyên khoa khám bệnh'/>
                        </div>
                    </div>
                     <div className = 'banner-content-down'>
                        <div className = 'banner-option'>
                            <div className ='child-option'>
                                <i className='far fa-hospital'></i>
                                <div className='text'>Khám chuyên khoa</div>
                            </div>
                            <div className ='child-option'>
                                <i class="fas fa-mobile-alt"></i>
                                <div className='text'>Khám từ xa</div>
                            </div>
                            <div className ='child-option'>
                                <i class="fas fa-procedures"></i>
                                <div className='text'>Khám tổng quát</div>
                            </div>
                            <div className ='child-option'>
                                <i className ="fa fa-stethoscope"></i>
                                <div className='text'>Xét nghiệm y học</div>
                            </div>
                            <div className ='child-option'>
                                <i className="fa fa-heart"></i>
                                <div className='text'>Sức khỏe tinh thần</div>
                            </div>
                            <div className ='child-option'>
                                <i class="fas fa-user-md"></i>
                                <div className='text'>Khám nha khoa</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
