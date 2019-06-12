<template>
    <modal
      @close="closeModal()">
      <template v-slot:header>
        Additive Students List
      </template>
      <template v-slot:body>
        <div>
          <h4>Derse kayıtlı olmayan Öğrenciler</h4>
          <l-table :t-data="data" :t-columns="columns" :t-sort-by="sortBy" :tOperationName="operationName" @clicked="onClickChild"></l-table>
            <pagination @clickCallback="changePage" :pTotalPages="totalPages" ></pagination>
          <l-table :t-data="registeredData" :t-columns="columns" :t-sort-by="sortBy"></l-table>
            <pagination @clickCallback="changePageRegistered" :pTotalPages="registeredTotalPages"></pagination>
        </div>
      </template>
    </modal>
</template>
<script>
import Modal from '../components/Modal.vue'
import lTable from '../components/Table'
import Pagination from '@/components/Pagination'
import axios from 'axios'
export default {
  name: 'StudentModal',
  components: {
    Modal,
    lTable,
    Pagination
  },
  data () {
    return {
      data: [],
      registeredData: [],
      columns: [
        {show: 'number', label: 'Student Number', dataType: 'numeric'},
        {show: 'name', label: 'Student Name'},
        {show: 'surname', label: 'Student Surname'},
        {show: 'age', label: 'Student Age', dataType: 'numeric'}
      ],
      sortBy: 'name',
      operationName: 'Add',
      currentPageNumber: 0,
      pageSize: 4,
      totalPages: 0,
      registeredTotalPages: 0,
      registeredCurrentPageNumber: 0,
      registeredPageSize: 4
    }
  },
  props: {
    lessonCode: {
      type: String
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    },
    changePage: function (event) {
      this.currentPageNumber = event - 1
      this.getAdditiveStudentList()
    },
    changePageRegistered: function (event) {
      this.registeredCurrentPageNumber = event - 1
      this.getRegisteredStudentList()
    },
    onClickChild: function (value) {
      axios.post('/api/add-student-to-lesson', {
        studentId: value,
        lessonId: this.lessonCode
      }).then(reponse => {
        this.getAdditiveStudentList()
      })
    },
    getAdditiveStudentList: function () {
      axios.get('/api/additive-students-list', {
        params: {
          lessonId: this.lessonCode,
          pageNumber: this.currentPageNumber,
          pageSize: this.pageSize

        }
      }).then((response) => {
        this.data = response.data.content
        this.totalPages = response.data.totalPages
        this.getRegisteredStudentList()
      })
    },
    getRegisteredStudentList () {
      axios.get('api/get-registered-students', {
        params: {
          lessonId: this.lessonCode,
          pageNumber: this.registeredCurrentPageNumber,
          pageSize: this.registeredPageSize

        }
      }).then(response => {
        this.registeredData = response.data.content
        this.registeredTotalPages = response.data.totalPages
      })
    }
  },
  created () {
    this.getAdditiveStudentList()
  }
}
</script>
