<template>
  <div>
    <l-table :t-data="data" :t-columns="columns" :t-sort-by="sortBy" :tOperationName="operationName" @clicked="onClickChild" @changePage="changePage">
    </l-table>
  </div>
</template>

<script>
import lTable from '../components/Table'
import axios from 'axios'
import StudentModal from './StudentModal'
export default {
  name: 'ListStudents',
  components: {
    lTable,
    StudentModal
  },
  data () {
    return {
      data: [],
      columns: [
        {show: 'number', label: 'Student Number', dataType: 'numeric'},
        {show: 'name', label: 'Student Name'},
        {show: 'surname', label: 'Student Surname'},
        {show: 'age', label: 'Student Age', dataType: 'numeric'}
      ],
      sortBy: 'name',
      currentPageNumber: 0,
      pageSize: 4
    }
  },
  methods: {
    getAllStudents: function () {
      axios.get('/api/all-students', {
        params: {
          pageNumber: this.currentPageNumber,
          pageSize: this.pageSize
        }
      }).then((response) => {
        this.data = response.data.content
      })
    },
    changePage: function (event) {
      this.currentPageNumber = event - 1
      this.getAllStudents()
    }
  },
  created () {
    this.getAllStudents()
  }
}
</script>
