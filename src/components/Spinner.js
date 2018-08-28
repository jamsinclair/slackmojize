

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import './Spinner.css';

const Spinner = ({ className }) => (
  <div className={`Spinner ${className}`}>
    <FontAwesomeIcon icon={faCircleNotch} size="1x" />
  </div>
);

export default Spinner;
