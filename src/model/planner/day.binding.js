import { Binding } from "domodel"

import DayEventListener from "./day.event.js"

/**
 * @global
 */
class DayBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Planner}  properties.planner
	 * @param {Day}    properties.day
	 */
	constructor(properties) {
		super(properties, new DayEventListener(properties.day))
	}

	onCreated() {

		const { planner, day } = this.properties

		if(planner.calendar.hasEvent(day.date)) {
			this.root.classList.add("content")
		}

		this.root.addEventListener("click", () => {
			planner.calendar.emit("setDate", { date: day.date })
		})

	}

}

export default DayBinding
