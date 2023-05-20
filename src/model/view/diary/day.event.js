import { EventListener } from "domodel"

/**
 * @global
 */
class DayEventListener extends EventListener {

	/**
	 * @event DayEventListener#updateIndicator
	 * @property {boolean} toggle
	 */
	updateIndicator(toggle) {
		if(toggle) {
			this.root.classList.add("content")
		} else {
			this.root.classList.remove("content")
		}
	}

	/**
	 * @event DayEventListener#select
	 */
	select() {
		this.root.classList.add("active")
	}

	/**
	 * @event DayEventListener#unselect
	 */
	unselect() {
		this.root.classList.remove("active")
	}

}

export default DayEventListener
