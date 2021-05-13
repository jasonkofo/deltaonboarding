<template>
  <div>
    <div class="deal-item-container">
      <!-- <img
        v-if="deal.hasImage"
        :src="deal.truth"
        :alt="deal.title"
        class="deal-item-img"
      > -->
      <h5 class="header-title">{{ deal.trimmedTitle }}</h5>
      <p class="pricing-section">
        <span :class="normalPriceCSS">{{ deal.normalPrice }}</span>
        <span
          v-if="deal.onSale"
          class="sale-price"
        >{{ deal.salePrice }}</span>
      </p>

      <button
        type="button"
        class="btn btn-outline-info view-more-button"
        @click="navigateToDeal()"
      >View More</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Deal } from "../models/deal";

@Component
export default class DealItem extends Vue {
	@Prop({ required: true }) deal!: Deal;

	get normalPriceCSS(): string {
		if (this.deal?.onSale || false) {
			return "text-strikethrough";
		}
		return "";
	}

	navigateToDeal() {}
}
</script>

<style lang="scss">
@mixin rounded-edges() {
	border-radius: 15px;
}

@mixin left-align() {
}

.deal-item-container {
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
	.text-strikethrough {
		text-decoration: line-through;
	}
	.pricing-section {
		span {
			margin-right: 10px;
		}
		.sale-price {
			color: rgba(0, 174, 141, 255);
			font-weight: 400;
		}
	}
}
</style>
