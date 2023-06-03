import { Binding } from "domodel"

import CalendarEventListener from "./calendar.event.js"

/**
 * @global
 */
class CalendarBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Planner}  properties.planner
	 */
	constructor(properties) {
		super(properties, new CalendarEventListener(properties.planner.calendar))
	}

	onCreated() {

		const { planner } = this.properties

		const { calendar } = planner

		this.listen(planner, "imported", () => {
			calendar.emit("setDate", { date: calendar.date, rebuild: true })
		})

		calendar.emit("setDate", { date: calendar.date, rebuild: true })

	}

}

export default CalendarBinding
