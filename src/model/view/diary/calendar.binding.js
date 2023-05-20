import { Binding } from "domodel"

import CalendarEventListener from "./calendar.event.js"

/**
 * @global
 */
class CalendarBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Diary}  properties.diary
	 */
	constructor(properties) {
		super(properties, new CalendarEventListener(properties.diary.calendar))
	}

	onCreated() {

		const { diary } = this.properties

		const { calendar } = diary

		this.listen(diary, "imported", () => {
			calendar.emit("setDate", { date: calendar.date, rebuild: true })
		})

		this.identifier.today.addEventListener("click", event => calendar.emit("setDate", { date: new Date() }))
		this.identifier.month.addEventListener("change", event => calendar.emit("setDate", { date: this.getCurrentMonthDate(), rebuild: true }))
		this.identifier.previousMonth.addEventListener("click", () => calendar.emit("setDate", { date: this.getPreviousMonthDate(), rebuild: true }))
		this.identifier.nextMonth.addEventListener("click", () => calendar.emit("setDate", { date: this.getNextMonthDate(), rebuild: true }))
		this.identifier.year.addEventListener("input", event => calendar.emit("setYear", event.target.value))

		calendar.emit("setDate", { date: calendar.date, rebuild: true })

	}

	getDateByMonthIndex(month) {
		const date = this.properties.diary.calendar.date
		if(month > this.identifier.month.options.length - 1) {
			month = 0
			date.setYear(parseInt(this.identifier.year.value) + 1)
		} else if(month < 0) {
			month = 0
			date.setYear(this.identifier.year.value - 1)
		}
		date.setMonth(month)
		return date
	}

	/**
	 * @returns {Date}
	 */
	getNextMonthDate() {
		return this.getDateByMonthIndex(this.identifier.month.selectedIndex + 1)
	}

	/**
	 * @returns {Date}
	 */
	getPreviousMonthDate() {
		return this.getDateByMonthIndex(this.identifier.month.selectedIndex - 1)
	}

	getCurrentMonthDate() {
		return this.getDateByMonthIndex(this.identifier.month.selectedIndex)
	}

}

export default CalendarBinding
