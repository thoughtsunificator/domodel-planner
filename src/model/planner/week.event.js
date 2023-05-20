import { EventListener } from "domodel"

/**
 * @global
 */
class WeekEventListener extends EventListener {

	/**
	 * @event WeekEventListener#remove
	 */
	removed() {
		this.remove()
	}

}

export default WeekEventListener

