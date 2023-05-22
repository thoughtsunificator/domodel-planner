import { Observable } from "domodel"

import Event from "./event.js"

/**
 * @global
 */
class Events extends Observable {

	constructor() {
		super()
		this._list = []
	}

	/**
	 * @param {string} title
	 * @param {Date}   date
	 */
	add(title, date) {
		const event = new Event(title, date)
		this.list.push(event)
		return event
	}

	/**
	 * @param {Event} event
	 */
	remove(event) {
		this.list.splice(this.list.indexOf(event), 1)
	}

	/**
	 * @param {Event} event
	 * @param {object} data
	 */
	update(event, data) {
		for(const key in data) {
			event[key] = data[key]
		}
	}

	/**
	 * @return {Event[]}
	 */
	byDate(date) {
		return this.list.filter(event => event.date.getMonth() === date.getMonth() && event.date.getFullYear() === date.getFullYear() && event.date.getDate() === date.getDate())
	}

	/**
	 *
	 */
	clear() {
		this._list = []
	}

	/**
	 * @type {Event[]}
	 */
	get list() {
		return this._list
	}

	/**
	 * @returns {string}
	 */
	toString() {
		return JSON.stringify(this.list.map(event => ({ // TODO
			title: event.title,
			date: event.date
		})))
	}

}

export default Events
