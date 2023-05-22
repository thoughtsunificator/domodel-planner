import { Binding } from "domodel"

import DayEventListener from "./day.event.js"

/**
 * @global
 */
class DayBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Diary}  properties.diary
	 * @param {Day}    properties.day
	 */
	constructor(properties) {
		super(properties, new DayEventListener(properties.day))
	}

	onCreated() {

		const { diary, day } = this.properties

		if(diary.calendar.events.byDate(day.date).length >= 1) {
			this.root.classList.add("content")
		}

		this.root.addEventListener("click", () => diary.calendar.emit("setDate", { date: day.date }))

	}

}

export default DayBinding
