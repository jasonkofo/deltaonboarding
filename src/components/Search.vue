
<template>
  <div>
    <div>
      <input
        v-model="searchText"
        id="search-text-input"
      />
      <label for="search-text-input">Search</label>
      <button
        type="button"
        class="btn btn-primary"
      >
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class Search extends Vue {
	searchText: string = "";
	searchBroadcastTimeout: number = 0;

	@Watch("searchText")
	onSearchText() {
		clearTimeout(this.searchBroadcastTimeout);
		this.searchBroadcastTimeout = setTimeout(() => {
			this.$emit("searchText", this.searchText);
		}, 250);
	}
}
</script>
