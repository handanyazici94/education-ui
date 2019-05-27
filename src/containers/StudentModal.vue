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
          <l-table :t-data="registeredData" :t-columns="columns" :t-sort-by="sortBy"></l-table>
        </div>
      </template>
    </modal>
</template>
<script>
import Modal from '../components/Modal.vue'
import lTable from '../components/Table'
import axios from 'axios'
export default {
  name: 'StudentModal',
  components: {
    Modal,
    lTable
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
      operationName: 'Add'
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
    onClickChild: function (value) {
      axios.post('/api/add-student-to-lesson', {
        studentId: value,
        lessonId: this.lessonCode
      }).then(reponse => {
        this.getAdditiveStudentList()
      })
    },
    getAdditiveStudentList: function () {
      let data = new FormData()
      data.append('lessonId', this.lessonCode)
      axios.post('/api/additive-students-list', data).then((response) => {
        this.data = response.data
        this.getRegisteredStudentList()
      })
    },
    getRegisteredStudentList () {
      let data = new FormData()
      data.append('lessonId', this.lessonCode)
      axios.post('api/get-registered-students', data).then(response => {
        this.registeredData = response.data
      })
    }
  },
  created () {
    this.getAdditiveStudentList()
  }
}
</script>
