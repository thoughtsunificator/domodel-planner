import { Observable } from "domodel"

import Calendar from "./calendar.js"

/**
 * @global
 */
class Planner extends Observable {

	/**
	 * @param {Date} date
	 */
	constructor(date = new Date()) {
		super()
		this._calendar = new Calendar(date)
		this._firstRun = true
	}

	/**
	 * @readonly
	 * @type {Calendar}
	 */
	get calendar() {
		return this._calendar
	}

	/**
	 * @readonly
	 * @type {Editor}
	 */
	get editor() {
		return this._editor
	}

	/**
	 * @type {boolean}
	 */
	get firstRun() {
		return this._firstRun
	}

	set firstRun(firstRun) {
		this._firstRun = firstRun
	}

}

export default Planner
