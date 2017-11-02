<template>
	<div>
		<button class="jian" @click="sub()">-
		</button>


			<button class="zi">{{food.count?food.count:0}}</button>


		<button class="jia" @click="add()">+
		
		</button>
	</div>
</template>

<script>
import Vue from "vue"
export default{
	props:['food'],
	data(){
		return{
			count:0
		}
	},
	methods:{
		add(){

			if(!this.food.count){
				Vue.set(this.food,'count',1);
			}else{
				this.food.count++;
			}
			this.count=this.food.count;
		},
		sub(){
			if(this.food.count){
				this.food.count--;
			}
			this.count=this.food.count;
		}
	}
}
</script>
<style scoped lang="scss">
	@import "~common/style/mixin.scss";
	@import "~@/components/cartbutton/cartbutton.scss";
</style>