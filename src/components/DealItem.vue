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
        @click="navigateToDealView(deal)"
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

	navigateToDealView(deal: Deal) {
		this.$router.push({ name: "DealView", params: { dealID: deal.ID } });
	}
}
</script>

<style lang="scss">
@import "../assets/common.scss";

@mixin rounded-edges() {
	border-radius: 15px;
}

@mixin left-align() {
}

.deal-item-container {
	@include information-tab();
	text-align: left;

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
			@include sale-price();
		}
	}
}
</style>
