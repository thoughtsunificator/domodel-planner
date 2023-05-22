import { EventListener } from "domodel"

/**
 * @global
 */
class DayEventListener extends EventListener {

	/**
	 * @event DayEventListener#select
	 */
	select() {
		// TODO add new Event with RTE and persist on blur if title is not empty
		// this.root.classList.add("active")
	}

	/**
	 * @event DayEventListener#unselect
	 */
	unselect() {
		// this.root.classList.remove("active")
	}

}

export default DayEventListener
