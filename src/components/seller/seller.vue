<template>
	<div class="hello" ref="foodsWrapper">
		<div>
			<div class="view-con" ref="foodsList">
				<div class="view-col1">
					<p class="view-all">{{seller.name}}</p>
					<div class="fle">
						<star class="view-wxing" :size="36" :score="seller.score"></star>
						<p class="view-title">({{seller.ratingCount}})</p>
						<p class="view-small">月售{{seller.sellCount}}单</p>
					</div>
					<div class="scang" @click="bian">
						<i class="icon-favorite" :class="{on:this.bool}"></i>
						<div class="i-zi">{{this.bool?'已收藏':'收藏'}}</div>
					</div>
				</div>
				<div class="view-col2">
					<ul class="view-line">
						<li>
							<div class="wrapper">起送价</div>
							<div class="flexs">
								<p class="view-lineScore">{{seller.minPrice}}</p>
								<p class="view-Score">元</p>
							</div>
						</li>
						<li>
							<div class="wrapper">商家配送</div>
							<div class="flexs">
								<p class="view-lineScore">{{seller.deliveryPrice}}</p>
								<p class="view-Score">元</p>
							</div>
						</li>
						<li style="border:0;">
							<div class="wrapper">平均配送时间</div>
							<div class="flexs">
								<p class="view-lineScore">{{seller.deliveryTime}}</p>
								<p class="view-Score">分钟</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="view-cont1" ref="foodsList">
				<div class="col1">
					<p class="all">公告与活动</p>
					<p class="fle">{{seller.bulletin}}</p>
				</div>
				<div class="col2">
					<ul class="line">
						<li  v-for="(items,index) in good">
							<div class="wrap-img" :class="iconClassMap[index]"></div>
							<div class="wrap-cont">
								<p class="wrap-content">{{items}}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="view-cont2" ref="foodsList">
				<div class="col11">
					商家实景
				</div>
				<div class="col12">
					<ul class="line2">
						<li v-for="imt in tu">
							<img :src="imt" alt="">
						</li>
					</ul>
				</div>
			</div>
			<div class="view-cont3" ref="foodsList">
				<div class="col13">
					<p class="all3">商家信息</p>
				</div>
				<div class="col23">
					<ul class="line3">
						<li v-for="item in goods">
							<div class="wrap-cont3">
								<p class="wrap-content3">{{item}}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
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
	data(){
		return{
			goods:[],
			good:[],
			tu:[],
			bool:false,
			scrollY:0,
			listHeight:[],
		}
	},
	created(){
		this.add();
		this.adds();
		this.tus();
		// this._bsrcoIn();
		this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		// console.log(this.good);
	},
	methods:{
		add(){
			this.seller.infos.forEach((val)=>{
				// console.log(this);
				this.goods.push(val);
				
				this.$nextTick(()=>{
					this._bsrcoIn();
				})
			})
			return this.goods;
		},
		adds(){
			this.seller.supports.forEach((val)=>{
				// console.log(val.description);
				this.good.push(val.description);
			})
			return this.good;
		},
		tus(){
			this.seller.pics.forEach((val)=>{
				this.tu.push(val);
			})
			return this.tu;
		},
		bian(){
			if(!this.bool){
				this.bool=true;
			}else{
				this.bool=false;
			}
			
		},
		_bsrcoIn(){
			let foodsWrapper=this.$refs.foodsWrapper;
			console.log(foodsWrapper);
			this.foodsScroll=new BScroll(foodsWrapper);
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import "~common/style/mixin.scss";
	@import "~@/components/seller/seller.scss";

	.wrap-img{
		width:pxrem(32);
		height:pxrem(32);
		margin-right:pxrem(12);
		background-repeat:no-repeat;
		background-position:center left;
		background-size:pxrem(32) pxrem(32);

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

