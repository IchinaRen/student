<template>
  <el-row>
    <el-col :span="24">
      <el-menu :default-active="this.$route.path" class="el-menu-demo" mode="horizontal" router @select="handleSelect">
        <el-menu-item index="/student" route="/student">
          本科生管理
        </el-menu-item>
        <el-menu-item index="/graduate" route="/graduate">
          研究生管理
        </el-menu-item>
        <el-menu-item index="/course" route="/course">
          课程管理
        </el-menu-item>
        <el-menu-item index="/ChooseCourse" route="/ChooseCourse">
          选课管理
        </el-menu-item>
        <el-menu-item index="/ShowData" route="/ShowData">
          数据统计
        </el-menu-item>
        <router-view/>
      </el-menu>
    </el-col>
  </el-row>


</template>

<script>

export default {
  name: 'app',
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>