import { EventListener } from "domodel"
import Event from "../../../object/event.js"

import EventModel from "./event.js"
import EventBinding from "./event.binding.js"

/**
 * @global
 */
class EventsEventListener extends EventListener {

	/**
	 * @event EventsEventListener#add
     * @property {object}  data
	 * @property {string}  data.title
	 * @property {Date}    data.date
	 */
	addEvent(data) {
		if(this.properties.day.date == data.day) {
			const event = new Event(data.title, data.date)
			this.run(EventModel(event), { binding: new EventBinding({ event }) })
		}
	}
	/**
	 * @event EventsEventListener#save
     * @property {object}  data
	 * @property {string}  data.title
	 * @property {Date}    data.date
	 */
	save(data) {
        this.properties.diary.calendar.events.emit("add", data)
	}

}

export default EventsEventListener

