import { createApp } from 'vue';
import App from './App.vue';

var app = createApp(App);
app.config.compilerOptions.isCustomElement = (tag) => tag === 'df-messenger';
app.mount('#app');
app.config.devtools = true;
