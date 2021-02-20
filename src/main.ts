import { createApp } from 'vue';
import { ElButton, ElContainer, ElHeader, ElTable, ElTableColumn } from 'element-plus';
import App from './App.vue';

createApp(App)
  .component(ElContainer.name, ElContainer)
  .component(ElHeader.name, ElHeader)
  .component(ElTable.name, ElTable)
  .component(ElTableColumn.name, ElTableColumn)
  .component(ElButton.name, ElButton)
  .mount('#app');
