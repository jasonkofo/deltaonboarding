import { Deal } from "@/models/deal";
import { Game } from "@/models/game";
import { Store } from "@/models/store";

function toPromise<T>(arg: T): Promise<T> {
	return new Promise(res => res(arg));
}

class Cache {
	constructor(public records: any[], private timestamp = new Date()) {}

	private secondsSinceLastFetch(): number {
		return new Date().getTime() - (this.timestamp || new Date()).getTime() / 1000;
	}

	isStale(): boolean {
		return this.secondsSinceLastFetch() > 120;
	}
}

export class DealsService {
	static dealsCache: Cache;
	static storesCache: Cache;
	static gamesCache: Cache;
	static stores: Store[];

	static get dealsCheapURL(): string {
		return "https://www.cheapshark.com/api/1.0/deals";
	}

	static get storesCheapURL(): string {
		return "https://www.cheapshark.com/api/1.0/stores";
	}

	static get gamesCheapURL(): string {
		return "https://www.cheapshark.com/api/1.0/games";
	}

	private static fetchDealsFromServer(filterFunc?: (d: Deal) => boolean): Promise<Deal[]> {
		return fetch(this.dealsCheapURL)
			.then(resp => {
				if (resp.status !== 200) {
					throw new Error(`Could not find deals: ${resp.statusText}`);
				}
				return resp.json();
			})
			.then((r: any[]) => {
				this.dealsCache = new Cache(r.map(deal => new Deal(deal)));
				if (typeof filterFunc !== "function") {
					return this.dealsCache?.records || [];
				}
				return this.dealsCache?.records?.filter(filterFunc) || [];
			})
			.catch(err => {
				console.error(err);
				return [];
			});
	}

	private static fetchStoresFromServer(filterFunc?: (d: Store) => boolean): Promise<Store[]> {
		return fetch(this.storesCheapURL)
			.then(resp => {
				if (resp.status !== 200) {
					throw new Error(`Could not find deals: ${resp.statusText}`);
				}
				return resp.json();
			})
			.then((r: any[]) => {
				this.storesCache = new Cache(r.map(store => new Store(store)));
				if (typeof filterFunc !== "function") {
					return this.storesCache?.records || [];
				}
				return this.storesCache?.records?.filter(filterFunc) || [];
			})
			.catch(err => {
				console.error(err);
				return [];
			});
	}

	private static fetchGamesFromServer(filterFunc?: (d: Game) => boolean): Promise<Game[]> {
		return fetch(this.gamesCheapURL)
			.then(resp => {
				if (resp.status !== 200) {
					throw new Error(`Could not find deals: ${resp.statusText}`);
				}
				return resp.json();
			})
			.then((r: any[]) => {
				this.gamesCache = new Cache(r.map(game => new Game(game)));
				if (typeof filterFunc !== "function") {
					return this.gamesCache?.records || [];
				}
				return this.gamesCache?.records?.filter(filterFunc) || [];
			})
			.catch(err => {
				console.error(err);
				return [];
			});
	}

	static fetchDeals(filterFunc?: (f: Deal) => boolean): Promise<Deal[]> {
		if (typeof this.dealsCache === "undefined" || this.dealsCache?.isStale())
			return this.fetchDealsFromServer(filterFunc);

		if (typeof filterFunc !== "function") {
			return toPromise(this.dealsCache.records);
		}
		return toPromise(this.dealsCache.records.filter(filterFunc));
	}

	static async fetchStores(filterFunc?: (s: Store) => boolean): Promise<Store[]> {
		if (typeof this.storesCache === "undefined" || this.storesCache?.isStale())
			return this.fetchStoresFromServer(filterFunc);

		if (typeof filterFunc !== "function") {
			return toPromise(this.storesCache.records);
		}
		return toPromise(this.storesCache.records.filter(filterFunc));
	}

	static async storeID2Deals(): Promise<Map<string, Deal[]>> {
		const deals = await this.fetchDeals();
		const m = new Map<string, Deal[]>();
		for (const deal of (deals || []) as Deal[]) {
			const c = m.get(deal.storeID);
			if (typeof c !== "undefined") {
				m.set(deal.storeID, [...c, deal]);
			} else {
				m.set(deal.storeID, [deal]);
			}
		}
		return m;
	}

	static fetchGames(filterFunc?: (s: Game) => boolean): Promise<Game[]> {
		if (typeof this.gamesCache === "undefined" || this.gamesCache?.isStale())
			return this.fetchGamesFromServer(filterFunc);

		if (typeof filterFunc !== "function") {
			return toPromise(this.gamesCache.records);
		}
		return toPromise(this.gamesCache.records.filter(filterFunc));
	}
}
