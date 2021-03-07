import { createApp } from 'vue';
import {
  ElButton,
  ElContainer,
  ElDialog,
  ElDivider,
  ElHeader,
  ElIcon,
  ElPopconfirm,
  ElPopover,
  ElPopper,
  ElTable,
  ElTableColumn,
} from 'element-plus';
import App from './App.vue';

import '@/css/variables.css';
import '@/css/utils.css';

import '@/css/form.css';
import '@/css/containers.css';

import '@/css/main.css';

createApp(App)
  .component(ElTableColumn.name, ElTableColumn)
  .component(ElPopconfirm.name, ElPopconfirm)
  .component(ElContainer.name, ElContainer)
  .component(ElDivider.name, ElDivider)
  .component(ElPopover.name, ElPopover)
  .component(ElPopper.name, ElPopper)
  .component(ElHeader.name, ElHeader)
  .component(ElDialog.name, ElDialog)
  .component(ElButton.name, ElButton)
  .component(ElTable.name, ElTable)
  .component(ElIcon.name, ElIcon)
  .mount('#app');
