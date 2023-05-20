import { Binding } from "domodel"
import NextEventEventListener from "./next-event.event.js"

/**
 * @global
 */
class NextEventBinding extends Binding {

	constructor(properties) {
		super(properties, new NextEventEventListener(properties.event))
	}

	onCreated() {
		const { planner, event } = this.properties

	}

}

export default NextEventBinding
