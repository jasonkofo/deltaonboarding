<template>
  <div class="deal-view-container">
    <div class="deal-view-left">
      <h3>{{ deal.title }}</h3>
    </div>
    <div class="deal-view-right">
      <div v-if="hasOtherDeals">
        <div class="other-deals-tab">
          <h4>Other deals for this game</h4>
        </div>
        <div
          v-for="(od, idx) in otherDeals"
          :key="idx"
          class="other-deals-item"
        >
          <h5 class="d-flex justify-content-start">{{ od.storeName }}</h5>
          <button
            type="button"
            class="btn btn-outline-info d-flex justify-content-end"
            @click="od.navigateToDeal()"
          >View More</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/common.scss";

@mixin internal-padding() {
	padding: 20px;
}
.deal-view-container {
	display: flex;
	justify-content: row;
	padding: 15px;
	height: 100%;

	.deal-view-left {
		@include internal-padding();
		flex: 3 1 auto;
		height: auto;
		overflow-y: auto;
		height: 100px;
		background-color: green;
	}
	.deal-view-right {
		@include internal-padding();
		flex: 2 1 auto;
		overflow-y: hidden;
		height: 100px;
		// background-color: red;
		.other-deals-tab {
			@include information-tab();
			padding: 10px;
			font-weight: 900;
		}
		.other-deals-item {
			padding: 7px;
			display: flex;
			height: 80px;
			justify-content: row;
			align-items: baseline;
		}
	}
}
</style>

<script lang="ts">
import { Deal } from "@/models/deal";
import { Store } from "@/models/store";
import { DealsService } from "@/services/deal.service";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

export class DealStore {
	deal: Deal;
	store: Store;
	constructor(deal: Deal, store: Store) {
		this.deal = deal;
		this.store = store;
	}
}

@Component
export default class DealView extends Vue {
	@Prop({ type: String, required: true }) dealID!: string;
	stores: Store[] = [];
	deal: Deal = {} as Deal;
	deal2OtherStores: Map<string, DealStore[]> = new Map<string, DealStore[]>();

	beforeCreate() {
		DealsService.fetchDeals().then(async (deals: Deal[]) => {
			this.deal = deals.find(d => d.ID === this.dealID) as Deal;
			const stores = await DealsService.fetchStores();
			this.deal2OtherStores = new Map<string, DealStore[]>();
			for (const d of deals) {
				const s = stores.find(s => s.storeID === d.storeID);
				if (!s) {
					continue;
				}
				this.deal2OtherStores.set(d.internalName, [
					...(this.deal2OtherStores?.get(d.internalName) || []),
					new DealStore(d, s)
				]);
			}
		});
	}

	get otherDeals(): any[] {
		const _self = this;
		return (
			(this?.deal2OtherStores?.get(this.deal.internalName) || null)?.map((d: DealStore) => {
				return {
					storeName: d.store.storeName,
					navigateToDeal: () => {
						_self.$router.push({ name: "DealView", params: { dealID: d.deal.ID } });
					},
					deal: d.deal
				};
			}) || []
		);
	}

	hasOtherDeals(): boolean {
		return this.otherDeals?.length > 0;
	}
}
</script>
