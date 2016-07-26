$(function() {
  function fileError() {
    console.log('Failed processing file');
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
