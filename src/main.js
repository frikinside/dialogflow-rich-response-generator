import { createApp } from 'vue';
import App from './App.vue';
import Utils from './utils.js';
import VueClickAway from 'vue3-click-away';

var app = createApp(App);
app.use(VueClickAway);
app.mount('#app');
app.config.devtools = true;

app.config.globalProperties.$utils = Utils;

app.directive('autosize', {
	beforeMount(el) {
		el.style.overflowY = 'hidden';
	},
	mounted(el) {
		el.addEventListener('input', function(event) {
			event.target.style.height = 'auto';
			event.target.style.height = event.target.scrollHeight + 'px';
		});
	},
});
