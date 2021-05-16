
<template>
  <div>
    <div>
      <input
        v-model="searchText"
        id="search-text-input"
      />
      <label for="search-text-input">Search</label>
      <i class="bi bi-search"></i>
      <i class="fas fa-search search-icon"></i>
    </div>
  </div>
</template>

<style lang="scss">
.search-icon {
	width: 100px;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class Search extends Vue {
	searchText: string = "";
	searchBroadcastTimeout: number = 0;

	@Watch("searchText")
	onSearchText() {
		if (!this.searchBroadcastTimeout) {
			this.$emit("startTyping");
		} else {
			clearTimeout(this.searchBroadcastTimeout);
		}
		this.searchBroadcastTimeout = setTimeout(() => {
			this.$emit("searchText", this.searchText);
		}, 250);
	}
}
</script>
