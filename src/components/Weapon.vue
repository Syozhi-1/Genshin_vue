<template>
  <div class="weapon">
    <input type="button" name="single" @click="single" value="单抽" />
    <input type="button" name="ten" @click="ten" value="十连" />
    <input type="button" name="clear" @click="clearAll" value="重置" />
    <div>日志：</div>
    <div id="container">
      <div id="r4_log">
        <table
          width="200px"
          class="zhi"
          border="1"
          cellspacing="0"
          cellpadding="0"
          style="text-align: center"
        >
          <tr>
            <th colspan="3">4★汇总</th>
          </tr>
          <tr id="r4_d">
            <th>次数</th>
            <th>星级</th>
            <th>名字</th>
          </tr>
        </table>
      </div>
      <div id="log">
        <table
          width="600px"
          border="1"
          cellpadding="0"
          cellspacing="0"
          style="text-align: center"
          id="log_t"
        >
          <tr>
            <th>本池UP↑</th>
            <th colspan="4">{{ currUp }}</th>
          </tr>
          <tr id="sum">
            <th>次数</th>
            <th>星级</th>
            <th>名字</th>
            <th>是否up</th>
            <th>本次随机数</th>
          </tr>
        </table>
      </div>
      <div id="r5_log">
        <table
          width="200px"
          class="jin"
          border="1"
          cellspacing="0"
          cellpadding="0"
          style="text-align: center"
        >
          <tr>
            <th colspan="3">5★汇总</th>
          </tr>
          <tr id="r5_d">
            <th>次数</th>
            <th>星级</th>
            <th>名字</th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "weapon",
  data() {
    return {
      count: 0, // 总抽奖次数
      s5_count: 0, // 抽出的5星次数
      s4_count: 0, // 抽出的4星次数
      s3_count: 0, // 抽出的3星次数
      s4_baodi: 0, // 4星保底计数器
      s5_baodi: 0, // 5星保底计数器
      da_baodi: 90, // 大保底剩余次数
      kachi: {}, //卡池
      currUp: "", //当前卡池UP
    };
  },
  // 获取json数据
  created() {
    this.$http.get("static/weapon.json").then((res) => {
      // console.log(res.data);
      this.kachi = res.data;
      if (this.kachi.hasOwnProperty("up")) {
        var r4 = this.kachi.up["r4"]["0"].toString();
        var r5 = this.kachi.up["r5"]["0"].toString();
        this.currUp = "5★：" + r5 + "  4★：" + r4;
      }
    });
  },
  methods: {
    // 重置
    clearAll() {
      this.count = 0;           // 总抽奖次数
      this.s5_count = 0;        // 抽出的5星次数
      this.s4_count = 0;        // 抽出的4星次数
      this.s3_count = 0;        // 抽出的3星次数
      this.s4_baodi = 0;        // 4星保底计数器
      this.s5_baodi = 0;        // 5星保底计数器
      this.da_baodi = 90;       // 大保底剩余次数
      $("#sum ~ tr").remove();  // 清空日志
      $("#r4_d ~ tr").remove(); // 清空4星列表
      $("#r5_d ~ tr").remove(); // 清空5星列表
      this.dataToParent();      // 传值给父路由
    },
    single: function () {
      var c = Math.random();
      var p = 3;
      if (c <= 0.006) {
        p = 5;
      } else if (c > 0.006 && c <= 0.051) {
        p = 4;
      } else {
        p = 3;
      }

      if (this.count > 0 && this.da_baodi == 1) {
        // 90发大保底判定
        p = 5;
        this.s5_baodi++;
      } else if (this.count > 0 && (this.count + 1) % 10 == 0) {
        // 10发保底判定
        p = 4;
        this.s4_baodi++;
      }

      var up = "否";

      switch (p) {
        // 3星
        case 3:
          this.da_baodi--;
          var chi = this.kachi.r3["0"];
          up = "否";
          var len = chi.length - 1;
          var huo = this.kachi.r3["0"][Math.round(Math.random() * len)];

          $("#sum").after(
            "<tr><td>" +
              (this.count + 1) +
              "</td><td>3★</td><td>" +
              huo +
              "</td><td>" +
              up +
              "</td><td>" +
              c +
              "</td></tr>"
          );
          this.s3_count++;
          this.count++;
          break;
        // 4星
        case 4:
          this.da_baodi--;
          // 根据w的值判断抽到的4星是武器还是角色， 0为武器，1为角色
          var w = Math.round(Math.random());
          var chi = this.kachi.r4[w];
          var len = chi.length - 1;
          var huo = this.kachi.r4[w][Math.round(Math.random() * len)];
          up = "否";

          // 判断是否抽中up武器
          if ((Math.round(Math.random() * 10) % 2 == 0 ) && this.kachi.hasOwnProperty("up")) {
            // up
            chi = this.kachi.up["r4"]["0"]; // 抽奖改为只抽up
            len = chi.length - 1;
            huo = chi[Math.round(Math.random() * len)];
            up = "是";
          }

          $("#sum").after(
            "<tr class='zhi'><td>" +
              (this.count + 1) +
              "</td><td>4★</td><td>" +
              huo +
              "</td><td>" +
              up +
              "</td><td>" +
              c +
              "</td></tr>"
          );
          $("#r4_d").after(
            "<tr><td>" +
              (this.count + 1) +
              "</td><td>4★</td><td>" +
              huo +
              "</td>"
          );
          this.s4_count++;
          this.count++;

          break;
        // 5星
        default:
          this.da_baodi = 90; //重置大保底
          var chi = this.kachi.r5["0"];
          var len = chi.length - 1;
          var huo = this.kachi.r5["0"][Math.round(Math.random() * len)];
          up = "否";

          // 判断是否抽中up武器
          if ((Math.round(Math.random() * 10) % 2 == 0 ) && this.kachi.hasOwnProperty("up")) {
            // up
            chi = this.kachi.up["r5"]["0"]; // 抽奖改为只抽up
            len = chi.length - 1;
            if (len == 0) {
              huo = chi[len];
            } else {
              huo = chi[Math.round(Math.random() * len)];
            }
            up = "是";
          }

          $("#sum").after(
            "<tr class='jin'><td>" +
              (this.count + 1) +
              "</td><td>5★</td><td>" +
              huo +
              "</td><td>" +
              up +
              "</td><td>" +
              c +
              "</td></tr>"
          );
          $("#r5_d").after(
            "<tr><td>" +
              (this.count + 1) +
              "</td><td>5★</td><td>" +
              huo +
              "</td>"
          );
          this.s5_count++;
          this.count++;
          break;
      }
      this.dataToParent();
    },
    ten: function () {
      for (var i = 0; i < 10; i++) {
        this.single();
      }
    },
    // 传值给父路由
    dataToParent() {
      var data = {
        count: this.count, // 总抽奖次数
        s5_count: this.s5_count, // 抽出的5星次数
        s4_count: this.s4_count, // 抽出的4星次数
        s3_count: this.s3_count, // 抽出的3星次数
        s4_baodi: this.s4_baodi, // 4星保底计数器
        s5_baodi: this.s5_baodi, // 5星保底计数器
        da_baodi: this.da_baodi, // 大保底剩余次数
      };
      this.$emit("sonData", data);
    },
  },
};
</script>
