<template>
  <div class="wz-layout">
    <div class="wz-layout-header">header</div>
    <div class="wz-layout-content">
      <div class="wz-side-bar">
        <el-menu class="wz-menus">
          <el-sub-menu v-for="(menu, index) in menus" :key="index">
            <template #title>
              <el-icon><setting /></el-icon>
              <span>{{menu.title}}</span>
              
            </template>
          </el-sub-menu>
        </el-menu>
      </div>
      <div class="wz-main-container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        {  icon: '', title: '首页', path: '' },
        {  icon: '', title: 'About', path: '' },
        {  icon: '', title: '游戏', path: '' },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  body {
    margin: 0;
  }
.wz {
  &-layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
    &-header {
      height: 40px;
      border-bottom: 1px solid #ccc;
    }
    &-content {
      display: flex;
      flex: 1;
    }
  }
  &-side-bar {
    width: 100px;
  }
  &-menus {
    height: 100%;
  }
  &-main-container {
    flex: 1;
  }
}
</style>
