<template>
  <div class="app-container">
    <!-- 列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" align="center">
        <template v-slot="{row}">{{row.id}}</template>
      </el-table-column>
      <el-table-column label="账户名" align="center">
        <template v-slot="{row}">{{row.accountname}}</template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    ></pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getPlayers } from '@/api/players'
import { Player } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'PlayerList',
  components: {
    Pagination
  }
})
export default class list extends Vue {
  // 玩家列表数据
  list: Player[] = []

  // 加载状态
  listLoading = true

  // 总条目数量
  total = 0

  // 查询
  listQuery = {
    page: 1, // 默认第一页
    limit: 10 // 每页条数
  }

  created() {
    // 获取列表数据
    this.getList()
  }

  // 获取列表
  async getList() {
    this.listLoading = true
    const { data } = await getPlayers(this.listQuery)
    // console.log(data)
    // 设置列表数据
    this.list = data.players
    // 设置数据总条数
    this.total = data.total
    this.listLoading = false
  }
}
</script>

<style lang="scss" scoped>

</style>
