<template>
  <div>
    <a v-for="(item, index) in paths" :key="index" :href="item.url" target="_brank">
      <div class="item">
        <el-card shadow="hover">
          <div class="card-head" :title="item.url">
            <span class="card-icon">
              <img :src="item.img">
            </span>
            <span class="card-title">
              {{ item.name }}
            </span>
          </div>
          <div class="card-body" :title="item.desc">
            {{ item.desc }}
          </div>
        </el-card>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    paths: {
      type: Array,
      default() { return [] },
    },
  },
}
</script>

<style scoped>
.item {
  float: left;
  margin: 5px 10px 15px 0;
}
.item .card-head {
  overflow: hidden;
  margin-bottom: 7px;
  display: block;
  cursor: pointer;
  padding: 2px 2px 0;
  color: #333;
}
.item .card-head .card-icon {
  width: 32px;
  height: 32px;
  border-radius: 32px;
  float: left;
  display: block;
}

.card-head .card-icon img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.card-head .card-title {
  display: block;
  padding-left: 40px;
  margin-top: 6px;
  font-weight: 700;
  font-size: 14px;
  color: inherit;
}
.card-body {
  color: #666666;
  font-size: 12px;
  height: 36px;
  line-height:normal;
  word-spacing:normal;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  margin: 6px 0;
  padding: 0 1px;
}

@media (max-width: 767px) {
  .item {
    width: 100%;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .item {
    width: calc(32% - 1px);
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .item {
    width: calc(23% + 7px);
  }
}
@media (min-width: 1200px) {
  .item {
    width: calc(19% - 1px);
  }
}
</style>

<style>
.el-card__body {
  padding: 10px;
}
</style>
