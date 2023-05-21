import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    users: JSON.parse(localStorage.getItem("users")),
    students: JSON.parse(localStorage.getItem("students")),
    archivedRecords: JSON.parse(localStorage.getItem("archivedRecords")),
    loggedUser: '',
  },

  getters: {
    getUser(state) {
      return state.users;
    },
    getArchivedRecords(state) {
      return state.archivedRecords;
    }
  },

  mutations: {
    addStudent(state, student) {
      state.students.push(student)
      localStorage.setItem('students', JSON.stringify(state.students))
    },

    deleteStudent(state, id) {
      const deletedStudentIndex = state.students.findIndex(student => student.id === id);
      if (deletedStudentIndex !== -1) {
        const deletedStudent = state.students.splice(deletedStudentIndex, 1)[0];
        deletedStudent.archivedDate = new Date();
        state.archivedRecords.push(deletedStudent);
        localStorage.setItem('students', JSON.stringify(state.students));
        localStorage.setItem('archivedRecords', JSON.stringify(state.archivedRecords));
      }
    },

    restoreStudent(state, id) {
      const index = state.archivedRecords.findIndex(record => record.id === id)
      if (index !== -1) {
        const studentToRestore = state.archivedRecords[index];
        state.students.push(studentToRestore);
        state.archivedRecords.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(state.students))
        localStorage.setItem('archivedRecords', JSON.stringify(state.archivedRecords))
      }
    },

    updateStudent(state, student) {
      const index = state.students.findIndex(s => s.id === student.id)
      if (index !== -1) {
        state.students.splice(index, 1, student)
        localStorage.setItem('students', JSON.stringify(state.students))
      }
    },

    setLoggedUser(state, name) {
      state.loggedUser = name;
    }

  },

  actions: {
    addStudent({ commit }, student) {
      commit('addStudent', student)
    },

    deleteStudent({ commit }, id) {
      commit('deleteStudent', id)
    },

    restoreStudent({ commit }, id) {
      commit('restoreStudent', id)
    },

    updateStudent({ commit }, newData) {
      commit('updateStudent', newData)
    },
  },
  modules: {}
})