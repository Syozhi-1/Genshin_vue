<template>
  <div id="app">
      <router-link to="/limit">限定池</router-link>
      <router-link to="/weapon">武器池</router-link>
      <router-link to="/normal">常驻池</router-link><br>
      
      <div id="detail">
        抽奖次数：{{ count }} &nbsp; 原石花费：{{ count * 160 }} &nbsp;
        折算RMB：{{ count * 16 }} 元<br />
        出货率：
        <span
          ><div>3★ -> {{ (s3_count / count) * 100 }}%</div>
          <div>4★ -> {{ (s4_count / count) * 100 }}%</div>
          <div>5★ -> {{ (s5_count / count) * 100 }}%</div></span
        >
        保底次数：4★ -> {{ s4_baodi }} 次 &nbsp; 5★ -> {{ s5_baodi }} 次<br />
        距离大保底还有：{{ da_baodi }} 发<br />
        <span>5★(0.6%)：{{ s5_count }} 个</span><br />
        <span>4★(5.1%)：{{ s4_count }} 个 </span><br />
        <span>3★(94.3%)：{{ s3_count }} 个 </span><br />
      </div>
    <router-view @sonData="getSonData" ></router-view>
  </div>
</template>

<script>

export default {
  name: "app",
  data() {
    return {
      count: 0, // 总抽奖次数
      s5_count: 0, // 抽出的5星次数
      s4_count: 0, // 抽出的4星次数
      s3_count: 0, // 抽出的3星次数
      s4_baodi: 0, // 4星保底计数器
      s5_baodi: 0, // 5星保底计数器
      da_baodi: 90 // 大保底剩余次数
    };
  },
  methods: {
     getSonData(res){
      //  console.log(res)
      this.count = res.count;
      this.s5_count = res.s5_count;
      this.s4_count = res.s4_count;
      this.s3_count = res.s3_count;
      this.s4_baodi = res.s4_baodi;
      this.s5_baodi = res.s5_baodi;
      this.da_baodi = res.da_baodi;
     },
  },
};
</script>

<style>
#app {
  text-align: center;
}

#log_t {
  margin: auto;
}

.zhi {
  background-color: rgba(160, 32, 240, 0.2);
}

.jin {
  background-color: rgba(255, 215, 0, 0.2);
  font-weight: 700;
}

#r4_log {
  /*display: inline-block;*/
  width: 200px;
}

#log {
  /*display: inline-block;*/
  width: 600px;
}

#r5_log {
  /*display: inline-block;*/
  width: 200px;
}

#container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
