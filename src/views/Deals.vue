<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <SearchComponent
          @startTyping="triggerSearchComponent"
          @searchText="onSearchFinished"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          v-model="filterOnSale"
        >
        <label
          class="form-check-label"
          for="flexCheckDefault"
        >
          On Sale
        </label>
      </div>
    </div>
    <div class="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-xs-1">
      <DealItem
        v-for="(deal, i) in deals"
        :key="i"
        class="col"
        :deal="deal"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Deal } from "../models/deal";
import DealItem from "../components/DealItem.vue";
import SearchComponent from "../components/Search.vue";
import { DealsService } from "../services/deal.service";
import { mixins } from "vue-class-component";
import { SearchComponentMixin } from "@/mixins/search-component-mixin";

@Component({
	components: {
		DealItem,
		SearchComponent
	}
})
export default class Deals extends mixins(SearchComponentMixin) {
	dealsInternal: Deal[] = [];
	filterOnSale: boolean = false;

	async mounted() {
		this.dealsInternal = await DealsService.fetchDeals();
	}

	get deals(): Deal[] {
		return this.dealsInternal.filter(f => {
			if (this.filterOnSale && !f.onSale) {
				return false;
			}
			if (this.searchTerm !== "" && !this.matchesSearch(f.title)) {
				return false;
			}
			return true;
		});
	}
}
</script>
