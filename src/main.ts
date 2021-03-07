import { createApp } from 'vue';
import { ElButton, ElContainer, ElHeader, ElIcon, ElTable, ElTableColumn } from 'element-plus';
import App from './App.vue';

import '@/css/variables.css';
import '@/css/utils.css';

import '@/css/form.css';
import '@/css/containers.css';

createApp(App)
  .component(ElContainer.name, ElContainer)
  .component(ElHeader.name, ElHeader)
  .component(ElTable.name, ElTable)
  .component(ElTableColumn.name, ElTableColumn)
  .component(ElButton.name, ElButton)
  .component(ElIcon.name, ElIcon)
  .mount('#app');
