<template>
  <el-col :span="20" :offset="2">
    <el-descriptions title="学生信息" class="margin-top" :column="3" :size=1 border>
      <el-descriptions-item label="学号">{{ data.sid }}</el-descriptions-item>
      <el-descriptions-item label="姓名">{{ data.sname }}</el-descriptions-item>
      <el-descriptions-item label="生日">{{ data.birthday }}</el-descriptions-item>
      <el-descriptions-item label="年级">{{ data.grade }}</el-descriptions-item>
      <el-descriptions-item label="专业">{{ data.major }}</el-descriptions-item>
      <el-descriptions-item label="类型">{{ data.type }}</el-descriptions-item>
      <el-descriptions-item label="班级">{{ data.classes }}</el-descriptions-item>
      <el-descriptions-item label="班主任">{{ data.classTeacher }}</el-descriptions-item>
      <el-descriptions-item label="导师">{{ data.tutor }}</el-descriptions-item>
      <el-descriptions-item label="研究方向">{{ data.tutor }}</el-descriptions-item>
      <el-descriptions-item label="已选学分">{{ credit }}</el-descriptions-item>
    </el-descriptions>
    <el-table :data="tableData" stripe>
      <el-table-column
          prop="cid"
          label="课程号"
      >
      </el-table-column>
      <el-table-column
          prop="cname"
          label="课程名"
      >
      </el-table-column>
      <el-table-column
          prop="credit"
          label="学分"
      >
      </el-table-column>
    </el-table>

  </el-col>
</template>

<script>

export default {
  name: "StudentIntroduce",
  created() {
    let _this = this;
    let url = '/api/student/findById/' + _this.$route.query.sid;

    axios.get(url).then(function (response) {
      console.log(response.data)
      _this.data = response.data;
      console.log(url);
    })
    url = '/api/studentTcousrse/findById/' + _this.$route.query.sid;

    axios.get(url).then(function (response) {
      console.log(response.data)
      _this.tableData = response.data;
      console.log(url);
    })
    url = '/api/studentTcousrse/SumCredit/' + _this.$route.query.sid;
    axios.get(url).then(function (response) {
      _this.credit = response.data;
      console.log(response.data);
    })

  },
  data() {
    return {
      data: {
        id: 3,
        sid: "y210101",
        sname: "黎明",
        gender: "男",
        birthday: "1999-01-01",
        grade: "1",
        major: "电子信息",
        type: "研究生",
        classes: null,
        classTeacher: null,
        tutor: "叶凡",
        researchDirection: "AI"
      },
      tableData: [{
        sid: "",
        sname: "",
        cid: "",
        cname: "",
        credit: null
      }],
      credit: 0,

      isShow: false

    }
  }
}
</script>

<style scoped>

</style>