import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import swedishMassage from '../images/swedish-massage.jpg';
import deepTissueMassage from '../images/deep-tissue-massage.jpg';
import lymphaticDrainageMassage from '../images/lymphatic-drainage-massage.jpg';
import myopractic from '../images/myopractic.jpg';
import prenatalMassage from '../images/prenatal-massage.jpg';
import sportsMassage from '../images/sports-massage.jpg';
import therapeuticMassage from '../images/therapeutic-massage.jpg';
import therapyForKids from '../images/therapy-for-kids.jpg';
import triggerPointTherapy from '../images/trigger-point-therapy.jpg';

const Service = props => {
  const { service } = props;
  const { name, category, description } = service;

  return (
    <div className="service">
      {name === 'Swedish Massage' && <img className="service-image" src={swedishMassage} alt="Swedish Massage" />}
      {name === 'Deep Tissue Massage' && <img className="service-image" src={deepTissueMassage} alt="Deep Tissue Massage" />}
      {name === 'Lymphatic Drainage Massage' && <img className="service-image" src={lymphaticDrainageMassage} alt="Lymphatic Drainage Massage" />}
      {name === 'Myopractic' && <img className="service-image" src={myopractic} alt="Myopractic" />}
      {name === 'Prenatal Massage' && <img className="service-image" src={prenatalMassage} alt="Prenatal Massage" />}
      {name === 'Sports Massage' && <img className="service-image" src={sportsMassage} alt="Sports Massage" />}
      {name === 'Therapeutic Massage' && <img className="service-image" src={therapeuticMassage} alt="Therapeutic Massage" />}
      {name === 'Therapy for Kids' && <img className="service-image" src={therapyForKids} alt="Therapy for Kids" />}
      {name === 'Trigger Point Therapy' && <img className="service-image" src={triggerPointTherapy} alt="Trigger Point Therapy" />}

      <div className="service-info">
        <div>
          <div className="service-name">{name}</div>
          <div className="service-category">{category}</div>
        </div>
      </div>
      <div className="service-description">{description}</div>
    </div>
  );
};

Service.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default connect(null, null)(Service);
