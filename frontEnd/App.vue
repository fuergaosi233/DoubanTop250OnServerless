<template>
  <div id="app">
      <h2>{{title}}</h2>     
      <div class="card" v-for="(item, index) in moviesList" :key='index'>
          <a :href="item.href"><h5 >No.{{index+1}} {{ item.title }}</h5></a>
          <li>评分：{{ item.star }}</li>
          <q>{{ item.intro }}</q>
      <HR/>
      </div>
  </div>
</template>

<script>
import baseUrl from "./config"
export default {
  data() {
    return {
      moviesList : [],
      title:'加载中'
    }
  },
  async mounted(){
    let res = await this.axios.get(baseUrl)
    this.moviesList = res.data
    this.title = '豆瓣 Top 250 🏆排名'
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a:link {color:#000000;}      /* 未访问链接*/
a:visited {color:#000000;}  /* 已访问链接 */
a:hover {color:#000000;}  /* 鼠标移动到链接上 */
a:active {color:#000000;}  /* 鼠标点击时 */
</style>
