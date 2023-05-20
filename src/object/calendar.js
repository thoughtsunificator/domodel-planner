import { Observable } from "domodel"

/**
 * @global
 */
class Calendar extends Observable {

	/**
	 * @param   {Date} date
	 */
	constructor(date) {
		super()
		this._date = date
		this._weeks = null
		this._day = null
	}

	/**
	 * @type {Date}
	 */
	get date() {
		return this._date
	}

	set date(date) {
		this._date = date
	}

	/**
	 * @type {Day}
	 */
	get day() {
		return this._day
	}

	set day(day) {
		this._day = day
	}

	/**
	 * @type {Week[]}
	 */
	get weeks() {
		return this._weeks
	}

	set weeks(weeks) {
		this._weeks = weeks
	}

}

export default Calendar
