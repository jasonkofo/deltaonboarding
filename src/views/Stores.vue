<template>
  <div class="container-fluid">
    <div>
      <SearchComponent
        @startTyping="triggerSearchComponent"
        @searchText="onSearchFinished"
      />
    </div>
    <div
      v-loading="busyLoading"
      class="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-xs-1"
    >
      <StoreItem
        v-for="(store, i) in stores"
        :key="i"
        class="col"
        :store="store"
        :numDeals="storeID2NumDeals.get(store.storeID)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Store } from "../models/store";
import StoreItem from "../components/StoreItem.vue";
import SearchComponent from "../components/Search.vue";
import { DealsService } from "../services/deal.service";
import { Deal } from "@/models/deal";
import { mixins } from "vue-class-component";
import { SearchComponentMixin } from "../mixins/search-component-mixin";

@Component({
	components: {
		StoreItem,
		SearchComponent
	}
})
export default class Stores extends mixins(SearchComponentMixin) {
	storesInternal: Store[] = [];
	storeID2Deals: Map<string, Deal[]> = {} as Map<string, Deal[]>;

	async beforeCreate() {
		DealsService.fetchStores().then(async stores => {
			this.storesInternal = stores;
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

	get stores(): Store[] {
		const arr = [...this.storesInternal];
		if (this.searchTerm === "") {
			return arr;
		}
		return arr.filter(s => this.matchesSearch(s.storeName));
	}
}
</script>
