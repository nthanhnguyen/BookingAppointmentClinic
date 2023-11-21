import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllSpecialty } from '../../../services/userService'

class Specialty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSpecialty: []
    }
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    console.log('check res asdsad: ', res)
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data
      })
    }
  }

  render() {
    let { dataSpecialty } = this.state;

    return (
      <div className='section-share section-specialty'>
        <div className='section-container'>
          <div className='section-header'>
            <span className='title-section'>Chuyên khoa</span>
            <button className='btn-section'>Xem thêm</button>
          </div>
          <div className='section-body'>
            <Slider {...this.props.settings}>
              {dataSpecialty && dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {

                  let imageBase64 = '';//Customize khác đi để display image của Specialty
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                  }

                  return (
                    <div className='section-customize specialty-child' key={index}>
                      <div
                        className='bg-image section-specialty'
                        style={{ backgroundImage: `url(${imageBase64})` }}//Customize
                      //style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className='specialty-name'>{item.name}</div>

                    </div>
                  )
                })

              }

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
