import { EventListener } from "domodel"

/**
 * @global
 */
class EventEventListener extends EventListener {

	/**
	 * @event EventEventListener#removed
	 */
	removed() {
		this.remove()
	}
}

export default EventEventListener

