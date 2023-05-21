import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

const users = [
  {
    username: "test",
    password: "test"
  },
  {
    username: "besa",
    password: "123456789"
  },
];
localStorage.setItem("users", JSON.stringify(users));

const archivedRecords = [

];
localStorage.setItem("archivedRecords", JSON.stringify(archivedRecords));

const students = [
  {
    id: 1458,
    name: 'Mergim Bajrami',
    dob: '1989-10-05',
    municipality: 'Prishtine',

  },
  {
    id: 1452,
    name: 'Blerton Rexha',
    dob: '1989-10-05',
    municipality: 'Prishtine',
  },
  {
    id: 1461,
    name: 'Abdullah Krasniqi',
    dob: '1989-10-05',
    municipality: 'Prishtine',
  },
  {
    id: 1472,
    name: 'Sami Salihu',
    dob: '1989-10-06',
    municipality: 'Ferizaj',
  },
  {
    id: 1491,
    name: 'Visar Uruqi',
    dob: '1989-10-05',
    municipality: 'Prishtine',
  },
  {
    id: 1232,
    name: 'Naim Krasniqi',
    dob: '1989-10-05',
    municipality: 'Prishtine',
  },
  {
    id: 1441,
    name: 'Yllka Krasniqi',
    dob: '1989-10-05',
    municipality: 'Ferizaj',
  },
  {
    id: 1245,
    name: 'Bleona Bajraktari',
    dob: '1989-10-05',
    municipality: 'Gjilan',
  },
  {
    id: 1478,
    name: 'Kaltrina Gashi',
    dob: '1989-10-05',
    municipality: 'Peje',
  },
  {
    id: 1111,
    name: 'Dardan Jakupi',
    dob: '1989-10-05',
    municipality: 'Prizren',
  },
  {
    id: 5896,
    name: 'Jehona Beqa',
    dob: '1989-10-05',
    municipality: 'Prishtine',
  },
  {
    id: 1244,
    name: 'Besim Krasniqi',
    dob: '1989-10-05',
    municipality: 'Prishtine',
  },
  {
    id: 1495,
    name: 'Jeton Shaqiri',
    dob: '1989-10-05',
    municipality: 'Prishtine',
  },
  {
    id: 1499,
    name: 'Jetmire Fazliu',
    dob: '1989-10-05',
    municipality: 'Gjilan',
  },
  {
    id: 1490,
    name: 'Arlinda Bajrami',
    dob: '1989-10-05',
    municipality: 'Peje',
  },
  {
    id: 1497,
    name: 'Zhaneta Sherifi',
    dob: '1989-10-05',
    municipality: 'Prishtine',
  }
];
localStorage.setItem("students", JSON.stringify(students));