<template>
  <paginate
    :no-li-surround="true"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :containerClass="'pagination'"
    :page-class="'page-item'">
  </paginate>
</template>

<script>
import Paginate from 'vuejs-paginate'
export default {
  name: 'Pagination',
  data () {
    return {
    }
  },
  methods: {
    clickCallback: function (pageNum) {
      this.$emit('clickCallback', pageNum)
      console.log(pageNum)
    }
  },
  components: {
    Paginate
  }
}
</script>

<style lang="css">
  .pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
  }
  .pagination a {
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    /* text-decoration: none; */
    background-color: #fff;
    border: 1px solid #ddd;
  }

</style>
