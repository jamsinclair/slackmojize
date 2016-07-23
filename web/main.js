$(function() {
  function fileError() {
    console.log('Failed processing file');
  }

  function handleFileForResize(file, callback) {
    if (file) {
      var img = new Image();

      img.src = window.URL.createObjectURL(file);

      img.onload = function() {
        var width = img.naturalWidth;
        var height = img.naturalHeight;

        window.URL.revokeObjectURL(img.src);

        if(width && height) {
          callback(width, height);
        } else {
          callback();
        }
      };
    } else {
      fileError();
    }
  }

  function postToResizeApi(operation, sizeType) {
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
        $('.image-holder').html('<img alt="your slack emoji" src="http://img-resize.com' + response.view + '">');
        console.log('success', response);
      },
      error: function(jqXHR, textStatus, errorMessage) {
        console.log(errorMessage); // Optional
      }
    });
  }

  function sendResizeRequest(width, height) {
    if (!width || !height) {
      return fileError();
    }

    if (Number(width) > Number(height)) {
      postToResizeApi('fixedWidth', 'width');
    } else {
      postToResizeApi('fixedHeight', 'height');
    }
  }

  $('#emoji-form').on('submit', function(e) {
    e.preventDefault();

    var imageFile = $('.emoji-form-img')[0].files[0];

    handleFileForResize(imageFile, sendResizeRequest);
  });
});
