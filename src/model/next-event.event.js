import { EventListener } from "domodel"

/**
 * @global
 */
class NextEventEventListener extends EventListener {

	updated() {
		this.identifier.title.textContent = this.properties.event.title
		// this.identifier.date.value = this.properties.event.date
	}

}

export default NextEventEventListener
