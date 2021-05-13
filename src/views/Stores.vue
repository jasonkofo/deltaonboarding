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
        :numDeals="getNumberOfDealsForStore(stores[row])"
      />
      <StoreItem
        class="col-4"
        v-if="!isIndexOutOfBounds(row+1)"
        :store="getStoreAtIndex(row+1)"
        :numDeals="getNumberOfDealsForStore(stores[row+1])"
      />
      <StoreItem
        class="col-4"
        v-if="!isIndexOutOfBounds(row+2)"
        :store="getStoreAtIndex(row+2)"
        :numDeals="getNumberOfDealsForStore(stores[row+2])"
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
		DealsService.fetchStores().then(stores => {
			this.stores = stores;
		});
		DealsService.storeID2Deals().then(deals => {
			this.storeID2Deals = deals;
		});
	}

	get numRows(): number {
		return Math.ceil(this.stores.length / 3);
	}

	getNumberOfDealsForStore(store: Store) {
		return this?.storeID2Deals?.get(store.storeID)?.length || 0;
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
