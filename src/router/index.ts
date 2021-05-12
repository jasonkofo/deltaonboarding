import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Deals from "../views/Deals.vue";
import Games from "../views/Games.vue";
import Stores from "../views/Stores.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/deals",
		name: "Deals",
		component: Deals
	},
	{
		path: "/games",
		name: "Games",
		component: Games
	},
	{
		path: "/stores",
		name: "Stores",
		component: Stores
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	// ASSUMPTION
	// there is no home page, so the user needs to go to the deals page first
	if (to.fullPath === "/") {
		next("/deals");
	}
	next();
});

export default router;
