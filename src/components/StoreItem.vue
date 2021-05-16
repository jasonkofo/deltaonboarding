<template>
  <div>
    <div class="store-item-container">
      <img
        v-if="store.hasBannerImage"
        :src="ensureCheapShark(store.logoImage)"
        :alt="store.title"
        class="store-item-img"
      >
      <h5 class="header-title">{{ store.storeName }}</h5>
      <p> {{ numDealsText }} </p>

      <button
        type="button"
        class="btn btn-outline-info"
        @click="navigateToStore()"
      >View More</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Store } from "@/models/store";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class DealItem extends Vue {
	@Prop({ required: true }) store!: Store;
	@Prop({ default: 0, type: Number }) numDeals!: number;
	path = require("path");

	navigateToStore() {}

	get numDealsText(): string {
		return `${this.numDeals} deal${this.numDeals === 1 ? "" : "s"}`;
	}

	private ensureCheapShark(url: string): string {
		const p = "https://www.cheapshark.com/";
		if (url.indexOf(p) === -1) {
			url = this.path.join(p, url);
		}
		return url;
	}
}
</script>

<style lang="scss">
@mixin rounded-edges() {
	border-radius: 15px;
}

.store-item-container {
	text-align: left;
	background-color: rgba(251, 251, 251, 255);
	padding: 25px;
	margin: 5px;
	height: auto;
	width: auto;
	@include rounded-edges();
	width: 400px;
	.header-title {
		margin-top: 15px;
		font-weight: 700;
	}
	.store-item-img {
		width: 100px;
		height: 100px;
		@include rounded-edges();
	}
	.text-strikethrough {
		text-decoration: line-through;
	}
}
</style>
