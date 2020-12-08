<template>
  <div class="app-container">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getPlayers } from '@/api/players'
import { Player } from '@/api/types'
@Component
export default class list extends Vue {
  // 玩家列表数据
  list: Player[] = []

  // 加载状态
  listLoading = true

  created() {
    // 获取列表数据
    this.getList()
  }

  // 获取列表
  async getList() {
    this.listLoading = true
    const { data } = await getPlayers({})
    console.log(data)
    this.list = data.players
    this.listLoading = false
  }
}
</script>

<style lang="scss" scoped>

</style>
