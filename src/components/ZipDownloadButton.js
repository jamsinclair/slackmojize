import React from 'react';
import './ZipDownloadButton.css';

const ZipDownloadButton = ({ disabled, download, loading }) => {
  const disabledClass = disabled ? 'ZipDownloadButton--disabled' : ''

  return (
    <a
      onClick={() => !loading && download() }
      className={`ZipDownloadButton ${disabledClass}`}
      >
      <span>Download All</span>
    </a>
  );
}
export default ZipDownloadButton;
