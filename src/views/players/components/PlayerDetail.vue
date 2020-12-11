<template>
  <div>
    <el-form ref="form" :model="playerForm">
      <el-form-item prop="accountname" :label="$t('player.accountname')">
        <el-input v-model="playerForm.accountname"></el-input>
      </el-form-item>
      <el-form-item prop="nickname" :label="$t('player.nickname')">
        <el-input v-model="playerForm.nickname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">{{$t('player.submit')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { defaultPlayerData, getPlayer } from '@/api/players'

@Component
export default class playerDetail extends Vue {
  // 编辑模式
  @Prop({ default: false })
  isEdit!: boolean

  // 数据模型，默认全为空，复制defaultPlayerData，防止全局污染
  playerForm = Object.assign({}, defaultPlayerData)

  // 加载状态
  loading = false

  // 根据isEdit状态决定是否需要获取玩家详细信息
  create() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }
  }

  async fetchData(id: number) {
    try {
      const { data } = await getPlayer(id)
      this.playerForm = data.player
    } catch (error) {
      console.error(error)
    }
  }

  // 提交表单
  async submitForm() {
    // 加载状态
    this.loading = true

    // 提交操作
    try {
      if (this.isEdit) {
        // await updatePlayer(this.playerForm.id, this.playerForm)
      } else {
        // await createPlayer(this.playerForm)
      }
    } catch (error) {
      console.error(error)
    }

    // 操作成功提示信息
    this.$notify({
      title: '操作成功',
      message: '新增玩家数据成功',
      type: 'success',
      duration: 2000
    })

    // 还原加载状态
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>

</style>
