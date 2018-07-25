<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center text-xs-center>
        <v-container grid-list-md >
          <v-layout row wrap>
             <v-flex xs12 sm8 offset-sm2>
				<div v-if="!enable">
					<v-progress-circular
						:size="100"
						color="primary"
						indeterminate
						></v-progress-circular>
						<h2 class="primary--text">Loading ... Please Wait</h2>
				</div>
				<div v-else>
					<h4 class="display-2" :style="{ color: genderColor}" v-if="!showPlaceholder">{{gender}}</h4>
					<input type="file" ref="fileInput" @change="onImageSelected" hidden accept="image/*"/>
					<img :src="selectedImage" @load="imageLoaded" ref="preview" v-if="!showPlaceholder"/>
					<img src="../assets/placeholder.svg" v-if="showPlaceholder"/><br>
					<v-btn color="success" large dark outline  @click="onImageSelect">Upload Image</v-btn>
				</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import * as utils from '@/utils.js';

export default {
	name: 'GenderDetection',
	data() {
		return {
			selectedImage: null,
			faceImage: null,
			genderModel: null,
			gender: null,
			processing: false,
			enable: false
		};
	},
	computed: {
		showPlaceholder() {
			return this.selectedImage ? false : true;
		},
		genderColor() {
			if (this.processing) {
				return '#78909C';
			}
			return this.gender.toLowerCase() === 'man' ? '#43A047' : '#FFA726';
		}
	},
	watch: {
		faceImage(val) {
			if (!this.genderModel) {
				return;
			}
			utils
				.preprocessTensor(this.faceImage)
				.then(tensor => {
					return utils.predict(tensor, this.genderModel);
				})
				.then(result => {
					const confidences = Array.from(result.dataSync());
					const genderTypes = ['Man', 'Woman'];
					this.processing = false;
					this.gender = genderTypes[confidences.indexOf(Math.max(...confidences))];
					console.log(this.gender);
				})
				.catch(err => {
					this.processing = false;
					console.log(err);
					// alert('Something not right');
				});
		}
	},
	mounted() {
		this.$nextTick(() => {
			utils
				.loadModel()
				.then(genderModel => {
					this.genderModel = genderModel;
					this.enable = true;
				})
				.catch(err => {
					// alert('Something went wrong in loading model. Please raise a github issue.');
					console.log(err);
				});
		});
	},
	methods: {
		reset() {
			this.selectedImage = null;
			this.faceImage = null;
			this.gender = null;
			this.processing = false;
		},
		onImageSelect() {
			this.reset();
			this.processing = true;
			this.gender = 'Processing ...';
			this.$refs.fileInput.click();
		},
		onImageSelected(event) {
			const selectedImageFile = event.target.files[0];
			const reader = new FileReader();

			if (selectedImageFile) {
				reader.readAsDataURL(selectedImageFile);
			}
			reader.addEventListener('load', () => {
				this.selectedImage = reader.result;
			});
		},
		imageLoaded() {
			this.findFace();
		},
		findFace() {
			this.gender = 'Finding Face ...';
			const tracker = new tracking.ObjectTracker('face');
			tracker.setStepSize(1.7);
			tracking.track(this.$refs.preview, tracker);
			tracker.on('track', event => {
				this.gender = 'Processing Face ...';
				event.data.forEach(rect => {
					const faceImageData = utils.getImagePortion(
						this.$refs.preview,
						rect.width,
						rect.height,
						rect.x,
						rect.y
					);
					this.faceImage = faceImageData;
				});
			});
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
	max-height: 500px;
	max-width: 600px;
}
@media only screen and (max-width: 600px) {
	img {
		max-height: 400px;
		max-width: 300px;
	}
}
</style>
