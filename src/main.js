import { createApp } from 'vue';
import App from './App.vue';

var app = createApp(App);
app.mount('#app');
app.config.devtools = true;

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
