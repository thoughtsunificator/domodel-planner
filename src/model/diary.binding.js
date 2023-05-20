import { Binding, Model } from "domodel"
import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

import DiaryEventListener from "./diary.event.js"

import DiaryViewModel from "./view/diary.js"

import DiaryViewBinding from "./view/diary.binding.js"

/**
 * @global
 */
class DiaryBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Diary} properties.diary
	 */
	constructor(properties) {
		super(properties, new DiaryEventListener(properties.diary))
		this.router = new Router(
			{
				routes: [
					new Route({ match: "/", model: new Model(DiaryViewModel, DiaryViewBinding) })
				]
			})
	}

	onCreated() {
		this.run(RouterModel, { binding: new RouterBinding({ router: this.router }) })
	}

	/**
	 * @type {Router}
	 */
	get router() {
		return this._router
	}

	set router(router) {
		this._router = router
	}

}

export default DiaryBinding
