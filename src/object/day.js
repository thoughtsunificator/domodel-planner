import { Observable } from "domodel"


/**
 * @global
 */
class Day extends Observable {

	/**
	 * @param {Date} date
	 */
	constructor(date, previousMonth=false) {
		super()
		this._date = date
		this._previousMonth = previousMonth
		const today = new Date()
		this._today = date.getMonth() === today.getMonth() && date.getDate() === today.getDate() && date.getFullYear() === today.getFullYear()
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
	get previousMonth() {
		return this._previousMonth
	}

	/**
	 * @readonly
	 * @type {boolean}
	 */
	get today() {
		return this._today
	}

}

export default Day
