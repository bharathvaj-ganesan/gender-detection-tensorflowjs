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
