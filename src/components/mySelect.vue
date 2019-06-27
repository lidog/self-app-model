<!--移动端select组件-->
<template>
  <div>
    <div class="selected" @click="show">
      <span class="dian2" style="margin-right: 10px;">{{name}}</span>
      <v-icon name="chevron-down"></v-icon>
    </div>
    <mt-popup class="selected-box" v-model="popupVisible" position="bottom" style="width: 100%;" :closeOnClickModal="false">
      <div class="picker-toolbar flex-ar">
        <span @click="cancel">取消</span>
        <span @click="selected">确定</span>
      </div>
      <mt-picker v-show="popupVisible" v-if="refresh"
                 :slots="slots"
                 @change="onValuesChange"
                 :value-key="keyName"
                 ref="picker"
                 :visibleItemCount="visibleItemCount">
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        popupVisible: false,
        name:'',
        value:'',
        oldName:'',
        oldValue:'',
        oldIndex:0,
        defaultItem:null,
        slots: [{
          values:[],
          defaultIndex: 0,
        }],
        refresh:true,
      }
    },
    model:{
      prop:'selectValue',
      event:'change'
    },
    props: {
      selectValue:{
        type:[Number,String]
      },
      dataArr: {
        type: Array,
        default: function () {
          return []
        }
      },
      keyName:{ //显示名
        type:String,
        default:'name'
      },
      keyValue:{
        type:String,
        default:'value'
      },
      visibleItemCount:{
        type:Number,
        default:5
      },
      defaultIndex:{//默认选中项
        type:Number,
        default:0
      }
    },
    watch:{
      popupVisible(val){
        var bottom = document.getElementsByClassName("mobile-bottom");
        if(val){
            for(var i=0;i<bottom.length;i++){
              bottom[i].style.display = "none";
            }
        } else {
            for(var i=0;i<bottom.length;i++){
              bottom[i].style.display = "flex";
            }
        }
      },
    },
    created() {
      this.slots[0].values = this.dataArr;
      this.slots[0].defaultIndex = this.defaultIndex;
      this.defaultItem = {
        name:this.slots[0].values[this.defaultIndex][this.keyName],
        value:this.slots[0].values[this.defaultIndex][this.keyValue],
      };
    },
    mounted(){
      //主动选中默认值，并同步到父组件；但是不触发父级select 事件
      this.$nextTick(()=>{
        let theIndex = this.defaultIndex;
        this.name = this.slots[0].values[theIndex][this.keyName];
        this.value = this.slots[0].values[theIndex][this.keyValue];
        this.setPicker(theIndex);
        this.oldName = this.name;
        this.oldValue = this.value;
        this.oldIndex = this.slots[0].values.findIndex(item=>{
          return item[this.keyValue] == this.value
        })
        this.$emit('change',this.value);//把value传到父
      })
    },
    methods: {
      show(){
        this.oldName = this.name;
        this.oldValue = this.value;
        this.noScrollAfter.open(this,`popupVisible`)
      },
      cancel(){
        this.name =  this.oldName;
        this.value = this.oldValue;
        this.noScrollAfter.close(this,`popupVisible`)
        this.setPicker(this.oldIndex);
      },
      selected(){
        this.noScrollAfter.close(this,`popupVisible`)
        this.oldName = this.name;
        this.oldValue = this.value;
        this.oldIndex = this.slots[0].values.findIndex(item=>{
          return item[this.keyValue] == this.value
        })
        this.$emit('change',this.value);//把value传到父
        this.$emit('select',{name:this.name,value:this.value})
      },
      onValuesChange(picker, values) {
        this.name = values[0][this.keyName];
        this.value = values[0][this.keyValue];
      },
      set(index){  //设置选中值index
        let theIndex = index || this.defaultIndex;
        this.name = this.slots[0].values[theIndex][this.keyName];
        this.value = this.slots[0].values[theIndex][this.keyValue];
        this.setPicker(theIndex);
        this.selected();//同步父组件数据；
      },
      /*设置picker*/
      setPicker(index=0){
          this.refresh = false;
          setTimeout(()=>{
            this.refresh = true;
          },0)
          this.slots[0].defaultIndex = index;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .selected{
    padding: 0.1rem;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .selected-box{
    user-select: none;
    z-index: 3000!important;
    position:fixed;
    right: 0;
    bottom: 0;
  }
  .picker-toolbar{
    height: 40px;
    border-bottom: solid 1px #eaeaea;
    color: #26a2ff;
  }
</style>
