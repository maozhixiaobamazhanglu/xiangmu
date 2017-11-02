<template>
  <div id="app" v-if="seller.data">
    <m-header :seller="seller.data"></m-header>
    <tab></tab>
    <router-view :seller="seller.data" :ratings="ratings.data"></router-view>
  </div>
</template>

<script>
import axios from "axios"
import  Tab from '@/components/layout/tab/tab'
import MHeader from "@/components/layout/header/header"

export default {
  name: 'app',
  data(){
    return {
      seller:{},
      goods:{},
      ratings:{}
    }
  },
  components:{
    MHeader,
    Tab
  },
  created(){
    this._getSeller();
  },
  methods:{
    _getSeller(){
      axios.get('api/seller').then((rel)=>{
        // console.log(rel);
        this.seller=rel.data;
      })
      axios.get('api/goods').then((res)=>{
        // console.log(res);
        this.goods=res.data;
      })
      axios.get('api/ratings').then((item)=>{
        // console.log(item);
        this.ratings=item.data;
      })
    }
  }
}
</script>

<style>

</style>
