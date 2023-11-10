import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

class Specialty extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
          };
           
        return (
            <div className='section-specialty'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <span className='title-section'>Chuyên khoa</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='specialty-body'>
                    <Slider {...settings}>
                        <div className='specialty-customize'>
                           <div className='bg-image'/>
                           <div>Sức khỏe tâm thần 1</div>
                        </div>
                        <div className='specialty-customize'>
                           <div className='bg-image'/>
                           <div>Sức khỏe tâm thần 2</div>
                        </div>
                        <div className='specialty-customize'>
                           <div className='bg-image'/>
                           <div>Sức khỏe tâm thần 3</div>
                        </div>
                        <div className='specialty-customize'>
                           <div className='bg-image'/>
                           <div>Sức khỏe tâm thần 4</div>
                        </div>
                        <div className='specialty-customize'>
                           <div className='bg-image'/>
                           <div>Sức khỏe tâm thần 5</div>
                        </div>
                        <div className='specialty-customize'>
                           <div className='bg-image'/>
                           <div>Sức khỏe tâm thần 6</div>
                        </div>
                    </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
