import { Observable } from "domodel"


/**
 * @global
 */
class Day extends Observable {

	/**
	 * @param {Date} date
	 */
	constructor(date, nextOrPreviousMonth=false) {
		super()
		this._date = date
		this._nextOrPreviousMonth = nextOrPreviousMonth
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
	get nextOrPreviousMonth() {
		return this._nextOrPreviousMonth
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
