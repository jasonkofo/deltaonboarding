<template>
  <div>sd</div>
</template>

<script lang="ts">
import { Deal } from "@/models/deal";
import { Store } from "@/models/store";
import { DealsService } from "@/services/deal.service";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class DealView extends Vue {
	@Prop({ type: String, required: true }) dealID!: string;
	stores: Store[] = [];
	deal: Deal = {} as Deal;

	created() {
		DealsService.fetchDeals(d => d.ID === this.dealID).then((d: Deal[]) => {
			if ((d?.length || 0) > 0) {
				// take the first record and just enter it into the object
				this.deal = d[0];
				console.log(this.deal);
			}
		});
	}
}
</script>
