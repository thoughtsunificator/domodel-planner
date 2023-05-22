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

		calendar.emit("setDate", { date: calendar.date, rebuild: true })

	}

}

export default CalendarBinding
