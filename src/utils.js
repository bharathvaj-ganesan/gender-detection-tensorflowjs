import * as tf from '@tensorflow/tfjs';

function getImagePortion(img, newWidth, newHeight, startX, startY) {
	/* the parameters: - the image element - the new width - the new height - the x point we start taking pixels - the y point we start taking pixels - the ratio */
	//set up canvas for thumbnail
	var tnCanvas = document.createElement('canvas');
	var tnCanvasContext = tnCanvas.getContext('2d');

	tnCanvas.width = newWidth;
	tnCanvas.height = newHeight;

	/* use the sourceCanvas to duplicate the entire image. This step was crucial for iOS4 and under devices. Follow the link at the end of this post to see what happens when you don’t do this */
	var bufferCanvas = document.createElement('canvas');
	var bufferContext = bufferCanvas.getContext('2d');
	bufferCanvas.width = img.width;
	bufferCanvas.height = img.height;
	bufferContext.drawImage(img, 0, 0);

	/* now we use the drawImage method to take the pixels from our bufferCanvas and draw them into our thumbnail canvas */
	tnCanvasContext.drawImage(bufferCanvas, startX, startY, newWidth, newHeight, 0, 0, newWidth, newHeight);
	return tnCanvas.toDataURL();
}

function resizeImage(imageData) {
	return new Promise((resolve, reject) => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const size = 96;
		canvas.width = size;
		canvas.height = size;
		const image = new Image();
		image.src = imageData;
		image.onload = () => {
			ctx.drawImage(image, 0, 0, size, size);
			resolve(canvas);
		};
		image.onerror = reject;
	});
}

function loadModel() {
	return tf.loadModel('/gender/model.json');
}

function saveModelToLocalStorage(model) {
	return model.save('localstorage://model');
}

function predict(tensor, model) {
	return model.predict(tensor);
}

function preprocessTensor(imageData) {
	return resizeImage(imageData).then(canvas => {
		let tensor = tf.fromPixels(canvas);
		tensor = tf.cast(tensor, 'float32');
		tensor = tensor.div(255.0);
		tensor = tensor.expandDims(0);
		return tensor;
	});
}

export { getImagePortion, loadModel, predict, preprocessTensor, saveModelToLocalStorage };
