<template>
  <div>
        <AddStudentModal v-if="showAddModal" @close="showAddModal=false" />
        <DeleteStudentModal v-if="showDeleteModal" :student="selectedStudent"  @close="showDeleteModal=false" />
        <EditStudentModal v-if="showEditModal" :student="selectedStudent" @close="showEditModal=false" />
        
      <div class="container mt-5">
             <div class="row">
                <div>
                  <button type="submit" @click="openAddModal" class="btn btn-success">Register New Student</button>
                  <input type="text" class="border rounded-pill  w-25 p-1" id="search" v-model="searchQuery"  placeholder=" Search...">
              </div>
          </div>
              <table class="table table-bordered mt-4">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Name <span @click="sortData('name')">&#8645;</span></th>
                    <th>DoB <span @click="sortData('dob')">&#8645;</span></th>
                    <th>Municipality <span @click="sortData('municipality')">&#8645;</span></th>
                    <th>Actions</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
            
                  <tr v-for="(student, id) in paginatedItems" :key="id">
                    <td>{{ student.id }}</td>
                    <td>{{ student.name }}</td>
                    <td>{{ student.dob }}</td>
                    <td>{{ student.municipality }}</td>
                    <td>
                        <button @click="openEditModal(student)" type="button" class="btn btn-primary">Edit</button>
                        <button @click="openDeleteModal(student)" type="button" class="btn btn-danger ml-2">Delete</button>
                     </td>
                    <td>
                    </td>
                  </tr>
                </tbody>
              </table>

                <nav>
                  <ul class="pagination">
                    <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                      <a class="page-link" @click="goToPage(currentPage - 2)"><span aria-hidden="true">&lt;&lt;</span></a>
                    </li>

                    <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                      <a class="page-link" href="#" @click="goToPage(currentPage - 1)"><span class="sr-only">&lt;</span></a>
                    </li>

                    <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ 'active': currentPage === pageNumber }">
                      <a class="page-link" href="#" @click="goToPage(pageNumber)">{{ pageNumber }}</a>
                    </li>

                    <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                      <a class="page-link" href="#" @click="goToPage(currentPage + 1)"> <span class="sr-only">&gt;</span> </a>
                    </li>

                    <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                      <a class="page-link" href="#" @click="goToPage(currentPage + 2)"><span class="sr-only">&gt;&gt;</span></a>
                    </li>
                  </ul>
                </nav>
            </div>
      </div>
</template>

<script>
 

import AddStudentModal from '@/components/AddStudentModal.vue'
import DeleteStudentModal from '@/components/DeleteStudentModal.vue'
import EditStudentModal from '@/components/EditStudentModal.vue'

export default {
   components: {
    AddStudentModal,
    DeleteStudentModal,
    EditStudentModal,
  },

   data() {
    return {
       showDeleteModal: false,
       showEditModal: false,
       showAddModal:false,
       selectedStudent: null,
       searchQuery: '',
       sortOrder:'',
       currentPage: 1,
       pageSize: 10,
    }
  },

 computed: {

  paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredItems.slice(startIndex, endIndex);
    },

    totalPages() {
      return Math.ceil(this.filteredItems.length / this.pageSize);
    },

  students() {
      return this.$store.state.students
  },

  filteredItems() {
      if (this.searchQuery) {
        return this.students.filter(item => {
          return (
            item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.dob.toLowerCase().includes(this.searchQuery.toLowerCase())||
            item.municipality.toLowerCase().includes(this.searchQuery.toLowerCase())||
            item.id.toString().includes(this.searchQuery.toLowerCase()));
        });
      } else {
        return this.students;
      }
    },
  },

    methods: {
    openAddModal() {
       this.showAddModal = true
    },

    openDeleteModal(student) {
      this.selectedStudent = student
      this.showDeleteModal = true
    },
    
    openEditModal(student) {
      this.selectedStudent = student
      this.showEditModal = true
    },
    
    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    },
   
    sortData(parameter) {
      if (this.sortOrder === parameter) {
        this.filteredItems.reverse(); 
      } 
      else {
        this.filteredItems.sort((a, b) => {
          if (a[parameter] < b[parameter]) {
            return -1;
          }
          if (a[parameter] > b[parameter]) {
            return 1;
          }
          return 0;
        });
        this.sortOrder = parameter;
      }
    },
  },   
}
</script>

<style scoped>
button.btn.btn-primary {
    margin-right: 13px;
}

button.btn.btn-success {
    float: right;
}
</style>


