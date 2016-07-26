$(function() {
  function fileError() {
    console.log('Failed processing file');
  }

  function formatBytes(bytes,decimals) {
    if(bytes == 0) return '0 Byte';
    var k = 1000;
    var dm = decimals + 1 || 3;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  function getImageContentLength(imageUrl) {
    $.ajax({
      url: '/filesize?url=' + imageUrl,
      type: 'HEAD',
      success: function(response, textStatus, xhr) {
        var imageContentLength = Number(xhr.getResponseHeader('Content-Length'));
        console.log('content length:', xhr.getResponseHeader('Content-Length'));
        $('.image-file-size').html(formatBytes(imageContentLength));
      },
      error: function(jqXHR, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  function initFileForResize(file, outputSize, callback) {
    if (file) {
      var img = new Image();

      img.src = window.URL.createObjectURL(file);

      img.onload = function() {
        var width = img.naturalWidth;
        var height = img.naturalHeight;

        window.URL.revokeObjectURL(img.src);

        if(width && height) {
          callback(width, height, outputSize);
        } else {
          callback();
        }
      };
    } else {
      fileError();
    }
  }

  function postToResizeApi(operation, sizeType, outputSize) {
    var blobFile = $('.emoji-form-img')[0].files[0];
    var formData = new FormData();
    formData.append('input', blobFile);
    formData.append('op', operation);
    formData.append(sizeType, '128');

    $.ajax({
      url: './resize',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        var imageUrl = 'http://img-resize.com' + response.view;
        $('.image-holder').html('<img alt="your slack emoji" src="' + imageUrl + '">');
        getImageContentLength(imageUrl);
      },
      error: function(jqXHR, textStatus, errorMessage) {
        console.log(errorMessage); // Optional
      }
    });
  }

  function sendResizeRequest(width, height, outputSize) {
    if (!width || !height || !outputSize) {
      return fileError();
    }

    if (Number(width) > Number(height)) {
      postToResizeApi('fixedWidth', 'width', outputSize);
    } else {
      postToResizeApi('fixedHeight', 'height', outputSize);
    }
  }

  $('#emoji-form').on('submit', function(e) {
    e.preventDefault();

    var imageFile = $('.emoji-form-img')[0].files[0];

    initFileForResize(imageFile, '128', sendResizeRequest);
  });
});
