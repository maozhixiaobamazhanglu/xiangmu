<template>
  <div class="header">
  <!-- 左侧图片 -->
  	<div class="goods_pic">
  		<div class="pic">
  			<img :src="seller.avatar" alt="">
  		</div>
  	</div>
  	<!-- 右侧描述 -->
  	<div class="content">
  		<div class="title">
  			<span class="name">{{seller.name}}</span>
  		</div>
  		<div class="descr">
  			<span class="text">{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
  		</div>
  		<div class="supports" v-if="seller.supports">
  			<span class="text">{{seller.supports[0].description}}</span>
  		</div>
  	</div>
    <div class="tang" @click="bian()">
      <span>{{seller.supports.length+'个'}}</span>
      <i class="icon-right"></i>
    </div>
  	<!-- 公告 -->
  	<div class="button-bar">
  		<div class="pic"></div>
  		<div class="text">{{seller.bulletin}}</div>
  		<div class="icon">
  			<i class="icon-right"></i>
  		</div>
  	</div>
  	<!-- 背景 -->
  	<div class="bg">
  		<img :src="seller.avatar" width="100%" height="100%" alt="">
  	</div>
    <div class="quan" v-show="bol">
      <div class="y-top">
        <h2>{{seller.name}}</h2>
        <star class="xing" :size="48" :score="seller.score"></star>
        <div class="you">
          <span>———————  优惠信息  ———————</span>
          <ul>
            <li class="bianli" v-for="item in seller.supports">
              <div class="img3" :class="iconClassMap[item.type]"></div>
              <div class="cont">{{item.description}}</div>
            </li>
          </ul>
        </div>
        <div class="you">
          <span>———————  商家公告  ———————</span>
          <div class="jie">{{seller.bulletin}}</div>
        </div>
      </div>
      <div class="y-bottom">
        <i class="icon-close" @click="guan()"></i>
      </div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star'
export default {
  props:{
    seller:{
      type:Object,
    }
  },
  components: {
    star: star,
  },
  created() {
    this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  data(){
    return {
      bol:false
    }
  },
  methods:{
    bian(){
      this.bol=true;
      // console.log(this.bol);
    },
    guan(){
      this.bol=false;
      // console.log(this.bol);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~common/style/mixin.scss";
@import "~@/components/layout/header/header.scss";
.img3{
  height:pxrem(32);
  width:pxrem(32);
  margin-right:pxrem(14);
  margin-left:pxrem(26);
  // @include img-dpr(img/decrease_2);
  background-repeat:no-repeat;
  background-position:center left;
  background-size:pxrem(32) pxrem(32);
  line-height:pxrem(32);

  &.decrease{
    @include img-dpr('img/decrease_2')
  }
  &.discount{
    @include img-dpr('img/discount_2')
  }
  &.guarantee{
    @include img-dpr('img/guarantee_2')
  }
  &.invoice{
    @include img-dpr('img/invoice_2')
  }
  &.special{
    @include img-dpr('img/special_2')
  }
}
</style>
