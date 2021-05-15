<template>
  <div class="container-fluid">
    <div
      v-for="row in numRows"
      :key="row"
      class="row"
    >
      <StoreItem
        class="col-4"
        v-if="!isIndexOutOfBounds(row)"
        :store="getStoreAtIndex(row)"
        :numDeals="storeID2NumDeals.get(stores[row].storeID)"
      />
      <StoreItem
        class="col-4"
        v-if="!isIndexOutOfBounds(row+1)"
        :store="getStoreAtIndex(row+1)"
        :numDeals="storeID2NumDeals.get(stores[row+1].storeID)"
      />
      <StoreItem
        class="col-4"
        v-if="!isIndexOutOfBounds(row+2)"
        :store="getStoreAtIndex(row+2)"
        :numDeals="storeID2NumDeals.get(stores[row+2].storeID)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Store } from "../models/store";
import StoreItem from "../components/StoreItem.vue";
import SearchComponent from "../components/Search.vue";
import { DealsService } from "../services/deal.service";
import { Deal } from "@/models/deal";

@Component({
	components: {
		StoreItem,
		SearchComponent
	}
})
export default class Deals extends Vue {
	stores: Store[] = [];
	storeID2Deals: Map<string, Deal[]> = {} as Map<string, Deal[]>;

	async beforeCreate() {
		DealsService.fetchStores().then(async stores => {
			this.stores = stores;
			const deals = await DealsService.fetchDeals();
			const m = new Map<string, Deal[]>();
			for (const deal of (deals || []) as Deal[]) {
				const c = m.get(deal.storeID);
				if (typeof c !== "undefined") {
					m.set(deal.storeID, [...c, deal]);
				} else {
					m.set(deal.storeID, [deal]);
				}
			}
			this.storeID2Deals = m;
		});
	}

	get storeID2NumDeals(): Map<string, number> {
		const m = new Map<string, number>();
		if ((this.storeID2Deals?.size || 0) !== 0) {
			this.storeID2Deals.forEach((val, key) => {
				m.set(key, val?.length || 0);
			});
		}
		return m;
	}

	get numRows(): number {
		return Math.ceil(this.stores.length / 3);
	}

	isIndexOutOfBounds(idx: number): boolean {
		return idx > (this.stores?.length || 0);
	}

	getStoreAtIndex(idx: number): Store | null {
		if (idx < 0 || idx > (this.stores?.length || 0)) {
			return null;
		}
		return this.stores[idx];
	}
}
</script>
