<!--封装时间组件-->
<template>
  <div class="timer">
    <div class="item-content">
      <div class="item-content-div" v-show="confirmTimeStart" @click="open">
        <v-icon class="item-content-icon" v-if="delTime" v-show="confirmTimeStart" name="x-circle"
                @click.native.stop="confirmTimeStart = false"></v-icon>
        {{timeStartFmt}}
      </div>
      <div class="item-content-div" v-show="!confirmTimeStart" @click="open"></div>
      <v-icon class="item-content-icon" name="calendar" @click.native="open"></v-icon>
    </div>
    <mt-datetime-picker
      ref="timePicker"
      :type="dateType"
      @cancel=" timeStart = oldTimeStart;close();"
      @visible-change="oldTimeStart = timeStart;$emit(`timeChange`)"
      @confirm="confirmTime"
      :closeOnClickModal="false"
      v-model="timeStart">
    </mt-datetime-picker>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        timeStart: new Date(),
        confirmTimeStart: false,
      }
    },
    model: {
      prop: 'time',
      events: 'change',
    },
    props: {
      dateType: { //时间控件类型  'datetime', 'date', 'time'
        type: String,
        default: "date",
      },
      initDate: {//是否默初始化并认选中今天
        type: Boolean,
        default: false,
      },
      time: {
        type: String,
        default: ''
      },
      delTime: { //是否显示清空时间按钮
        type: Boolean,
        default: true,
      }
    },
    watch: {
      //确认选择时间和取消
      confirmTimeStart(val) {
        if (val) {
          this.$emit("confirm", this.timeStartFmt);
        } else {
          this.$emit("confirm", "");
        }
      }
    },
    computed: {
      //格式化时间
      timeStartFmt() {
        let fmt = this.dateType == "date" ? "yyyy-MM-dd" : null;
        return this.tools.dateFmt(this.timeStart, fmt);
      },
    },
    mounted() {
      if (this.initDate) {
        this.confirmTime();
      }
    },
    methods: {
      //改变时间时；
      confirmTime() {
        this.confirmTimeStart = true;
        this.$emit("confirm", this.timeStartFmt);
        this.close();
      },
      /**
       * 作者：lzh
       * 功能：设置时间,供父组件调用的方法，配合ref调用；
       * 参数：val  DateObj
       * 返回值：
       */
      setTime(val) {
        if(!val){
          return;
        }
        this.timeStart = val;
        this.confirmTimeStart = val !== "" ? true : false;
      },
      open() {
        var bottom = document.getElementsByClassName("mobile-bottom");
        this.$refs[`timePicker`].open();
        for (var i = 0; i < bottom.length; i++) {
          bottom[i].style.display = "none";
        }
      },
      close() {
        var bottom = document.getElementsByClassName("mobile-bottom");
        for (var i = 0; i < bottom.length; i++) {
          bottom[i].style.display = "flex";
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  .timer {
    .item-content {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item-content-div {
        flex: 10;
        border: 1px solid #eaeaea;
        padding: 5px 25px 5px 5px;
        box-sizing: border-box;
        height: 100%;
        position: relative;
        .item-content-icon {
          position: absolute;
          right: 5px;
          color: #d8d8d8;
        }
      }
      .icon {
        margin-left: 10px;
        width: 17px;
        height: 17px;
      }
    }
  }
</style>
