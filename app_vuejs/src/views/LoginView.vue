<template>
  <div>
    <div class="d-flex justify-content-center mt-5">
      <img alt="logo" src="../assets/logo.png" width="80" height="80">
      <span class="mt-4 h5">Student Information System</span>
    </div>

    <div class="login d-flex justify-content-center mt-5">
      <form @submit.prevent="login">
        <div class="form-group row">
          <label for="username" class="col-sm-4 col-form-label">Username</label>
          <div class="col-sm-8">
            <input type="text" id="username" class="form-control" v-model="username" placeholder="Username" />
            <span v-if="usernameError" class="error">{{ usernameError }}</span>
          </div>
        </div>

        <div class="form-group row mt-1">
          <label for="password" class="col-sm-4 col-form-label">Password</label>
          <div class="col-sm-8">
            <input type="password" id="password" v-model="password" class="form-control" placeholder="Password" />
            <span v-if="passwordError" class="error">{{ passwordError }}</span>
          </div>
        </div>

        <div class="form-group row mt-2">
          <label for="" class="col-sm-4 col-form-label"></label>
          <div class="form-check col-sm-8">
            <input class="form-check-input" type="checkbox">
            <label class="form-check-label"> Remember me </label>
          </div>
        </div>

        <button type="submit" class="btn btn-primary mt-2">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      usernameError: '',
      passwordError: '',
      users: [],
    };
  },

  methods: {
    validateUsername() {
      if (!this.username) {
        this.usernameError = 'Please enter username.';
      } else {
        this.usernameError = '';
      }
    },

    validatePassword() {
      if (!this.password) {
        this.passwordError = 'Please enter password.';
      } else {
        this.passwordError = '';
      }
    },

    login() {
      this.users = this.$store.getters.getUser;
      const user = this.users.find(user => user.username === this.username && user.password === this.password);

      if (user) {
        this.$store.commit('setLoggedUser', user.username);
        this.$router.push("/students");
      } else {
        this.validateUsername();
        this.validatePassword();
      }
      this.username = this.password = '';
    }
  }
}
</script>

<style scoped>
button {
  float: right;
}

label {
  font-size: 20px;
}

span {
  margin-left: 20px;
}

img {
  border: 1px solid black;
  border-radius: 10px;
}

.error {
  color: red;
}
</style>