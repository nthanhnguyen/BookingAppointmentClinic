import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from '../../../store/actions';

class OutStandingDoctor extends Component {
     constructor(props) {
          super(props)
          this.state = {
               arrDoctors: []
          }
     }

     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
               this.setState({
                    arrDoctors: this.props.topDoctorsRedux
               })
          }

     }
     componentDidMount() {
          this.props.loadTopDoctors();
     }

     render() {
          console.log('check topdoctor redux: ', this.props.topDoctorsRedux)
          let arrDoctors = this.state.arrDoctors;
          return (
               <div className='section-share section-outstanding-doctor'>
                    <div className='section-container'>
                         <div className='section-header'>
                              <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                              <button className='btn-section'>Tìm kiếm</button>
                         </div>
                         <div className='section-body'>
                              <Slider {...this.props.settings}>

                                   {arrDoctors && arrDoctors.length > 0
                                        && arrDoctors.map((item, index) => {
                                             return (
                                                  <div className='section-customize' key={index}>
                                                       <div className='customize-border'>
                                                            <div className='outer-bg'>
                                                                 <div className='bg-image section-outstanding-doctor' />
                                                            </div>
                                                            <div className='position text-center'>
                                                                 <div>Giáo sư, Tiến sĩ: Nguyễn Văn A</div>
                                                                 <div>Cơ xương khớp</div>
                                                            </div>
                                                       </div>
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
          topDoctorsRedux: state.admin.topDoctors
     };
};

const mapDispatchToProps = dispatch => {
     return {
          loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
