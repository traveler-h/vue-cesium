import { createApp } from 'vue'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
createApp(App).use(router).use(ElementPlus).mount('#app')
