<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div>
          <input type="text" class="border rounded-pill w-25 p-1" id="search" v-model="searchQuery" placeholder="Search..." />
        </div>
      </div>

      <table class="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Index</th>
            <th>Name <span @click="sortData('name')">&#8645;</span></th>
            <th>DoB <span @click="sortData('dob')">&#8645;</span></th>
            <th>Municipality <span @click="sortData('municipality')">&#8645;</span></th>
            <th>Archive Date</th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in paginatedItems" :key="student.id">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.dob }}</td>
            <td>{{ student.municipality }}</td>
            <td>{{ formatDate(student.archivedDate) }}</td>
            <td>
              <button @click="viewStudent(student)" type="button" class="btn btn-primary">View</button>
              <button @click="restoreStudent(student)" type="button" class="btn btn-danger m-2">Restore</button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>

    <ViewStudentModal v-if="selectedStudent" :student="selectedStudent[0]" @closeModal="selectedStudent = null" />
    <RestoreStudentModal v-if="selectedRestoreStudent" :student="selectedRestoreStudent"  @closeModal="selectedRestoreStudent = null" />

      <nav v-if="totalPages > 0">
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
import ViewStudentModal from '@/components/ViewStudentModal.vue'
import RestoreStudentModal from '@/components/RestoreStudentModal.vue'

export default {
   components: {
    ViewStudentModal,
    RestoreStudentModal,
  },

  data() {
    return {
      searchQuery: '',
      sortOrder: '',
      currentPage: 1,
      pageSize: 10,
      selectedStudent: null,
      selectedRestoreStudent:null,
    };
  },

  computed: {

   archivedRecords() {
      return this.$store.state.archivedRecords;
    },

    filteredItems() {
      if (this.searchQuery) {
        return this.archivedRecords.filter((item) => {
          return (
            item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.dob.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.municipality.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.id.toString().includes(this.searchQuery.toLowerCase()));
        });
      } else {
        return this.archivedRecords;
      }
    },

    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredItems.slice(startIndex, endIndex);
    },

    totalPages() {
      return Math.ceil(this.filteredItems.length / this.pageSize);
    },
  },

  methods: {

   viewStudent(student) {
      if (student) {
        this.selectedStudent = [student];
      } else {
        this.selectedStudent = null;
      }
    },

    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },

    restoreStudent(student) {
      this.selectedRestoreStudent = student;
    },
  
    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    },

    sortData(parameter) {
      if (this.sortOrder === parameter) {
        this.filteredItems.reverse();
      } else {
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
};
</script>

<style scoped>
</style>