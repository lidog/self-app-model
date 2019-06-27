<template>
    <div class="page">
      <topBar title="组件例子"></topBar>
      <div class="mobile-content" id="forFixInputBug">
        <div class="form-line"></div>
        <form-card-item itemTitle="选择器组件：" required>
          <my-select v-if="leaveTypeData.length>0"
                     :dataArr="leaveTypeData"
                     v-model="leaveType"
                     @select="select"
                     ref="mySelect">
          </my-select>
        </form-card-item>
        <div class="form-line"></div>
        <form-card-item itemTitle="时间组件：" required>
          <timer @confirm="(val)=>{timeM = val}" dateType="date" ref="timeM"/>
        </form-card-item>
        <form-card-item itemTitle="带时分秒：" required>
          <timer @confirm="(val)=>{timeM2 = val}" dateType="datetime" ref="timeM2"/>
        </form-card-item>
        <div class="form-line"></div>
        <form-card-item-top title="标题在上，内容flex-between" required>
          <input type="text">
        </form-card-item-top>
        <div class="form-line"></div>
        <form-card-item-top title="内容自适应高,并且带修复input bug：" class="diy-content no-flex" required>
          <textarea style="height: 100px;" fixBug="true"></textarea>
        </form-card-item-top>
        <div class="form-line"></div>
        <mt-button size="large" type="primary" @click.native="$refs[`nextBox`].open()">大按钮(打开副页)</mt-button>
      </div>
      <mobileBottom class="no-height">
        <mt-button type="default" @click.native="save(true)" size="large">保存</mt-button>
        <mt-button v-if="leaveType==`请选择`" size="large" class="no-touch">下一步</mt-button>
        <mt-button v-else type="primary" @click.native="nextStep" size="large" >下一步</mt-button>
      </mobileBottom>

      <!--下一步-->
      <popup ref="nextBox" position="right" :radius="false">
        <topBar :popup="true" :title="`演示loadmore组件`" @cancel="$refs[`nextBox`].close()"></topBar>
        <div class="mobile-content bg0" style="overflow-y: auto;padding-left: 0.2rem;padding-right: 0.2rem;">
          <myLoadMore :url="ajaxApi.douBan.hot"
                      :param="param"
                      top="80px"
                      bottom="80px"
                      :proxyFn="proxyFn"
                      :paramFn="paramFn"
                      :itemProcess="itemProcess">
            <li slot-scope="{item}" class="row-box" :key="item.id">
              <div class="pd20 mb20">
                <div>{{item.title}}</div>
                <img :src="getImages(item.images.small)">
              </div>
            </li>
          </myLoadMore>
        </div>
        <mobileBottom class="no-height">
          <mt-button type="default" size="large" @click.native="$refs[`nextBox`].close()">返回</mt-button>
        </mobileBottom>
      </popup>
    </div>
</template>
<script>
    export default {
      data: function () {
            return {
              leaveType:"选择",
              leaveTypeData:[
                {name:"请选择",value:"请选择"},
                {name:"广东",value:1},
                {name:"北京",value:2},
              ],
              timeM:"",
              timeM2:"",
              isActive: [ '否', '是'],
              active:"是",
              text:"带建议的input",
              param:{},
            }
        },
      mounted() {
        this.tools.fixInputBug("forFixInputBug");
      },
      methods:{
        save(){
          this.confirm("保存成功！").then(()=>{
            this.confirm("可配置取消按钮",true).catch(()=>{
              this.confirm("你点击了取消")
            })
          })
        },
        nextStep(){
          this.ToastTip("你点了下一步",'suc')
        },
        select(obj){
          this.ToastTip("你选择了 "+ obj.name)
        },
        paramFn(query){ //参数代理
          return {
            start:query.page,
            count:query.size,
          }
        },
        proxyFn(res){ //原始数据处理代理
          return {
            content:res.subjects,
            total:res.total,
          }
        },
        itemProcess(rows){ //每条数据处理
          return rows
        },
        getImages( _url ){
          if( _url !== undefined ){
            let _u = _url.substring( 7 );
            return 'https://images.weserv.nl/?url=' + _u;
          }
        }
      }
    }
</script>
<style lang="scss" scoped>
  .title{
    text-align: left;
    font-size: 20px;
    padding-left: 10px;
  }
</style>
