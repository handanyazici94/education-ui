<template>
  <div>
    <l-table :t-data="data" :t-columns="columns" :t-sort-by="sortBy" :tOperationName="operationName" @clicked="onClickChild">
    </l-table>
      <pagination></pagination>
  </div>
</template>

<script>
import lTable from '../components/Table'
import axios from 'axios'
import StudentModal from './StudentModal'
import Pagination from '../components/Pagination'
export default {
  name: 'ListStudents',
  components: {
    lTable,
    StudentModal,
    Pagination
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
      sortBy: 'name'
    }
  },
  methods: {
    getAllStudents: function () {
      axios.get('/api/all-students').then((response) => {
        this.data = response.data
      })
    },
    async fetchData ({ page, filter, sort }) {
      const response = await axios.get('/api/all-students', { page })

      // An object that has a `data` and an optional `pagination` property
      return response
    }
  },
  created () {
    this.getAllStudents()
  }
}
</script>
