import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export class SearchComponentMixin extends Vue {
	busyLoading: boolean = false;
	searchTimeout: number = 0;
	searchTerm: string = "";

	triggerSearchComponent() {
		this.busyLoading = true;
		const _self = this;
		this.searchTimeout = setTimeout(() => {
			// [JKG 2021-05-16] If the timeout remains unset after
			// 10 milliseconds, stop loading
			this.busyLoading = false;
			clearTimeout(_self.searchTimeout);
		}, 10000);
	}

	onSearchFinished(searchTerm: string) {
		clearTimeout(this.searchTimeout);
		this.searchTerm = searchTerm;
		this.busyLoading = false;
	}

	matchesSearch(s: string): boolean {
		return this.searchTerm.split(" ").every(_s => s.toLowerCase().includes(_s.toLowerCase()));
	}
}
