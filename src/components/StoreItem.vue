<template>
  <div>
    <div class="store-item-container">
      <img
        v-if="store.hasBannerImage"
        :src="store.bannerImage"
        :alt="store.title"
        class="store-item-img"
      >
      <h5 class="header-title">{{ store.storeName }}</h5>
      <p class="pricing-section">
        {{ numDeals }}
      </p>

      <button
        type="button"
        class="btn btn-outline-info view-more-button"
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

	navigateToStore() {}
}
</script>

<style lang="scss">
@mixin rounded-edges() {
	border-radius: 15px;
}

@mixin left-align() {
	text-align: left;
}

.store-item-container {
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
		@include left-align();
	}
	.store-item-img {
		width: 200px;
		height: 200px;
		@include rounded-edges();
	}
	.text-strikethrough {
		text-decoration: line-through;
		@include left-align();
	}
	.pricing-section {
		@include left-align();
	}

	.view-more-button {
		@include left-align();
	}
}
</style>
