/*
Local Deal class
	{
		"internalName": "MONSTERSLAYERS",
		"title": "Monster Slayers",
		"metacriticLink": "/game/pc/monster-slayers",
		"dealID": "efnekCfOb2PEuQKTA0pkNNle%2FulyRP4j9fx0E5vdncQ%3D",
		"storeID": "3",
		"gameID": "167601",
		"salePrice": "2.43",
		"normalPrice": "8.99",
		"isOnSale": "1",
		"savings": "72.969967",
		"metacriticScore": "86",
		"steamRatingText": "Very Positive",
		"steamRatingPercent": "88",
		"steamRatingCount": "313",
		"steamAppID": "496620",
		"releaseDate": 1534291200,
		"lastChange": 1535037686,
		"dealRating": "10.0",
		"thumb": "https://steamcdn-a.akamaihd.net/steam/apps/496620/capsule_sm_120.jpg?t=1533784859"
	}
*/
export class Deal {
	private _dealID: string;
	private _dealRating: number;
	private _gameID: string;
	private _internalName: string;
	private _isOnSale: boolean;
	private _lastChange: number;
	private _metacriticLink: string;
	private _normalPrice: number;
	private _releaseDate: Date | null;
	private _salePrice: number;
	private _savings: number;
	private _steamAppID: string;
	private _steamRatingCount: number;
	private _steamRatingPercent: number;
	private _steamRatingText: string;
	private _storeID: string;
	private _thumb: string;
	private _title: string;
	// base64 encoded representation of the image
	private _image: any;

	constructor(obj?: any) {
		this._dealID = obj["dealID"] || "";
		this._dealRating = parseFloat(obj["dealRating"] || "");
		this._gameID = obj["gameID"] || "";
		this._internalName = obj["internalName"] || "";
		this._isOnSale = (obj["isOnSale"] || "") == "1";
		this._lastChange = obj["lastChange"] || "";
		this._metacriticLink = obj["metacriticLink"] || "";
		this._normalPrice = parseFloat(obj["normalPrice"] || "");
		this._releaseDate = new Date(obj["releaseDate"] || "");
		this._salePrice = parseFloat(obj["salePrice"] || "");
		this._savings = parseFloat(obj["savings"] || "");
		this._steamAppID = obj["steamAppID"] || "";
		this._steamRatingCount = parseInt(obj["steamRatingCount"] || "");
		this._steamRatingPercent = parseFloat(obj["steamRatingPercent"] || "");
		this._steamRatingText = obj["steamRatingText"] || "";
		this._storeID = obj["storeID"] || "";
		this._thumb = obj["thumb"] || "";
		this._title = obj["title"] || "";
		fetch(this._thumb, { mode: "no-cors" }).then(resp => {
			resp.arrayBuffer().then(buf => {
				this._image = this.arrayBufferToBase64(buf);
			});
		});
	}

	// https://medium.com/front-end-weekly/fetching-images-with-the-fetch-api-fb8761ed27b2
	arrayBufferToBase64(buffer: ArrayBuffer): string {
		const bytes = [].slice.call(new Uint8Array(buffer));
		let binary = "data:image/jpeg;base64,";
		bytes.forEach(b => (binary += String.fromCharCode(b)));
		return window.btoa(binary);
	}

	get title(): string {
		return this._title || "";
	}

	get trimmedTitle(): string {
		const len = 25;
		if (this.title.length > len) {
			return this.title.substring(0, len) + "...";
		}
		return this.title;
	}

	get onSale(): boolean {
		return this._isOnSale || false;
	}

	get imageB64(): string {
		return this._image || "";
	}

	get hasImage(): boolean {
		return (this?._thumb || "") !== "";
	}

	get truth(): string {
		return this._thumb || "";
	}

	get normalPrice(): string {
		return this.toCurrency(this._normalPrice || 0);
	}

	get salePrice(): string {
		return this.toCurrency(this._salePrice || 0);
	}

	get storeID(): string {
		return this._storeID || "";
	}

	private toCurrency(val: number) {
		return val.toLocaleString("en-US", {
			currency: "usd",
			style: "currency",
			useGrouping: true,
			maximumFractionDigits: 2
		});
	}
}
