<template>
	<div class="shopcart">

		<div class="carty" v-show="this.bol">
			<div class="cart-top">
				<span class="left">购物车</span>
				<span class="right" @click="qing">清空</span>
			</div>
			<div class="cart-dian"></div>
			<div class="cart-content">
				<div class="forea" v-for="item in selectFoods">
					<div class="name">{{item.name}}</div>
					<div class="price">￥</div>
					<div class="shu">{{item.price}}</div>

					<div class="numm">
						<cartbutton :food="item"></cartbutton>
					</div>
					<div class="nummm"></div>
				</div>
			</div>
		</div>

		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper" :style="{background:total.bool?'#25AEE1':''}" @click="bian">
					<i class="icon-shopping_cart" :class="{on:total.bool}"></i>
				</div>
				<div class="num" v-show="total.bool">{{total.num}}</div>
			</div>
			<div class="content-center">
				<span class="price">￥{{total.price}}</span>
				<span class="text">另需配送费￥{{seller.deliveryPrice}}</span>
			</div>
			<div class="content-right">{{payDesc}}</div>
		</div>
		<div class="bgd" v-show="this.bol" @click="guan()"></div>

	</div>
</template>
<script>
import cartbutton from "@/components/cartbutton/cartbutton"
	export default{
		props:{
			seller:{
				type:Object
			},
			selectFoods:{
				type:Array,
				default(){
					return []
				}
			}
		},
		components:{
			cartbutton
		},
		computed:{
			total(){
				let total={
					price:0,
					num:0,
					boll:false,
					pay:false
				}
				this.selectFoods.forEach((food)=>{
					total.price+=food.count*food.price;
					total.num+=food.count;
				})
				if(total.num>0){
					total.bool=true;
				}
				if(total.price>=20){
					total.pay=true;
				}else{
					total.pay=false;
				}
				return total;
			},
			payDesc(){
				// console.log(this.total.price,this.seller.minPrice);
				if(this.total.price===0){
					return `￥${this.seller.minPrice}元起送`
				}else if(this.total.price<this.seller.minPrice){
					let rel=this.seller.minPrice-this.total.price;
					return `还差￥${rel}元起送`;
				}else{
					return '去结算'
				}
			}
		},
		data(){
		    return {
		    	goods:[],
		    	bol:false,
		    	boll:false
		    }
		},
		methods:{
		    bian(){
		    	if(!this.bool){
		    		this.bol=true;
		    	}else{
		    		this.bol=false;
		    	}
		      
		      // console.log(this.bol);
		    },
		    guan(){
		      this.bol=false;
		      // console.log(this.bol);
		    },
		    qing(){
		    	// console.log(this.selectFoods);
		    	this.selectFoods.forEach((val)=>{
		    		console.log(val.count);
		    		val.count=0;
		    	})
		    }
		     
		},
	}
</script>
<style scoped lang="scss">
	@import "~common/style/mixin.scss";
	@import "~@/components/cartcontrol/cartcontrol.scss";
</style>