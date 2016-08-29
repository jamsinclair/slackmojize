(function(){
  Dropzone.autoDiscover = false;
})();

$(function() {
  var resizeConfig = {},
    emojiDropzone;

  function fileError() {
    console.log('Failed processing file');
  }

  function initDropzoneCallback() {
    this.on('addedfile', function(file) {
      if (this.files && this.files.length > 1) {
        this.removeFile(this.files[0]);
      }
    });

    this.on('sending', function(file, xhr, formData) {
      var emojiFormDimensionValue = $('input[name=image-dimension]:checked', '#emoji-form').val();
      formData.append('op', resizeConfig.operation);
      formData.append(resizeConfig.type, emojiFormDimensionValue);
      // Remove unneeded form value for the resize API
      formData.delete('image-dimension');
    });

    this.on('error', function(file, errorMessage, xhr) {
      if (xhr && typeof xhr === 'object') {
        var errorMessage = xhr.statusText && xhr.statusText.length ? xhr.statusText : '';
        showErrorView(false, errorMessage);
      } else {
        showErrorView(errorMessage);
      }
    });

    this.on('success', function(file, response) {
      var imageApiUrl = 'http://img-resize.com',
        // On an errored response the API seems to return a string rather than JSON
        // Ensure we have an object response to work with
        parsedResponse = (typeof response === 'string' ? JSON.parse(response) : response) || {},
        viewImgUrl = parsedResponse.view;

      if (parsedResponse.ok && typeof viewImgUrl === 'string') {
        validateEmojiContentSize(imageApiUrl + viewImgUrl);
      } else {
        showErrorView(false, parsedResponse.msg);
      }
    });
  }

  function setupDropzone() {
    emojiDropzone = new Dropzone('#emoji-form', {
      acceptedFiles: 'image/jpg,image/jpeg,image/png,image/gif,.bmp',
      addRemoveLinks: false,
      autoProcessQueue: false,
      clickable: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      maxFiles: 1,
      maxFilesize: 5,
      method: 'POST',
      paramName: 'input',
      previewsContainer: '.emoji-upload-preview',
      previewTemplate: '<div class="dz-preview dz-file-preview"><div class="dz-image"><img data-dz-thumbnail=""></div><div class="dz-details"><div class="dz-size"><span data-dz-size=""></span></div><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress=""></span></div><div class="dz-error-message"><span data-dz-errormessage=""></span></div><div class="dz-success-mark"></div></div>',
      url: '/resize',
      init: initDropzoneCallback
    });
  }

  function formatBytes(bytes,decimals) {
    if(bytes == 0) return '0 Byte';
    var k = 1000;
    var dm = decimals + 1 || 3;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  function validateEmojiContentSize(imageUrl) {
    $.ajax({
      url: '/filesize?url=' + imageUrl,
      type: 'HEAD',
      success: function(response, textStatus, xhr) {
        var imageContentLength = Number(xhr.getResponseHeader('Content-Length'));
        handleEmojiValidity(imageContentLength, imageUrl);
      },
      error: function(jqXHR, textStatus, errorMessage) {
        console.log(errorMessage);
        showErrorView();
      }
    });
  }

  function handleEmojiValidity(imageContentLength, imageUrl) {
    var isValidForSlackEmoji = imageContentLength < 64000,
      errorHeader = 'Uh oh, your image is too big to be an Emoji',
      errorMessage = 'Your resized image is still too big({{fileSize}}) and larger than the 64KB limit for Slack Emojis.',
      emojiFormDimensionValue;

    if (isValidForSlackEmoji) {
      showSuccessView(imageUrl);
    } else {
      emojiFormDimensionValue = $('input[name=image-dimension]:checked', '#emoji-form').val();
      errorMessage = errorMessage.replace('{{fileSize}}', formatBytes(imageContentLength));

      if (Number(emojiFormDimensionValue) > 32) {
        errorMessage += ' Please try again and select a smaller output size.'
      } else {
        // We don't provide an option to make the image any smaller than 32*32px. The user is most likely trying to make
        // an Animated GIF an emoji, try point them to a more useful tool for editing and downsizing a gif.
        errorMessage += [
          ' We can&apos;t really make your image much smaller. If you&apos;re trying to downsize an animated GIF image',
          ' I recommend trying to use the <a href="http://ezgif.com/resize">EZgif Animated GIF Resizer</a> tool.',
          ' Sorry about that.'
        ].join('');
      }

      showErrorView(errorHeader, errorMessage);
    }
  }

  function calculateResizeConfig(file) {
    var deferred = $.Deferred();

    if (file) {
      var img = new Image();

      img.src = window.URL.createObjectURL(file);

      img.onload = function() {
        var width = img.naturalWidth;
        var height = img.naturalHeight;

        window.URL.revokeObjectURL(img.src);

        if(width && height) {
          setResizeConfig(width, height);
          deferred.resolve();
        } else {
          deferred.reject('Error getting image dimensions');
        }
      };
    } else {
      deferred.reject('No file.');
    }

    return deferred.promise();
  }

  function setResizeConfig(width, height) {
    if (!width || !height) {
      return fileError();
    }

    if (Number(width) > Number(height)) {
      resizeConfig.operation = 'fixedWidth';
      resizeConfig.type = 'width';
    } else {
      resizeConfig.operation = 'fixedHeight';
      resizeConfig.type = 'height';
    }
  }

  function resetToUploadView() {
    emojiDropzone.removeAllFiles();
    $('.loading-view').hide();
    $('.success-view').hide();
    $('.error-view').hide();
    $('.upload-view').show();
  }

  function showLoadingView() {
    $('.success-view').hide();
    $('.error-view').hide();
    $('.upload-view').hide();
    $('.loading-view').show();
  }

  function showSuccessView(imageUrl) {
    $('.emoji-success-img').attr('src', imageUrl);

    $('.loading-view').hide();
    $('.error-view').hide();
    $('.upload-view').hide();
    $('.success-view').show();
  }

  function showErrorView(header, message) {
    var errorHeader = header || 'Oops, an unexpected error has occurred.';

    $('.error-view-header').html(errorHeader);
    $('.error-view-message').html(message);

    $('.loading-view').hide();
    $('.upload-view').hide();
    $('.success-view').hide();
    $('.error-view').show();
  }

  $('#emoji-form').on('submit', function(e) {
    e.preventDefault();

    var emojiFile = emojiDropzone.files[0];

    calculateResizeConfig(emojiFile)
      .then(function() {
        emojiDropzone.processQueue();
        showLoadingView();
      }, function(error) {
        console.log(error);
      });
  });

  $('.emoji-reset-form').on('click', resetToUploadView);

  setupDropzone();
});
