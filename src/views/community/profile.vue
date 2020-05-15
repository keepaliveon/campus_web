<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>社团资料</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleUpdate">保存修改</el-button>
      </div>
      <div class="text item">宣传页轮播图</div>
      <el-upload
        :action="'http://127.0.0.1:8080/api/oss/community/'+community.id"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="images"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <div class="text item" style="margin-top: 15px">社团介绍</div>
      <el-input v-model="community.intro" type="textarea" />
    </el-card>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { current, imgList, update } from '@/api/community'
import { delCommunityImg } from '@/api/file'

export default {
  data() {
    return {
      images: [],
      dialogImageUrl: '',
      dialogVisible: false,
      community: { id: '', intro: '' }
    }
  },
  created() {
    current().then(res => {
      this.community = res.data
      imgList(res.data.id).then(res => {
        this.images = res.data
      })
    })
  },
  methods: {
    handleUpdate() {
      update(this.community).then(res => {
        this.$notify({
          title: res.data,
          type: 'success',
          duration: 2500
        })
      })
    },
    handleRemove(file, fileList) {
      delCommunityImg(this.community.id, file.name)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
    }
</style>
