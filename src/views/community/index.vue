<template>
  <div>
    <el-header>
      <el-menu mode="horizontal" :router="true" default-active="1">
        <el-menu-item index="1" route="/community/profile">社团资料</el-menu-item>
        <el-menu-item index="2" route="/community/member">成员管理</el-menu-item>
        <el-submenu index="5">
          <template slot="title">{{ community.name }}</template>
          <el-menu-item index="5-1" route="/community/password">修改密码</el-menu-item>
          <el-menu-item @click="handleLogout">注销</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </div>
</template>

<script>
import { current } from '@/api/community'

export default {
  data() {
    return {
      community: {}
    }
  },
  computed: {
    username() {
      return this.$store.getters.username
    }
  },
  mounted() {
    current().then(res => {
      this.community = res.data
    })
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>

<style scoped>

</style>
