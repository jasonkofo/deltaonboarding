/*
Local Game object type
	{
		"gameID": "146",
		"steamAppID": "35140",
		"cheapest": "5.00",
		"cheapestDealID": "n96QeQ9FLRDoZToO75BS2Dx22PPtc7hlpcehVxUlW2c%3D",
		"external": "Batman: Arkham Asylum Game of the Year Edition",
		"thumb": "https://steamcdn-a.akamaihd.net/steam/apps/35140/capsule_sm_120.jpg?t=1525990900"
	}
*/
export class Game {
	gameID: string;
	steamAppID: string;
	cheapest: number;
	cheapestDealID: string;
	external: string;
	thumb: string;

	constructor(obj: any) {
		this.gameID = obj["gameID"] || "";
		this.steamAppID = obj["steamAppID"] || "";
		this.cheapest = parseFloat(obj["cheapest"] || "");
		this.cheapestDealID = obj["cheapestDealID"] || "";
		this.external = obj["external"] || "";
		this.thumb = obj["thumb"] || "";
	}
}
