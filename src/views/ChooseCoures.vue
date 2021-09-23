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
            <el-form :model="form">
              <el-form-item label="学号" :label-width="formLabelWidth">
                <el-select v-model="form.sid" filterable placeholder="请选择">
                  <el-option
                      v-for="item in students"
                      :key="item.sid"
                      :label="item.sid"
                      :value="item.sid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="课程号" :label-width="formLabelWidth">
                <el-select v-model="form.cid" filterable placeholder="请选择">
                  <el-option
                      v-for="item in course"
                      :key="item.cid"
                      :label="item.cid"
                      :value="item.cid">
                  </el-option>
                </el-select>
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
      _this.course = res.data;
    });
    axios.get("/api/student/list").then(function (res) {
      _this.students = res.data;
    });
    axios.get("/api/studentTcousrse/list").then(function (res) {
      console.log(res.data)
      _this.tableData = res.data;
    })
  },
  data() {
    return {
      tableData: [],
      type: "本科生",
      count: 0,

      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        sid: "",
        sname: "",
        cid: "",
        cname: "",
        cintroduction: "",
        credit: 1
      },
      SearchByName: {
        name: ''
      },
      formLabelWidth: '120px',
      students: [],
      course: [],
      visible: false,
      isUpdate: false,
      check: true

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
      this.form.cid = object.cid;
      this.form.sid = object.sid;
      this.dialogFormVisible = true;
    },
    save() {
      let _this = this;

      for (let i = 0; i < this.students.length; i++) {
        if (this.students[i].sid === this.form.sid) {
          this.form.sname = this.students[i].sname;
          this.type = this.students[i].type;
          break;
        }

      }
      for (let i = 0; i < this.course.length; i++) {
        if (this.course[i].cid === this.form.cid) {
          this.form.cname = this.course[i].cname;
          this.form.credit = this.course[i].credit;
          this.form.cintroduction = this.course[i].cintroduction;
          break;
        }
      }
      axios.get("/api/studentTcousrse/SumClasses/" + _this.form.cid).then(function (response) {
        _this.count = response.data;
        console.log("findByid")
      })
      // console.log(_this.form)
      axios.get("/api/studentTcousrse/findById/" + _this.form.sid).then(function (response) {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].cid === _this.form.cid) {
            _this.check = false;
            break;
          }
        }
        console.log(_this.check)
      })
      axios.get('/api/studentTcousrse/SumCredit/' + _this.form.sid).then(function (response) {
        if (_this.type === "研究生" && response.data + _this.form.credit > 30 || _this.type === "本科生" && response.data + _this.form.credit > 40) {
          _this.$alert("学分已超上限！！", "警告", {
                confirmButtonText: "确定",
              }
          );

        } else if (_this.count > 50) {
          _this.$alert("选课人数已超上限！！", "警告", {
                confirmButtonText: "确定",
              }
          );
        } else if (!_this.check) {
          _this.$alert("已选过该课程！！", "警告", {
                confirmButtonText: "确定",
              }
          );
          _this.check = true;
        } else {
          if (_this.isUpdate) {
            console.log(_this.form)
            axios.put("/api/studentTcousrse/update", _this.form).then(function (res) {
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
          } else {
            axios.put("/api/studentTcousrse/add", _this.form).then(function (res) {
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
          }
        }
      })


    },
    DeleteItem(object) {
      let _this = this;
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete("/api/studentTcousrse/delete/" + object.id).then(function (res) {
          if (res.data) {
            _this.$alert("已删除！", "删除数据", {
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