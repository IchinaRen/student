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
              prop="cid"
              label="课程号"
          >

          </el-table-column>
          <el-table-column
              prop="cname"
              label="课程名称"
              width="180">

          </el-table-column>
          <el-table-column
              prop="cteacher"
              label="任课老师">

          </el-table-column>
          <el-table-column
              prop="cintroduction"
              label="课程简介">

          </el-table-column>
          <el-table-column
              prop="credit"
              label="学分">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
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
            <el-form :model="form" :rules="rules">
              <el-form-item label="课程号" :label-width="formLabelWidth" prop="cid">
                <el-input v-model="form.cid" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="课程名" :label-width="formLabelWidth" prop="cname">
                <el-input v-model="form.cname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="任课老师" :label-width="formLabelWidth">
                <el-input v-model="form.cteacher" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="课程简介" :label-width="formLabelWidth">
                <el-input v-model="form.cintroduction" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="学分" :label-width="formLabelWidth" prop="credit">
                <el-input-number v-model="form.credit" :min="1" :max="20" label="学分"></el-input-number>
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
    axios.get("/api/course/list").then(function (res) {
      _this.tableData = res.data;
    })
  },
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        cid: "",
        cname: "",
        cteacher: "",
        cintroduction: "",
        credit: 0,
      },
      SearchByName: {
        name: ''
      },
      formLabelWidth: '120px',
      visible: false,
      isUpdate: false,
      check: true,
      rules: {
        cid: [
          {required: true, message: '请输入课程号', trigger: 'blur'},
        ],
        cname: [
          {required: true, message: '请输入课程名', trigger: 'blur'},
        ],
        credit: [
          {required: true, message: '请输入课程学分', trigger: 'blur'},
        ],
      }

    }
  },
  methods: {
    //多选框
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
    //搜索
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 增加与更新
    edit(object) {
      this.isUpdate = true;
      this.form = object;
      this.dialogFormVisible = true;
    },
    save() {
      let _this = this;
      if (_this.form.cid === null || _this.form.cname === null) {
        _this.check = _this.isUpdate = false;
      }
      axios.get("/api/course/fingById" + _this.form.id).then(function (res) {
        _this.check = res.data;
      })
      if (this.isUpdate) {
        console.log(this.form)
        axios.put("/api/course/update", this.form).then(function (res) {
          if (res.data) {
            _this.$alert("已修改！", "更新数据", {
                  confirmButtonText: "确定",
                  callback: action => {
                    location.reload()
                  }
                }
            )
          } else {
            alert("false!")
          }
          _this.dialogFormVisible = false;

        })
      } else if (_this.check) {
        axios.put("/api/course/add", this.form).then(function (res) {
          if (res.data) {
            _this.$alert("已增加！", "增加数据", {
                  confirmButtonText: "确定",
                  callback: action => {
                    location.reload()
                  }
                }
            )
          } else {
            alert("false!")
          }
          _this.dialogFormVisible = false;
        })
      } else {
        alert("请输入正确信息！")
      }
    },
    //删除
    DeleteItem(object) {
      let _this = this;
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = "/api/studentTcousrse/deleteByCid/" + object.cid;
        axios.delete("/api/course/delete/" + object.cid).then(function (res) {
          axios.delete(url);
          if (res.data) {
            _this.$alert(object.cname + "已删除！", "删除数据", {
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
  }

}
</script>

<style scoped>

</style>