import { Observable } from "domodel"

/**
 * @global
 */
class Day extends Observable {

	/**
	 * @param {Date} date
	 */
	constructor(date, grayed=false) {
		super()
		this._date = date
		this._grayed = grayed
	}

	/**
	 * @readonly
	 * @type {Date}
	 */
	get date() {
		return this._date
	}


	/**
	 * @readonly
	 * @type {Date}
	 */
	get grayed() {
		return this._grayed
	}

}

export default Day
