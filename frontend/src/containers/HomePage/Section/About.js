import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}

class About extends Component {

    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Tầm quan trọng của khám sức khỏe
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="90%" height="400" src="https://www.youtube.com/embed/JyfyBfgJoho" title="Tầm quan trọng của khám sức khỏe tổng quát định kỳ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            Phát hiện sớm bệnh
                        </p>
                        <p>
                            Tiết kiệm chi phí và thời gian
                        </p>
                        <p>
                            Nâng cao chất lượng cuộc sống
                        </p>
                        <p>
                            Tăng khả năng chữa lành bệnh
                        </p>
                        <p>
                            Có sức khỏe là có tất cả
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
