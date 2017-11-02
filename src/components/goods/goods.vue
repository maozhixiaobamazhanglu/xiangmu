<template>
	<div class="goods">
		<!-- 左侧导航 -->
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li class="menu-item" 
				v-for="(item,index) in goods"
				:class="{'current':currentIndex===index}"
				@click="selectMenu(index)"
				>
				<span>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<!-- 右侧菜单 -->
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li class="foods-list" v-for="(item,index) in goods" ref="foodsList">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li class="food-item" v-for="food in item.foods">

							<!-- 商品图片 -->
							<div class="icon">
								<input type="image" v-lazy="food.icon" @click="_selectFood(food)">
							</div>
							<!-- 商品内容 -->
							<div class="content">

								<h2 clss="name">{{food.name}}</h2>
								<div class="desc">{{food.description}}</div>
								<div class="extra">
									<span class="count">月销{{food.sellCount}}</span>
									&nbsp;
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="ico">￥</span><span class="now">{{food.price}}</span>
								</div>
							</div>
							<div class="cartb-wrap">
								<cartbutton :food="food"></cartbutton>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<cartcontrol :selectFoods="selectFoods" :seller="seller"></cartcontrol>
		<show ref="show"></show>
	</div>
</template>

<script>
import axios from "axios"
import BScroll from 'better-scroll'
import Cartcontrol from '@/components/cartcontrol/cartcontrol'
import cartbutton from "@/components/cartbutton/cartbutton"
import show from "@/components/show/show"

export default {
	props:{
		seller:{
			type:Object,
		}
	},
	data(){
		return{
			goods:[],
			listHeight:[],
			scrollY:0,
			selectFood:{},
		}
	},
	created(){
		// console.log(this.seller);
		this._getGoods();
	},
	components:{
		Cartcontrol,
		cartbutton,
		show
	},

	computed:{
		currentIndex(){
			for(let i=0;i<this.listHeight.length;i++){
				let height1=this.listHeight[i];
				let height2=this.listHeight[i+1];
				if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
					return i;
				}
			}
			return 0;
		},
		selectFoods(){
			let foods=[];
			if(this.goods[0]){
				this.goods.forEach((val)=>{
					val.foods.forEach((item)=>{
						if(item.count>0){
							foods.push(item);
						}
					})
				})
			}
			if(this.qin=="OK"){
				 foods=[];
			}
			return foods;
		}
	},
	methods:{
		_getGoods(){
			axios.get('api/goods').then((rel)=>{
				this.goods=rel.data.data;
				// console.log(this);
				this.$nextTick(()=>{
					this._bsrcoInit();
					this._getFoodsHeight();
				})
			})
		},
		_bsrcoInit(){
			let menuWrapper=this.$refs.menuWrapper;
			let foodsWrapper=this.$refs.foodsWrapper;
			// console.log(menuWrapper);
			this.menuScroll=new BScroll(menuWrapper,{
				click:true
			});
			this.foodsScroll=new BScroll(foodsWrapper,{
				// click:true,
				probeType:3
			});
			this.foodsScroll.on('scroll',(sol)=>{
				this.scrollY=Math.abs(Math.round(sol.y));
			})
		},
		_getFoodsHeight(){
			let foodsList=this.$refs.foodsList;
			let height=0;
			this.listHeight.push(height);
			for(let i=0;i<foodsList.length;i++){
				let item=foodsList[i];
				height+=item.clientHeight;
				this.listHeight.push(height);
			}
		},
		_selectFood(food){
			// console.log('555');
	    	// console.log(food);
	    	// this.selectFood=food;
			this.$refs.show.showHide(food);
	    },
		selectMenu(index){
			let foodsList=this.$refs.foodsList;
			let selectEl=foodsList[index];
			this.foodsScroll.scrollToElement(selectEl,400);
		},
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import "~common/style/mixin.scss";
	@import "~@/components/goods/goods.scss";
</style>
