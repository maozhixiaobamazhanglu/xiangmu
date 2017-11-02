<template>
	<transition name="slide">
		<div class="food" v-show="showBool">
			<div class="container">
				<div class="header">
					<div class="tui">
						<i class="icon-arrow_lift" @click="showHide"></i>
					</div>
					<img :src="foodss.image" alt="">
				</div>
				<div class="section">
					<div class="one">{{foodss.name}}</div>
					<div class="two">
						<span>月售{{foodss.sellCount}}份</span>
						<span>好评率{{foodss.rating}}%</span>
					</div>
					<div class="three">
						<span class="span1">￥</span>
						<span class="span2">{{foodss.price}}</span>
					</div>
					<div class="btn1" @click="add">加入购物车</div>
				</div>
				<div class="sec2">
					<div class="one1">商品介绍</div>
					<div class="two1">{{foodss.info}}</div>
				</div>
		
				<div class="tag">
					<div class="one1">商品评价</div>
					<ul class="t-top">
						<li v-for="item in ratingTitle">
							<button :class="item.back" class="tags" @click="ratingSele(item.reting)">{{item.name}}</button>
						</li>
					</ul>

					<div class="switch" @click="bian">
						<i class="icon-check_circle" :class="{on:this.bool}"></i>
						<span class="text">只看有内容的评价</span>
					</div>
					<ul class="t-bottom">
						<li class="comment" v-for="item in ratings">
							<div class="comment-ent">
								<div class="c-top">
									<span class="comment-username">{{item.rateTime|setDate}}</span>
									<div class="zong">
										<span class="comment-time">{{item.username}}</span>
										<div class="comment-con">
											<img src="https://fuss10.elemecdn.com/c/f5/d0b0f2fc83f3ac3e4a0cfae891256png.png?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/">
										</div>
									</div>
								</div>
								<div class="zan">
									<div class="ico-shou">
										<i class="icon-thumb_up"></i>
									</div>
									<span class="com-cont">{{item.text}}</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import Vue from "vue"
import timer from '@/components/timer/timer'
export default {
	data(){
		return {
			showBool:false,
			ratingTitle:[
				{reting:'All',name:"全部",back:"item1"},
				{reting:0,name:"喜欢",back:"item2"},
				{reting:1,name:"吐槽",back:"item3"},
			],
			ratings:[],
			food:[],
			foodss:[],
			bool:false
		}
	},
	methods:{
		showHide(food){
			// console.log(food);
			this.food=food.ratings;
			this.foodss=food;
			this.showBool=!this.showBool;
			this.ratingSele("All");
		},
		ratingSele(stat){
			if(stat=="All"){
				this.ratings=this.food;
				return;
			}
			var rel=[];
			this.food.forEach((item)=>{
				// console.log(item.rateType);
				if(stat==item.rateType){
					rel.push(item);
				}
			})
			this.ratings=rel;
		},
		bian(){
			if(!this.bool){
				this.bool=true;
			}else{
				this.bool=false;
			}
			
		},
		add(){
			if(!this.foodss.count){
				Vue.set(this.foodss,'count',1);
			}else{
				this.foodss.count++;
			}
		},
	}
}
</script>

<style scoped lang="scss">
	@import "~common/style/mixin.scss";
	@import "~@/components/show/show.scss";
</style>