<template>
  <div>
    <l-table :t-data="data" :t-columns="columns" :t-sort-by="sortBy" :tOperationName="operationName" @clicked="onClickChild"></l-table>
    <student-modal v-if="isShowModal" @close="closeModal" :lessonCode="choisenLesson"></student-modal>
  </div>
</template>

<script>
import lTable from '../components/Table'
import axios from 'axios'
import StudentModal from './StudentModal'
export default {
  name: 'ListLessons',
  components: {
    lTable,
    StudentModal
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
      choisenLesson: '',
      operationName: 'Edit'
    }
  },
  created () {
    axios.get('/api/all-lessons').then((response) => {
      this.data = response.data
    })
  },
  methods: {
    onClickChild: function (value) {
      this.isShowModal = true
      this.choisenLesson = value
      console.log('ListLesson Edit.Value:  ' + value)
    },
    closeModal: function () {
      this.isShowModal = false
    }
  }
}
</script>
