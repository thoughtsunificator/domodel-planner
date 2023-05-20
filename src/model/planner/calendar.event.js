import { EventListener } from "domodel"

import WeekModel from "./week.js"

import WeekBinding from "./week.binding.js"

/**
* @global
*/
class CalendarEventListener extends EventListener {

	/**
	* @event CalendarEventListener#setDate
	* @property {object}  data
	* @property {Date}    data.date
	* @property {boolean} data.rebuild
	* @example calendar.emit("setDate", { date: new Date() })
	*/
	setDate(data) {
		const { planner } = this.properties
		const { calendar } = planner

		const date = new Date(data.date)
		this.identifier.date.textContent = date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
		if(calendar.date.getMonth() !== date.getMonth() || calendar.date.getFullYear() !== date.getFullYear()
		|| calendar.weeks.length === 0 || data.rebuild) {
			if(calendar.weeks !== null) {
				calendar.weeks.forEach(week => week.emit("removed"))
			}
			calendar.build(date)
			for(const week of calendar.weeks) {
				this.run(WeekModel, { parentNode: this.identifier.weeks, binding: new WeekBinding({ week }) })
			}
		} else if(calendar.weeks !== null) {
			calendar.weeks.map(week => week.days).flat().forEach(day => day.emit("unselect")) // TODO only unselect other days
		}
		calendar.setDate(date)
		calendar.day.emit("select") // TODO do not select if already selected
	}

	/**
	* @event CalendarEventListener#setYear
	* @property {number} year
	*/
	setYear(year) {
		const { planner } = this.properties
		const { calendar } = planner

		const date = new Date(calendar.date)
		date.setYear(year)
		calendar.emit("setDate", { date })
	}

}

export default CalendarEventListener
