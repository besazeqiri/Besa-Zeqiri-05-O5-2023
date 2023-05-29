<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header p-2">
          <h5>Add Student</h5>
          <button type="button" class="close btn btn-secondary" @click="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form @submit.prevent="addStudent">
          <div class="modal-body border-top">
            <div class="form-group row">
              <label for="id" class="col-sm-4 mt-3 col-form-label">Index</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" v-model="id">
                <span v-if="errors.id" class="error">{{ errors.id }}</span>
              </div>
            </div>

            <div class="form-group row">
              <label for="name" class="col-sm-4 mt-3 col-form-label">Name</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" v-model="name">
                <span v-if="errors.name" class="error">{{ errors.name }}</span>
              </div>
            </div>

            <div class="form-group row">
              <label for="dob" class="col-sm-4 mt-3 col-form-label">Date of Birth</label>
              <div class="col-sm-6">
                <input type="date" class="form-control" v-model="dob">
                <span v-if="errors.dob" class="error">{{ errors.dob }}</span>
              </div>
            </div>

            <div class="form-group row">
              <label for="municipality" class="col-sm-4 col-form-label">Municipality</label>
              <div class="col-sm-6">
                <select v-model="municipality" class="form-select">
                  <option v-for="option in municipalities" :value="option.name">
                        {{ option.name }}
                  </option>
                </select>
                <span v-if="errors.municipality" class="error">{{ errors.municipality }}</span>
              </div>
            </div>
          </div>

          <div class="modal-footer border">
            <div class="modal-buttons">
              <button class="btn btn-secondary m-2" @click="close">Cancel</button>
              <button type="submit" class="btn btn-success">Add</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      id: '',
      name: '',
      dob: '',
      municipality: '',
      errors: ''
    };
  },
  methods: {
    close() {
      this.id = '';
      this.name = '';
      this.dob = '';
      this.municipality = '';
      this.$emit('close');
    },
    validateForm() {
      this.errors = {};

      if (this.id === '') {
        this.errors.id = 'Please fill the id field.';
      }
      if (this.name === '') {
        this.errors.name = 'Please fill the name field.';
      }
      if (this.dob === '') {
        this.errors.dob = 'Please fill the Date of Birth field.';
      }
      if (this.municipality === '') {
        this.errors.municipality = 'Please fill the municipality field.';
      }

      return Object.keys(this.errors).length === 0;
    },
    addStudent() {
      if (this.validateForm()) {
        this.$store.commit('addStudent', {
          id: this.id,
          name: this.name,
          dob: this.dob,
          municipality: this.municipality
        });
        this.close();
      }
    }
  },
  computed:{
     ...mapState({
      municipalities: state => state.municipalities
    }),
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  height: 420px;
  width: 900px;
  margin: 0px auto;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  position: relative;
}

.modal-body {
  margin: 0;
  padding: 10px 10px;
}

.error {
  color: red;
}

.modal-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: #f5f5f5;
  text-align: right;
}

.modal-buttons {
  position: relative;
}
</style>