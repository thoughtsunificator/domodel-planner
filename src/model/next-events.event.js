import { EventListener } from "domodel"
import NextEventBinding from "./next-event.binding.js"
import NextEventModel from "./next-event.js"

/**
 * @global
 */
class NextEventsEventListener extends EventListener {

	/**
	 * @event NextEventEventListener#added
	 */
	added(data) {
		this.run(NextEventModel(data.event), { binding: new NextEventBinding({ event: data.event }) })
	}

}

export default NextEventsEventListener
