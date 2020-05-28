import React, { useLayoutEffect, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import $ from 'jquery';

import swedishMassage from '../images/swedish-massage.jpg';
import deepTissueMassage from '../images/deep-tissue-massage.jpg';
import lymphaticDrainageMassage from '../images/lymphatic-drainage-massage.jpg';
import myopractic from '../images/myopractic.jpg';
import prenatalMassage from '../images/prenatal-massage.jpg';
import sportsMassage from '../images/sports-massage.jpg';
import therapeuticMassage from '../images/therapeutic-massage.jpg';
import therapyForKids from '../images/therapy-for-kids.jpg';
import triggerPointTherapy from '../images/trigger-point-therapy.jpg';

import { setUserApiBaseURL, setServicesToActiveComponent, logOutUser } from '../actions/index';

import '../css/services.css';

const useWindowSize = () => {
  const [sizeChanged, setSizeChanged] = useState(true);

  useLayoutEffect(() => {
    const updateSize = () => {
      setSizeChanged(true);
    };

    window.addEventListener('resize', updateSize);

    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return sizeChanged;
};

const Services = props => {
  const [services, setServices] = useState([]);
  const [checkboxIndex, setCheckboxIndex] = useState(undefined);
  const [city, setCity] = useState('Choose a City');
  const [address, setAddress] = useState('Choose a Address');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState('Choose a Duration');
  const [price, setPrice] = useState(undefined);
  const [activeServiceIndex, setActiveServiceIndex] = useState(undefined);
  const [activeService, setActiveService] = useState({
    active: false,
    category: undefined,
    name: undefined,
  });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [fixSize, setFixSize] = useState(true);
  const [bookingDone, setBookingDone] = useState(false);
  const {
    token, url, setUserApiBaseURL, setServicesToActiveComponent, logOutUser,
  } = props;

  const [locationKeys, setLocationKeys] = useState([]);
  const history = useHistory();

  const getServices = () => {
    axios.defaults.baseURL = url;

    if (url !== '' && window.location.href !== url) {
      const activeServiceArray = window.location.href.replace(url, '').split('/');
      setActiveService({
        active: true,
        category: activeServiceArray[0],
        name: activeServiceArray[1],
      });
    }

    axios.post('body_treatment/index', { user: { token } })
      .then(response => {
        if (response.data.loggedIn) {
          setServices(response.data.services);
        } else {
          logOutUser();
        }
      })
      .catch(error => {});
  };

  const setAppointment = () => {
    axios.defaults.baseURL = url;

    axios.post('appointment/create', {
      user: {
        token,
        city,
        address,
        date,
        duration,
        category: services[activeServiceIndex].category,
        service: services[activeServiceIndex].name,
      },
    })
      .then(response => {
        if (response.data.loggedIn) {
          if (response.data.appointmentSet) {
            setBookingDone(true);
          }
        } else {
          logOutUser();
        }
      })
      .catch(error => {});
  };

  const resizeWindow = () => {
    if (window.location.href === url) {
      for (let i = 0; i < services.length; i += 1) {
        $(`#service-link-wrapper-${i}`).css('height', `${$(`#service-${i}`).outerHeight(true)}px`);
        $(`#service-link-inner-wrapper-${i}`).css({ height: `${$(`#service-${i}`).outerHeight(true)}px`, position: 'absolute' });
      }
    }
  };

  const widenComponent = (event, index) => {
    if (fixSize) {
      resizeWindow();
      setFixSize(false);
    }

    const doc = document.documentElement;
    setScrollPosition((window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0));

    $('html, body').animate({
      scrollTop: 0,
    }, 900);

    if (event !== undefined && activeServiceIndex === index) {
      event.preventDefault();
    } else if (activeServiceIndex !== undefined) {
      $(`#service-link-inner-wrapper-${activeServiceIndex}`).removeClass('full-screen');
    }

    $(`#service-link-inner-wrapper-${index}`).addClass('full-screen');
    $(`#service-link-inner-wrapper-${index} .booking-form`).addClass('fade-in');
    $(`#service-link-inner-wrapper-${index} .close-service`).addClass('fade-in');

    let offset = 0;
    for (let i = 0; i < index; i += 1) {
      offset += $(`#service-link-wrapper-${i}`).outerHeight();
    }

    $(`#service-link-inner-wrapper-${index}`).css('transform', `translateY(-${offset}px)`);
    $(`#service-link-inner-wrapper-${index}`).css('height', `${$('.services').outerHeight() + 1}px`);

    setActiveServiceIndex(index);
  };

  const normalizeComponent = () => {
    setBookingDone(false);
    resizeWindow();

    if (activeServiceIndex !== undefined) {
      const currentPosition = $(`#service-link-wrapper-${activeServiceIndex}`).position().top;

      $('html, body').animate({
        scrollTop: scrollPosition < (currentPosition - $(window).height())
          ? currentPosition : scrollPosition,
      }, 900);

      $(`#service-link-inner-wrapper-${activeServiceIndex}`).css('transform', 'translateY(0)');
      $(`#service-link-inner-wrapper-${activeServiceIndex}`).css('height', `${$(`#service-${activeServiceIndex}`).outerHeight()}px`);
      $(`#service-link-inner-wrapper-${activeServiceIndex} .booking-form`).removeClass('fade-in');
      $(`#service-link-inner-wrapper-${activeServiceIndex} .close-service`).removeClass('fade-in');
    }
  };

  const handleCheckboxChange = (event, index) => {
    switch (event.target.id) {
      case 'choose-a-city':
        setCity(event.target.value);
        setAddress('Choose a Address');
        setDuration('Choose a Duration');
        setDate(new Date().toISOString().split('T')[0]);
        setPrice(undefined);
        break;
      case 'choose-a-address':
        setAddress(event.target.value);
        setDuration('Choose a Duration');
        setDate(new Date().toISOString().split('T')[0]);
        setPrice(undefined);
        break;
      case 'date':
        setDate(event.target.value);
        setDuration('Choose a Duration');
        setPrice(undefined);
        break;
      case 'choose-a-duration':
        setDuration(event.target.value);
        break;
      default:
        break;
    }

    setCheckboxIndex(index);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setAppointment();
  };

  const handleClick = event => {
    history.goBack();
  };

  useEffect(() => {
    window.addEventListener('resize', resizeWindow);

    if (services.length === 0) {
      getServices();
      setServicesToActiveComponent();
    }

    if (duration !== 'Choose a Duration') {
      setPrice(services[checkboxIndex].city[city].address[address].duration[duration].price);
    } else if (duration === 'Choose a Duration' && price !== undefined) {
      setPrice(undefined);
    }

    if (url === '') {
      setUserApiBaseURL(window.location.href);
    }

    if (activeService.active && services.length !== 0) {
      services.forEach((service, index) => {
        if (service.category.replace(/ /g, '-').toLowerCase() === activeService.category && service.name.replace(/ /g, '-').toLowerCase() === activeService.name) {
          widenComponent(undefined, index);
          setActiveService({ active: false, category: undefined, name: undefined });
        }
      });
    }

    return history.listen(location => {
      if (history.action === 'PUSH') {
        setLocationKeys([location.key]);
      }

      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);
          widenComponent(undefined, activeServiceIndex);
        } else {
          setLocationKeys(keys => [location.key, ...keys]);
          normalizeComponent();
        }
      }
      window.removeEventListener('resize', resizeWindow);
    });
  }, [services, duration, url, activeService.active, activeService.category, activeService.name,
    history, checkboxIndex, city, address, setUserApiBaseURL, locationKeys, activeServiceIndex]);

  let keyIndex = 0;

  return (
    <div className="services">
      {services.map((service, index) => (
        <div id={`service-link-wrapper-${index}`} className="service-link-wrapper" key={`service-${keyIndex += 1}`}>
          <div id={`service-link-inner-wrapper-${index}`} className="service-link-inner-wrapper">
            <Link
              id={`service-${index}`}
              className="service"
              onClick={event => widenComponent(event, index)}
              to={
                {
                  pathname: `${service.category.replace(/ /g, '-').toLowerCase()}/${service.name.replace(/ /g, '-').toLowerCase()}`,
                  state: {
                    service,
                  },
                }
}
            >
              {service.name === 'Swedish Massage' && <img className="service-image" src={swedishMassage} alt="Swedish Massage" />}
              {service.name === 'Deep Tissue Massage' && <img className="service-image" src={deepTissueMassage} alt="Deep Tissue Massage" />}
              {service.name === 'Lymphatic Drainage Massage' && <img className="service-image" src={lymphaticDrainageMassage} alt="Lymphatic Drainage Massage" />}
              {service.name === 'Myopractic' && <img className="service-image" src={myopractic} alt="Myopractic" />}
              {service.name === 'Prenatal Massage' && <img className="service-image" src={prenatalMassage} alt="Prenatal Massage" />}
              {service.name === 'Sports Massage' && <img className="service-image" src={sportsMassage} alt="Sports Massage" />}
              {service.name === 'Therapeutic Massage' && <img className="service-image" src={therapeuticMassage} alt="Therapeutic Massage" />}
              {service.name === 'Therapy for Kids' && <img className="service-image" src={therapyForKids} alt="Therapy for Kids" />}
              {service.name === 'Trigger Point Therapy' && <img className="service-image" src={triggerPointTherapy} alt="Trigger Point Therapy" />}

              <div className="service-info">
                <div>
                  <div className="service-name">{service.name}</div>
                  <div className="service-category">{service.category}</div>
                </div>
              </div>
              <div className="service-description">{service.description}</div>
            </Link>
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="select-wrapper">
                <div className="arrow-down" />
                <select id="choose-a-city" value={index === checkboxIndex && city} onChange={event => handleCheckboxChange(event, index)}>
                  <option>Choose a City</option>
                  {Object.keys(service.city).map(city => <option key={city}>{city}</option>)}
                </select>
              </div>

              <div className="select-wrapper">
                {(index === checkboxIndex && city !== 'Choose a City') && <div className="arrow-down" /> }
                <select id="choose-a-address" disabled={!((index === checkboxIndex && city !== 'Choose a City'))} value={index === checkboxIndex && address} onChange={event => handleCheckboxChange(event, index)}>
                  <option>Choose a Address</option>
                  {(index === checkboxIndex && city !== 'Choose a City') && Object.keys(service.city[city].address).map(address => <option key={address}>{address}</option>)}
                </select>
              </div>
              <div className="input-wrapper">
                <input type="date" disabled={!((index === checkboxIndex && address !== 'Choose a Address'))} value={(index === checkboxIndex && address !== 'Choose a Address') && date} onChange={event => handleCheckboxChange(event, index)} id="date" name="date" min={new Date().toISOString().split('T')[0]} />
              </div>

              <div className="select-wrapper">
                {(index === checkboxIndex && address !== 'Choose a Address') && <div className="arrow-down address-arrow" /> }
                <select id="choose-a-duration" disabled={!((index === checkboxIndex && address !== 'Choose a Address'))} value={index === checkboxIndex && duration} onChange={event => handleCheckboxChange(event, index)}>
                  <option>Choose a Duration</option>
                  {(index === checkboxIndex && address !== 'Choose a Address') && Object.keys(service.city[city].address[address].duration).map(duration => <option key={duration}>{duration}</option>)}
                </select>
              </div>

              {(index === checkboxIndex && price !== undefined)
                  && (
                  <div className="booking-price">
                    <div className="price-value">
                      <span className="price-label">Price: </span>
                      {price}
                      $
                    </div>
                    <button type="submit">Book Service</button>
                  </div>
                  )}
            </form>
            {(index === checkboxIndex && bookingDone) && <div className="booking-confirmed">See you soon!</div>}
            <button type="button" className="close-service" onClick={handleClick}>Close Service</button>
          </div>
        </div>
      ))}
    </div>
  );
};

Services.propTypes = {
  token: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  setUserApiBaseURL: PropTypes.func.isRequired,
  setServicesToActiveComponent: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token,
  url: state.api.url,
});

const mapDispatchToProps = dispatch => ({
  setUserApiBaseURL: url => {
    dispatch(
      setUserApiBaseURL(url),
    );
  },
  setServicesToActiveComponent: () => {
    dispatch(
      setServicesToActiveComponent(),
    );
  },
  logOutUser: () => {
    dispatch(
      logOutUser(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Services);
