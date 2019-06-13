<template>
  <div>
    <button @click="openNewModal"></button>
    <l-table :t-data="data" :t-columns="columns" :t-sort-by="sortBy">
    </l-table>
    <pagination @clickCallback="changePage" :pTotalPages="totalPages"></pagination>
    <new-modal v-if="bol" @close="closeModal"></new-modal>

  </div>
</template>

<script>
import lTable from '../components/Table'
import axios from 'axios'
import Pagination from '@/components/Pagination'
import NewModal from '@/components/NewModal'
export default {
  name: 'ListStudents',
  components: {
    lTable,
    Pagination,
    NewModal
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
      pageSize: 4,
      totalPages: 0,
      bol: false
    }
  },
  methods: {
    getAllStudents: function () {
      axios.post('/api/all-students', {
        pageNumber: this.currentPageNumber,
        pageSize: this.pageSize
      }).then((response) => {
        this.data = response.data.content
        this.totalPages = response.data.totalPages
      })
    },
    changePage: function (event) {
      this.currentPageNumber = event - 1
      this.getAllStudents()
    },
    closeModal: function () {
      console.log('hefwemfl')
      this.bol = false
    },
    openNewModal: function () {
      this.bol = true
    }
  },
  created () {
    this.getAllStudents()
  }
}
</script>
