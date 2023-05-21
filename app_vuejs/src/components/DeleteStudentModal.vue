<template>
  <div class="modal-mask">
     <div class="modal-wrapper">
        <div class="modal-container">

           <div class="modal-header p-2">
              <h5>Delete Confirmation</h5>
                 <button type="button" class="close btn btn-secondary"  @click="cancelDelete" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                 </button>
            </div>

              <form @submit.prevent="deleteStudent">
                 <div class="modal-body border-top"">
                    <div class="form-group row">
                        <p class="mt-4"><strong>Are you sure you want to delete the Selected User?</strong></p> 
                    </div>      
                  </div>

                  <div class="modal-footer mt-4 border">
                      <button class="btn btn-secondary " @click="cancelDelete">Cancel</button>
                      <button type="submit" class="btn btn-danger m-3">Yes</button>
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

  methods: {
    deleteStudent() {
      this.$store.commit('deleteStudent', this.student.id)
      this.$emit('close')
    },
    cancelDelete() {
      this.$emit('close')
    }
  }
}
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
  height:260px;
  width: 570px;
  margin: 0px auto;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-body {
   padding: 20px 30px;
}

</style>

