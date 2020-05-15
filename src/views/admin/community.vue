<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>社团管理</span>
        <el-button style="float: right;margin-left: 8px" size="mini" type="primary" round @click="handleCreate">
          添加
        </el-button>
      </div>
      <el-table :data="communities">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="社团名称" />
        <el-table-column prop="intro" label="社团介绍" />
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
        <el-form-item label="封面图片">
          <el-upload
            action="http://127.0.0.1:8080/api/oss"
            :limit="1"
            list-type="picture"
            :file-list="fileList"
            :on-success="handleUpload"
            :on-remove="handleRemove"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="社团名称">
          <el-input v-model="community.name" />
        </el-form-item>
        <el-form-item label="社团介绍">
          <el-input v-model="community.intro" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="createDialogVisible" title="添加信息" width="800px" :close-on-click-modal="false">
      <el-form>
        <el-form-item label="封面图片">
          <el-upload
            action="http://127.0.0.1:8080/api/oss"
            :limit="1"
            list-type="picture"
            :file-list="fileList"
            :on-success="handleUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="社团名称">
          <el-input v-model="community.name" />
        </el-form-item>
        <el-form-item label="社团介绍">
          <el-input v-model="community.intro" />
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
import { list, del, find, update, create } from '@/api/community'
import { delImg } from '@/api/file'

export default {
  data() {
    return {
      updateDialogVisible: false,
      createDialogVisible: false,
      community: { id: '', name: '', intro: '', imgName: '', imgUrl: '' },
      fileList: [],
      communities: []
    }
  },
  computed: {
  },
  created() {
    this.list()
  },
  methods: {
    handleUpload(response, file, fileList) {
      this.community.imgName = response.name
      this.community.imgUrl = response.url
    },
    handleRemove(file, fileList) {
      delImg(file.name).then(res => {
        if (res.status === 200) {
          this.community.imgName = ''
          this.community.imgUrl = ''
        }
      })
    },
    list() {
      list().then(res => {
        this.communities = res.data
      })
    },
    find(id) {
      find(id).then(res => {
        this.community = res.data
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
      this.fileList = []
      this.fileList.push({ name: item.imgName, url: item.imgUrl })
      this.updateDialogVisible = true
      this.find(item.id)
    },
    handleCreate() {
      this.createDialogVisible = true
      this.community = { id: '', name: '', intro: '', imgName: '', imgUrl: '' }
      this.fileList = []
    },
    submitUpdate() {
      this.update(this.community)
      this.updateDialogVisible = false
    },
    submitCreate() {
      this.createDialogVisible = false
      create(this.community).then(res => {
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
