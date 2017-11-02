<template>
  <div class="hello" ref="getscroll">
	  <div>
	    <div class="view-con">
			<div class="view-col1">
				<p class="view-all">{{seller.score}}</p>
				<p class="view-title">综合评分</p>
				<p class="view-small">高于周边商家{{seller.rankRate}}%</p>
			</div>
		    <div class="view-col2">
				<div class="view-line">
					<span>服务态度</span>
					<star class="wrapper" :size="36" :score="seller.serviceScore"></star>
					<span class="view-lineScore">{{seller.serviceScore}}</span>
				</div>
		    	<div class="view-line line1">
		    		<span>菜品评价</span>
					<star class="wrapper" :size="36" :score="seller.foodScore"></star>
					<span class="view-lineScore">{{seller.foodScore}}</span>
		    	</div>
				<div class="view-line line1">
					<span>送达时间</span>
					<span class="view-lineContent">{{seller.deliveryTime}}分钟</span>
				</div>
		    </div>
	    </div>
	    <div class="view-con2">
	    	<div class="tag">
		    	<ul class="t-top">
		    		<li v-for="item in ratingTitle">
						<button :class="item.back" class="tags" @click="ratingSele(item.reting)">{{item.name}}</button>
					</li>
		    	</ul>
				<div class="switch" @click="bian">
					<i class="icon-check_circle" :class="{on:this.bool}"></i>
					<span class="text">只看有内容的评价</span>
				</div>
		    	<ul class="t-bottom" v-show="ratings">
		    		<li class="comment" v-for="evel in ratings">
			    		<div class="comment-con">
				    		<img :src="evel.avatar">
				    	</div>
			    		<div class="comment-ent">
				    		<div class="c-top">
					    		<span class="comment-username">{{evel.username}}</span>
					    		<span class="comment-time">{{evel.rateTime|setDate}}</span>
				    		</div>
				    		<div class="wuxing"><div ></div>
					    		<star class="rating-wrapper" :size="24" :score="evel.score"></star>
					    		<span class="comment-st">{{evel.deliveryTime?evel.deliveryTime:seller.deliveryTime}}分钟送达</span>
				    		</div>
				    		<span class="com-cont">
				    			{{evel.text}}
				    		</span>
				    		<div class="zan">
				    			<i class="icon-thumb_up"></i>
				    			<ul>
						    		<li v-for="dish in evel.recommend">{{dish}}</li>
					    		</ul>
				    		</div>
			    		</div>
		    		</li>
		    	</ul>
	    	</div>
	    </div>
	  </div>
  </div>
</template>

<script>
import axios from "axios"
import Vue from "vue"
import BScroll from 'better-scroll'
import star from '@/components/star/star'
import timer from '@/components/timer/timer'
export default {
	props:{
		seller:{
			type:Object,
		}
	},
	data(){
		return {
			ratingss: [],
			showBool:false,
			ratingTitle:[
				{reting:'All',name:"全部",back:"item1"},
				{reting:0,name:"喜欢",back:"item2"},
				{reting:1,name:"吐槽",back:"item3"},
			],
			food:[],
			foodss:[],
			ratings: [],
	    	bool:false
		}
	},
	components: {
		star: star,
	},
	created(){
		this._getGoods();
		this.shoe();
	},
	methods:{
		shoe(){
			this.ratingSele("All");
		},
		ratingSele(stat){
			if(stat=="All"){
				this.ratings=this.ratingss;
				return;
			}
			this.food=this.ratingss;
			// console.log(stat);
			
			var rel=[];
			this.food.forEach((item)=>{
				// console.log(item.rateType);
				if(stat==item.rateType){
					rel.push(item);
				}
			})
			this.ratings=rel;
			// console.log(this.ratings);
		},
		bian(){
			if(!this.bool){
				this.bool=true;
			}else{
				this.bool=false;
			}
			
		},
		_getGoods(){
			axios.get('api/ratings').then((rel)=>{
				rel.data.data.forEach((val)=>{
					// console.log(this);
					this.ratingss.push(val);

					this.$nextTick(()=>{
						this._bsrcoIni();
					})
				})
				
			})
			// console.log(this.ratingss);
			return this.ratingss;
		},
		_bsrcoIni(){
			let getscroll=this.$refs.getscroll;
			// console.log(getscroll);
			this.getscrolls=new BScroll(getscroll);
		},
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import "~common/style/mixin.scss";
	@import "~@/components/ratings/ratings.scss";
</style>
