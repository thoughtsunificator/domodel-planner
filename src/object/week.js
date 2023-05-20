import { Observable } from "domodel"

/**
 * @global
 */
class Week extends Observable {

	/**
	 * @param {number} number
	 */
	constructor(number) {
		super()
		this._number = number
		this._days = []
	}

	/**
	 * @readonly
	 * @type {number}
	 */
	get number() {
		return this._number
	}

	/**
	 * @readonly
	 * @type {Day[]}
	 */
	get days() {
		return this._days
	}

}

export default Week
