import VueTransitions from "@morev/vue-transitions";
import "@morev/vue-transitions/styles";
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);
app.use(VueTransitions);
app.mount('#app')
