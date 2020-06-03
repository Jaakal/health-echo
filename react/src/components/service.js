import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Service = props => {
  const [image, setImage] = useState('');
  const { service } = props;
  const { name, category, description } = service;

  import(`../images/${name.replace(/ /g, '-').toLowerCase()}.jpg`)
    .then(image => {
      setImage(image.default);
    })
    .catch(err => {});

  return (
    <div className="service">
      <img className="service-image" src={image} alt={name} />
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
