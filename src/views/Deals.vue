<template>
  <div class="container-fluid">
    <div
      v-for="row in numRows"
      :key="row"
      class="row"
    >
      <DealItem
        class="col-4"
        v-if="!isIndexOutOfBounds(row)"
        :deal="getDealAtIndex(row)"
      />
      <DealItem
        class="col-4"
        v-if="!isIndexOutOfBounds(row+1)"
        :deal="getDealAtIndex(row+1)"
      />
      <DealItem
        class="col-4"
        v-if="!isIndexOutOfBounds(row+2)"
        :deal="getDealAtIndex(row+2)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Deal } from "../models/deal";
import DealItem from "../components/DealItem.vue";
import SearchComponent from "../components/Search.vue";
import { DealsService } from "../services/deal.service";

@Component({
	components: {
		DealItem,
		SearchComponent
	}
})
export default class Deals extends Vue {
	deals: Deal[] = [];

	async mounted() {
		this.deals = await DealsService.fetchDeals();
	}

	get numRows(): number {
		return Math.ceil(this.deals.length / 3);
	}

	isIndexOutOfBounds(idx: number): boolean {
		return idx > (this.deals?.length || 0);
	}

	getDealAtIndex(idx: number): Deal | null {
		if (idx < 0 || idx > (this.deals?.length || 0)) {
			return null;
		}
		return this.deals[idx];
	}
}
</script>
