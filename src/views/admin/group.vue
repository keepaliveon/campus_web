<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>板块管理</span>
        <el-button style="float: right;margin-left: 8px" size="mini" type="primary" round @click="handleCreate">添加</el-button>
      </div>
      <el-table :data="groups">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="color" label="主题颜色" />
        <el-table-column prop="icon" label="图标" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button round size="mini" type="warning" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button round size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="updateDialogVisible" title="修改信息" width="800px">
      <el-form>
        <el-form-item label="标题">
          <el-input v-model="group.title" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="group.name" />
        </el-form-item>
        <el-form-item label="主题颜色">
          <el-input v-model="group.color" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="group.icon" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="createDialogVisible" title="添加信息" width="800px" :close-on-click-modal="false">
      <el-form>
        <el-form-item label="标题">
          <el-input v-model="group.title" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="group.name" />
        </el-form-item>
        <el-form-item label="主题颜色">
          <el-input v-model="group.color" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="group.icon" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCreate">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import { list, del, find, update, create } from '@/api/group'
export default {
  data() {
    return {
      updateDialogVisible: false,
      createDialogVisible: false,
      group: { id: '', title: '', name: '', color: '', icon: '' },
      groups: []
    }
  },
  created() {
    this.list()
  },
  methods: {
    list() {
      list().then(res => {
        this.groups = res.data
      })
    },
    find(id) {
      find(id).then(res => {
        this.group = res.data
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
    handleDelete(item) {
      del(item.id).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.list()
      })
    },
    handleEdit(item) {
      this.updateDialogVisible = true
      this.find(item.id)
    },
    handleCreate() {
      this.createDialogVisible = true
      this.group = { id: '', title: '', name: '', color: '', icon: '' }
    },
    submitUpdate() {
      this.update(this.group)
      this.updateDialogVisible = false
    },
    submitCreate() {
      this.createDialogVisible = false
      create(this.group).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
        this.list()
      })
    }
  }
}
</script>

<style scoped>

</style>
