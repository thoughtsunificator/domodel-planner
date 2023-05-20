import { Binding } from "domodel"
import NextEventBinding from "./next-event.binding.js"
import NextEventModel from "./next-event.js"
import NextEventsEventListener from "./next-events.event.js"

/**
 * @global
 */
class NextEventsBinding extends Binding {

	constructor(properties) {
		super(properties, new NextEventsEventListener(properties.planner.calendar.events))
	}

	onCreated() {
		const { planner } = this.properties

		for(const event of planner.calendar.getNextEvents()) {
			this.run(NextEventModel(event), { binding: new NextEventBinding({ event }) })
		}
	}

}

export default NextEventsBinding
