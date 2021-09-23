<template>


  <el-col>
    <el-container>
      <!--  主体-->
      <el-main>

        <el-table
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            height="400"
            stripe
            @selection-change="handleSelectionChange">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              prop="sid"
              label="学号"
          >
          </el-table-column>
          <el-table-column
              prop="sname"
              label="姓名"
          >
          </el-table-column>
          <el-table-column
              prop="gender"
              label="性别">
          </el-table-column>
          <el-table-column
              prop="birthday"
              label="生日"
              width="120px"
          >
          </el-table-column>
          <el-table-column
              prop="grade"
              label="年级">
          </el-table-column>
          <el-table-column
              prop="major"
              label="专业">
          </el-table-column>
          <el-table-column
              prop="type"
              label="类型">
          </el-table-column>
          <el-table-column
              prop="classes"
              label="班级">
          </el-table-column>
          <el-table-column
              prop="classTeacher"
              label="班主任">

          </el-table-column>
          <el-table-column label="操作" width="210px">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="$router.push({path:'/StudentIntroduce',query:{sid:scope.row.sid}})">查看
              </el-button>
              <el-button
                  size="mini"
                  @click="edit(scope.row)">编辑
              </el-button>
              <el-button size="mini" type="danger" @click="DeleteItem(scope.row)">删除</el-button>

            </template>
          </el-table-column>

        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="dialogFormVisible = true">增加</el-button>


          <el-button @click="toggleSelection()">取消选择</el-button>
          <el-dialog title="增加新生" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="学号" :label-width="formLabelWidth">
                <el-input v-model="form.sid" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.sname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="form.gender" placeholder="请选择性别">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生日" :label-width="formLabelWidth">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item label="年级" :label-width="formLabelWidth">
                <el-input v-model="form.grade" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="专业" :label-width="formLabelWidth">
                <el-input v-model="form.major" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="类型" :label-width="formLabelWidth">
                <el-select v-model="form.type" placeholder="请选择类型">
                  <el-option label="本科生" value="本科生"></el-option>
                  <el-option label="研究生" value="研究生"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="班级" :label-width="formLabelWidth">
                <el-input v-model="form.classes" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="班主任" :label-width="formLabelWidth">
                <el-input v-model="form.classTeacher" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="save">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-main>
      <!--  底栏-->
      <el-footer>

      </el-footer>

    </el-container>
  </el-col>


</template>

<script>


export default {
  created() {
    let _this = this;
    axios.get('/api/student/findAllGraduate').then(function (response) {
      _this.tableData = response.data
      console.log(response.data);

    })
  },
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        id: 0,
        sid: "",
        sname: "",
        gender: "",
        birthday: "",
        grade: "",
        major: "",
        type: "",
        classes: "",
        classTeacher: "",
        tutor: "",
        direction: "",
        iseditor: false
      },
      isUpdate: false,
      SearchBysname: {
        sname: ''
      },
      formLabelWidth: '120px',
      visible: false,
      check: true,
      multipleSelection: {}

    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    edit(object) {
      this.isUpdate = true;
      this.form = object;
      this.dialogFormVisible = true;
    },
    save() {
      let _this = this;
      if (_this.form.sid === "" || _this.form.sname === "") {
        _this.check = _this.isUpdate = false;
        alert("学号或姓名不为空！");
      }
      if (_this.form.type === "") {
        _this.check = _this.isUpdate = false;
        alert("类型不为空！");
      }

      axios.get("/api/student/findById/" + this.form.sid).then(function (res) {
        if (res.data.name !== null) {
          _this.check = false;
          console.log("已存在")
        } else {
          console.log("未存在")
        }
      })
      if (_this.isUpdate) {
        axios.put("/api/student/update", _this.form).then(function (res) {
          if (res.data) {
            _this.$alert("已修改！", "更新数据", {
                  confirmButtonText: "确定",
                  callback: action => {
                    location.reload()
                  }
                }
            )
          } else {
            alert("更新失败")
          }
          _this.dialogFormVisible = false;
          _this.isUpdate = false;

        })
      } else if (_this.check) {
        axios.put("/api/student/add", _this.form).then(function (res) {
          if (res.data) {
            _this.$alert("已增加！", "增加数据", {
                  confirmButtonText: "确定",
                  callback: action => {
                    location.reload()
                  }
                }
            )
          } else {
            alert("已存在该人员！！")
          }
          _this.dialogFormVisible = false;
          _this.check = true;
        })
      }
    },
    DeleteItem(object) {
      let _this = this;
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        axios.delete("/api/student/delete/" + object.sid).then(function (res) {
          axios.delete("/api/studentTcousrse/deleteBySid/" + object.sid).then(function (res) {

          })

          if (res.data) {
            _this.$alert(object.sname + "已删除！", "删除数据", {
                  confirmButtonText: "确定",
                  callback: action => {
                    location.reload()
                  }
                }
            )

          } else {
            alert("删除失败！")
          }

        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    datetimeChange(e) {
      console.log(e)
      let _this = this

      _this.tableData[0].birthday = e
      _this.$forceUpdate();
    },

  }


}
</script>

<style scoped>

</style>