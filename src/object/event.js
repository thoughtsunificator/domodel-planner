import { Observable } from "domodel"

/**
 * @global
 */
class Event extends Observable {

	/**
	 * @param  {string} title
	 * @param  {Date}   date
	 */
	constructor(title, date) {
		super()
		this._title = title
		this._date = date
	}

	/**
	 * @type {string}
	 */
	get title() {
		return this._title
	}

	set title(title) {
		this._title = title
	}

	/**
	 * @readonly
	 * @type {Date}
	 */
	get date() {
		return this._date
	}

}

export default Event
