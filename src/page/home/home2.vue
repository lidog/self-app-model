<template>
  <div class="page">
    <topBar title="app中心" @cancel="goBack"></topBar>
    <div class="mobile-content" id="content">
      <div class="item-box clearfix">
        <fast-click v-for="item in pageConfig" class="item"
                    :key="item.name" @click.native="toRouter(item.name)">
            <img-icon :src="(item.icon||item.name)+`.png`"></img-icon>
            <div>{{item.text}}</div>
        </fast-click>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        pageConfig:[ //配置页面
          {name:"example",text:"例子"},
        ]
      }
    },
    methods: {
      goBack() {
        //退出webview
        RNWebView.closeWebView();
      },
      toRouter(str) {
        this.$router.replace(str+`/B/in`)
      },
    }
  }
</script>
<style lang="scss" scoped>
  .mobile-content {
    background-color: #fff;
  }

  .item-box {
    width: 100%;
    height: 100%;
    .item {
      width: 33.333%;
      float: left;
      padding: 0.5rem 0;
      text-align: center;
      div {
        height: 0.76rem;
        font-size: 16px;
        line-height: 0.76rem;
        color: #45464c;
        font-weight: bolder;
      }
    }
    button {
      display: block;
    }
  }
</style>
