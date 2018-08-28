import React from 'react';
import Spinner from './Spinner'
import './ZipDownloadButton.css';

const ZipDownloadButton = ({ disabled, download, loading }) => {
  const loadingClass = loading ? 'ZipDownloadButton--loading' : ''
  const disabledClass = disabled ? 'ZipDownloadButton--disabled' : ''

  return (
    <a
      onClick={() => !loading && download() }
      className={`ZipDownloadButton ${loadingClass} ${disabledClass}`}
      >
      { loading ? <Spinner /> : null }
      <span>Download All</span>
    </a>
  );
}
export default ZipDownloadButton;
