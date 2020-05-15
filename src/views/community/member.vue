<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>成员管理</span>
      </div>
      <el-table :data="students">
        <el-table-column prop="studentId" label="学号" />
        <el-table-column prop="studentName" label="姓名" />
        <el-table-column prop="sex" label="性别" :formatter="sexToResult" />
        <el-table-column prop="speciality" label="专业" />
        <el-table-column prop="collage" label="学院" />
        <el-table-column prop="communityName" label="社团名称" />
        <el-table-column prop="state" label="状态" :formatter="stateToResult" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button round size="mini" type="warning" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="updateDialogVisible" title="修改信息" width="800px">
      <el-form>
        <el-form-item label="学生姓名">
          <el-input v-model="student.studentName" />
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="student.speciality" />
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="student.collage" />
        </el-form-item>
        <el-form-item label="接收成员">
          <el-switch v-model="student.state" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import { list, update } from '@/api/join'
import { current } from '@/api/community'

export default {
  data() {
    return {
      updateDialogVisible: false,
      createDialogVisible: false,
      student: {},
      fileList: [],
      students: []
    }
  },
  created() {
    this.list()
  },
  methods: {
    sexToResult(row, column, cellValue) {
      if (cellValue) {
        return '男'
      } else {
        return '女'
      }
    },
    stateToResult(row, column, cellValue) {
      if (cellValue) {
        return '正式成员'
      } else {
        return '已申请'
      }
    },
    list() {
      current().then(res => {
        list(res.data.id).then(res => {
          this.students = res.data
        })
      })
    },
    update(data) {
      update(data).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.list()
      })
    },
    handleEdit(item) {
      this.student = item
      this.updateDialogVisible = true
    },
    submitUpdate() {
      this.update(this.student)
      this.updateDialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
