class StoreImages {
	banner: string;
	logo: string;
	icon: string;

	constructor(obj: any) {
		this.banner = obj["banner"] || "";
		this.logo = obj["logo"] || "";
		this.icon = obj["icons"] || "";
	}
}

/*
Local Store class
	{
		"storeID": "1",
		"storeName": "Steam",
		"isActive": 1,
		"images": {
			"banner": "/img/stores/banners/0.png",
			"logo": "/img/stores/logos/0.png",
			"icon": "/img/stores/icons/0.png"
		}
	}
*/
export class Store {
	storeID: string;
	_storeName: string;
	isActive: boolean;
	images: StoreImages;

	constructor(obj: any) {
		this.storeID = obj["storeID"];
		this._storeName = obj["storeName"];
		this.isActive = obj["isActive"] == 1;
		this.images = new StoreImages(obj["images"]);
	}

	get storeName(): string {
		return this._storeName || "";
	}

	get bannerImage(): string {
		return this.images?.banner || "";
	}

	get hasBannerImage(): boolean {
		return this.bannerImage !== "";
	}

	get logoImage(): string {
		return this.images?.logo || "";
	}

	get hasLogoImage(): boolean {
		return this.logoImage !== "";
	}

	get iconImage(): string {
		return this.images?.icon || "";
	}

	get hasIconImage(): boolean {
		return this.iconImage !== "";
	}
}
