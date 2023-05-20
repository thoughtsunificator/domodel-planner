import { Observable } from "domodel"

import Week from "./week.js"
import Day from "./day.js"
import Events from "./events.js"

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
		this._weeks = []
		this._day = null
		this._events = new Events()
		this.build(date)
	}

	getDayByDate(date) {
		return this.weeks.map(week => week.days).flat().find(day => day.date.getDate() === date.getDate() && day.date.getMonth() === date.getMonth())
	}

	build(date) {
		this.weeks = []
		const daysCount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
		const firstDay = new Date(date.getFullYear(), date.getMonth())
		const days = [...Array(daysCount).keys()]
		let week = new Week(1)
		for(let i =firstDay.getDay(); i > 0;i--) {
			const previousMonthDate = new Date(date)
			previousMonthDate.setMonth(date.getMonth() - 1)
			const previousMonthDaysCount = new Date(previousMonthDate.getFullYear(), previousMonthDate.getMonth() + 1, 0).getDate()
			previousMonthDate.setDate(previousMonthDaysCount - i + 1)
			week.days.push(new Day(previousMonthDate, true))
		}
		for(let i = 1; i < days.length + 1; i++) {
			const dayDate = new Date(date)
			dayDate.setDate(i)
			week.days.push(new Day(dayDate))
			if(week.days.length === 7 || i === days.length) {
				this.weeks.push(week)
				week = new Week(week.number + 1)
			}
		}
		const lastWeek = this.weeks[this.weeks.length -1]
		const lastWeekDaysCount = lastWeek.days.length
		const lastWeekAvailableSlots = 7 - lastWeekDaysCount
		for(let i = 0; i < lastWeekAvailableSlots;i++) {
			const nextMonthDate = new Date(date)
			nextMonthDate.setMonth(date.getMonth() + 1)
			nextMonthDate.setDate(i + 1)
			lastWeek.days.push(new Day(nextMonthDate, true))
		}
	}

	/**
	 *
	 * @param {Date} date
	 */
	setDate(date) {
		this.date = date
		this.day = this.getDayByDate(date)
	}

	/**
	 *
	 * @param {string} title
	 * @param {Date} date
	 */
	addEvent(title, date) {
		return this.events.add(title, date)
	}

	/**
	 *
	 * @param {Event} event
	 */
	removeEvent(event) {
		return this.events.remove(event)
	}

	/**
	 *
	 * @param {object} data
	 * @param {Event}  data.event
	 * @param {object} data.form
	 */
	updateEvent(event, form) {
		return this.events.update(event, form)
	}

	/**
	 *
	 * @param {Date} date
	 */
	hasEvent(date) {
		return this.events.byDate(date).length >= 1
	}

	getNextEvents() { // TODO rename upcoming
		return this.events.next()
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

	/**
	 * @readonly
	 * @type {Events}
	 */
	get events() {
		return this._events
	}

}

export default Calendar
