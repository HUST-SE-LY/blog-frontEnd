<template>
  <div class="single_blog_container">
    <div class="left">
      <p class="title">博客title</p>
      <p class="content">测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容</p>
      <div class="bottom">
        <div class="date">2023-1-1</div>
        <div class="tag_box">
          <singleTag>123</singleTag>
          <singleTag>123</singleTag>
          <singleTag>123</singleTag>
        </div>
      </div>
    </div>
    <div class="right">
      <img src="../assets/homeBack.jpg" alt="" class="home_pic">
    </div>

  </div>
</template>

<script setup>
import singleTag from './singleTag.vue';
</script>

<style scoped>
.single_blog_container {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}


.title {
  font-size: 20px;
  margin-bottom: 10px;
}

.content {
  width: 400px;
  color: gray;
  font-size: 14px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  margin-bottom: 10px;
}

.home_pic {
  height: 100px;
  width: 175px;
  object-fit: cover;
  border-radius: 10px;
}

.right {
  margin-left: auto;
}

.bottom {
  display: flex;
  align-items: center;
  gap: 50px;
  padding-bottom: 10px;
}

.tag_box {
  display: flex;
  gap: 10px;
  width: 200px;
  overflow-x: scroll;
}

.tag_box::-webkit-scrollbar {
  display: none;
}

.date {
  color: lightgray;
  font-size: 14px;
}
</style>