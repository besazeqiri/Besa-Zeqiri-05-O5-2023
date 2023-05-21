<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header p-2">
          <h5>Edit Student</h5>
          <button type="button" class="close btn btn-secondary" @click="cancelEdit" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form @submit.prevent="editStudent">
          <div class="modal-body border-top">

            <div class="form-group row">
              <label for="id" class="col-sm-4 mt-3 col-form-label">Index</label>
              <div class="col-sm-3">
                <input type="text" class="form-control" readonly v-model="studentDetails.id">
              </div>
            </div>

            <div class="form-group row">
              <label for="name" class="col-sm-4 mt-3 col-form-label">Name</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" v-model="studentDetails.name">
                <span v-if="errors.name" class="error">{{ errors.name }}</span>
              </div>
            </div>

            <div class="form-group row">
              <label for="name" class="col-sm-4 mt-3 col-form-label">Date of Birth</label>
              <div class="col-sm-6">
                <input type="date" class="form-control" v-model="studentDetails.dob">
                <span v-if="errors.dob" class="error">{{ errors.dob }}</span>
              </div>
            </div>

            <div class="form-group row">
              <label for="municipality" class="col-sm-4 col-form-label">Municipality</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" v-model="studentDetails.municipality">
                <span v-if="errors.municipality" class="error">{{ errors.municipality }}</span>
              </div>
            </div>
          </div>

          <div class="modal-footer border">
            <div class="modal-buttons">
              <button class="btn btn-secondary m-2" @click="cancelEdit">Cancel</button>
              <button type="submit" class="btn btn-primary">Edit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    student: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      studentDetails: {},
      errors: ''
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (this.studentDetails.name === "") {
        this.errors.name = "Please fill in the name field.";
      }
      if (this.studentDetails.dob === "") {
        this.errors.dob = "Please fill in the Date of Birth field.";
      }
      if (this.studentDetails.municipality === "") {
        this.errors.municipality = "Please fill in the municipality field.";
      }

      return Object.keys(this.errors).length === 0;
    },

    editStudent() {
      if (this.validateForm()) {
        this.$store.commit("updateStudent", this.studentDetails);
        this.$emit("close");
      }
    },

    cancelEdit() {
      this.$emit("close");
    }
  },

  beforeMount() {
    this.studentDetails = { ...this.student };
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
  padding: 20px 30px;
}

.error {
  color: red;
}

.modal-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background-color: #f5f5f5;
  text-align: right;
}

.modal-buttons {
  position: relative;
}

input:read-only {
  background-color: #ccc;
}
</style>