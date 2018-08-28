import React, { Component } from 'react';
import ZipDownloadButton from './ZipDownloadButton'
import JsZip from 'jszip'
import { saveAs } from 'file-saver'

class ZipDownloadContainer extends Component {
  loading = false;
  disabled = false;

  download = () => {
    this.createZipFile()
      .then(fileContent => saveAs(fileContent, 'slackmojis.zip'))
  };

  createZipFile = () => {
    const zip = new JsZip();

    for (let key in this.props.files) {
      const file = this.props.files[key]
      zip.file(file.original.data.name, file.resizedBlob)
    }

    return zip.generateAsync({ type: 'blob'})
  };

  render() {
    const fileKeys = Object.keys(this.props.files)

    if (!fileKeys.length) {
      return null;
    }

    // Files can only be ready to download when all uris are populated
    // @todo Clean this up. Simple property whether file is ready would be great
    const filesNotReady = fileKeys.some(key => {
      return !this.props.files[key].ready
    })


    return <ZipDownloadButton
      disabled={filesNotReady}
      loading={this.loading}
      download={this.download}
      />;
  }
}

export default ZipDownloadContainer;
