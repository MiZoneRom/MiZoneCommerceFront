<template>
<section>
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="admin"
        label="管理员"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="备注">
      </el-table-column>
    </el-table>
</section>
  
</template>
<script>
export default {
  data() {
    return {
      username: "",
      tableData: [{
            date: '2016-05-02',
            admin: '孙广源',
            address: '把刘海威打了十分钟'
          }, {
            date: '2016-05-04',
            admin: '孙广源',
            address: '把刘海威打了二十分钟'
          }, {
            date: '2016-05-01',
            admin: '孙广源',
            address: '把刘海威打了三十分钟'
          }, {
            date: '2016-05-03',
            admin: '孙广源',
            address: '把刘海威打了四十分钟'
          }]
    };
  },
  methods: {},
  created() {
    this.username = JSON.parse(sessionStorage.getItem("admin"));
  }
};
</script>
<style lang='less' scoped>
</style>