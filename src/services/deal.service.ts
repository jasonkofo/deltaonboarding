import { Deal } from "@/models/deal";

export class DealsService {
	static dealsCache: Deal[];
	static timestamp: Date;
	constructor() {}

	static get cheapSharkURL(): string {
		return "https://www.cheapshark.com/api/1.0/deals";
	}

	private static secondsSinceLastFetch(): number {
		return new Date().getTime() - (this.timestamp || new Date()).getTime() / 1000;
	}

	private static dealCacheIsStale(): boolean {
		return this.secondsSinceLastFetch() > 120;
	}

	private static fetchFromServer(filterFunc?: (d: Deal) => boolean): Promise<Deal[]> {
		return fetch(this.cheapSharkURL)
			.then(resp => {
				if (resp.status !== 200) {
					throw new Error(`Could not find deals: ${resp.statusText}`);
				}
				this.timestamp = new Date();
				return resp.json();
			})
			.then((r: any[]) => {
				this.dealsCache = r.map(deal => new Deal(deal));
				if (typeof filterFunc !== "function") {
					return this.dealsCache;
				}
				return this.dealsCache.filter(filterFunc);
			})
			.catch(err => {
				console.error(err);
				return [];
			});
	}

	static async fetchDeals(filterFunc?: (f: Deal) => boolean): Promise<Deal[]> {
		if (this.dealCacheIsStale()) {
			return this.fetchFromServer(filterFunc);
		}
		if (typeof filterFunc !== "function") {
			return this.dealsCache;
		}
		return this.dealsCache.filter(filterFunc);
	}
}
