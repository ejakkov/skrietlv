import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Noir from './presets/Noir.js';

import 'primeicons/primeicons.css'; 

const app = createApp(App);

app.use(router);

app.use(PrimeVue, {
    theme: {
        preset: Noir,
        options: {
            prefix: 'p',
            darkModeSelector: '.p-dark',
            cssLayer: false,
        }
    }
});

app.component("Button", Button);

app.mount('#app');
