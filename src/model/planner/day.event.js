import { EventListener } from "domodel"

/**
* @global
*/
class DayEventListener extends EventListener {

	/**
	* @event DayEventListener#eventAdded
	*/
	eventAdded() {
		this.root.classList.add("content")
	}

	/**
	* @event DayEventListener#eventRemoved
	*/
	eventRemoved() {
		if(!this.properties.planner.calendar.hasEvent(this.properties.day.date)) {
			this.root.classList.remove("content")
		}
	}

	/**
	* @event DayEventListener#eventUpdated
	*/

	/**
	* @event DayEventListener#select
	*/
	select() {
		// TODO add new Event with RTE and persist on blur if title is not empty
		this.root.classList.add("active")
		this.root.scrollIntoView()
	}

	/**
	* @event DayEventListener#unselect
	*/
	unselect() {
		this.root.classList.remove("active")
	}

}

export default DayEventListener
