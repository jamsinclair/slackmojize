import picaModule from 'pica'
const pica = picaModule()

const MAX_FILE_SIZE = 128000
const MAX_HEIGHT = 128
const MAX_WIDTH = 128

const resizeImageForSlack = async (file, type) => {
  const img = await _createImageFromUri(file);
  const fromCanvas = _createCanvasForImage(img, type);
  const toCanvas = _createSlackCanvas();
  const alpha = type.mime === 'image/png'
  let quality = 0.9
  let outputBlob

  await pica.resize(fromCanvas, toCanvas, { alpha })

  do {
    outputBlob = await pica.toBlob(toCanvas, type.mime, quality)
    quality -= 0.1
  } while (quality > 0.4 && outputBlob.size > MAX_FILE_SIZE)

  if (outputBlob.size > MAX_FILE_SIZE) {
    outputBlob = null
  }

  return outputBlob
}

const _createCanvasForImage = (img, type) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')
  const max = Math.max(img.width, img.height)
  canvas.width = max;
  canvas.height = max;

  // JPEG images do not support alpha
  // Fill background with white for better slack emoji appearance
  if (type.mime === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(
    img,
    canvas.width / 2 - img.width / 2,
    canvas.height / 2 - img.height / 2
  )

  return canvas;
}

const _createSlackCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.width = MAX_HEIGHT;
  canvas.height = MAX_WIDTH;
  return canvas;
}

const _createImageFromUri = async (file) => {
  const img = document.createElement('img');
  const uri = await file.getDataUri();

  return new Promise((resolve) => {
    img.onload = () => {
      resolve(img);
    };
    img.src = uri;
  })
}

export default resizeImageForSlack