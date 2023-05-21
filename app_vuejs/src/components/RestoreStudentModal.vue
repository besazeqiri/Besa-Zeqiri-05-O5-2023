<template>
  <div class="modal">
    <div class="modal-container">
      <div class="modal-header border">
        <h4>Restore Student</h4>
        <button type="button" class="close btn btn-secondary" @click="closeModal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form @submit.prevent="restoreStudent">
        <div class="modal-body mt-2">
          <div v-if="student">
            <label><strong>Name:</strong>
              <input type="text" v-model="student.name" readonly>
            </label>

            <label><strong>Date of Birth:</strong>
              <input type="text" v-model="student.dob" readonly>
            </label>

            <label><strong>Municipality:</strong>
              <input type="text" v-model="student.municipality" readonly>
            </label>
          </div>
      
            <div class="buttons">
               <button class="btn btn-secondary m-2" @click="closeModal">Cancel</button>
               <button type="submit" class="btn btn-primary">Restore</button>
           </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    student: {
      type: Object,
      required: true,
    },
  },
  methods: {
    restoreStudent() {
      this.$store.commit('restoreStudent', this.student.id);
      this.$emit('closeModal');
    },
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  height: 430px;
  width: 500px;
  background-color: #fff;
}

.modal-body {
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 20px;
}

label input[type="text"]{
  margin:4px;
}

input[type="text"] {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #ccc;
}

.buttons{
  float:right;
}
</style>