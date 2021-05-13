<template>
  <div>sd</div>
</template>

<script lang="ts">
import { Store } from "@/models/store";
import { DealsService } from "@/services/deal.service";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class DealView extends Vue {
	stores: Store[] = [];

	async created() {
		this.stores = await DealsService.fetchStores();
	}
}
</script>
