import { Binding } from "domodel"

import DayModel from "./day.js"
import DayBinding from "./day.binding.js"

import WeekEventListener from "./week.event.js"

/**
 * @global
 */
class WeekBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Diary}  properties.diary
	 * @param {Day}    properties.week
	 */
	constructor(properties) {
		super(properties, new WeekEventListener(properties.week))
	}

	onCreated() {

		const { diary, week } = this.properties

		for(const day of week.days) {
			this.run(DayModel(day), { binding: new DayBinding({ day }) })
		}

	}

}

export default WeekBinding
