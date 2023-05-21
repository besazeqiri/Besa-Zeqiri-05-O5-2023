<template>
  <div>
    <HeaderView/>
    <StudentList v-if="isStudentPage"/>
    <ArchiveList v-if="isArchivePage"/>
  </div>
</template>

<script>
import HeaderView from '@/views/HeaderView.vue'
import StudentList from '@/components/StudentList.vue'
import ArchiveList from '@/components/ArchiveList.vue'

export default {
  components: {
    HeaderView,
    StudentList,
    ArchiveList
  },
  computed: {
    isStudentPage() {
      return this.$route.path === '/students';
    },
    isArchivePage() {
      return this.$route.path === '/archive';
    }
  }
};
</script>

<style scoped>

</style>