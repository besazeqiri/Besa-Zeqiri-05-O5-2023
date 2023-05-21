<template>
  <div>
    <div class="header bg-light">
      <img class="m-3" alt="logo" src="../assets/logo.png" width="70" height="70">
      <span class="m-3">Student Information System</span>
      <button class="btn btn-danger m-3" @click="logoutUser">Logout {{ loggedUser }}</button>
    </div>

    <nav class="navbar navbar-expand-sm navbar-dark bg-dark p-3">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="#" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/students" class="nav-link">Students</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/archive" class="nav-link">Archive</router-link>
        </li>
        <li class="nav-item">
          <router-link to="#" class="nav-link">Help</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    logoutUser() {
      this.$router.push('/')
    },
  },

  computed: {
    ...mapState({
      loggedUser: state => state.loggedUser
    })
  },
}
</script>

<style scoped>
img {
  border: 1px solid black;
  border-radius: 10px;
}

span {
  font-size: 22px;
}

button {
  float: right;
}
</style>