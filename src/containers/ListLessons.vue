<template>
  <div>
      <l-table :t-data="data" :t-columns="columns" :t-sort-by="sortBy" :tOperationName="operationName" @clicked="onClickChild" @changePage="changePage"></l-table>
      <pagination @clickCallback="changePage" :pTotalPages="totalPages"></pagination>
      <student-modal v-if="isShowModal" @close="closeModal" :lessonCode="selectedLesson"></student-modal>
  </div>
</template>

<script>
import lTable from '../components/Table'
import axios from 'axios'
import StudentModal from './StudentModal'
import Pagination from '@/components/Pagination'
export default {
  name: 'ListLessons',
  components: {
    lTable,
    StudentModal,
    Pagination
  },
  data () {
    return {
      data: [],
      columns: [
        {show: 'code', label: 'Lesson Code'},
        {show: 'name', label: 'Lesson Name'},
        {show: 'credit', label: 'Lesson Credit', dataType: 'numeric'},
        {show: 'hour', label: 'Lesson Hour', dataType: 'numeric'},
        {show: 'instructor', label: 'Lesson Instructor'}
      ],
      sortBy: 'code',
      isShowModal: false,
      selectedLesson: '',
      operationName: 'Edit',
      currentPageNumber: 0,
      pageSize: 4,
      totalPages: 0
    }
  },
  created () {
    this.getAllLessons()
  },
  methods: {
    onClickChild: function (value) {
      this.isShowModal = true
      this.selectedLesson = value
    },
    closeModal: function () {
      this.isShowModal = false
    },
    getAllLessons: function () {
      axios.get('/api/all-lessons', {
        params: {
          pageNumber: this.currentPageNumber,
          pageSize: this.pageSize
        }
      }).then((response) => {
        this.data = response.data.content
        this.totalPages = response.data.totalPages
      })
    },
    changePage: function (event) {
      this.currentPageNumber = event - 1
      this.getAllLessons()
    }
  }
}
</script>
