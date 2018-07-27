<template>
  <v-app>
    <v-toolbar
    dark color="primary"
      app
    >
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <GenderDetect/>
    </v-content>
    <v-footer :fixed="true" app>
       <v-flex
        primary
        lighten-2
        py-3
        text-xs-center
        white--text
        xs12
      >
        &copy;2018 — <strong><a class="white--text" target ="_blank" href="https://bharathvajganesan.me">bharathvajganesan</a></strong>
      </v-flex>
    </v-footer>
    <a href="https://github.com/bharathvaj1995/gender-detection-tensorflowjs"><img style="position: absolute; top: 0; right: 0; border: 0; z-index:1200" src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png" alt="Fork me on GitHub"></a>
  </v-app>
</template>

<script>
import GenderDetect from './components/GenderDetect';

export default {
	name: 'App',
	components: {
		GenderDetect
	},
	data() {
		return {
			items: [
				{
					icon: 'bubble_chart',
					title: 'Inspire'
				}
			],
			title: 'Gender Detection'
		};
	}
};
</script>
