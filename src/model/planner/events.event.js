import { EventListener } from "domodel"

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
	* @property {Day}     data.day
	*/
	add(data) {
		if(this.properties.day === data.day) {
			const event = this.properties.planner.calendar.addEvent(data.title, data.date)
			this.run(EventModel(event), { binding: new EventBinding({ event }) })
			this.properties.planner.calendar.events.emit("added", { event,  day: data.day })
		}
	}

	/**
	* @event EventsEventListener#remove
	* @property {object} data
	* @property {Event}  data.event
	* @property {Day}    data.day
	*/
	remove(data) {
		this.properties.planner.calendar.removeEvent(data.event)
		data.event.emit("removed")
		this.properties.planner.calendar.events.emit("removed", { event: data.event, day: data.day })
	}

	/**
	* @event EventsEventListener#update
	* @property {object} data
	* @property {Event}  data.event
	* @property {Day}    data.day
	* @property {object} data.form
	*/
	update(data) {
		this.properties.planner.calendar.updateEvent(data.event, data.form)
		data.event.emit("updated")
		this.properties.planner.calendar.events.emit("updated", { event: data.event, day: data.day })
	}

	/**
	*
	*/
	clear() {
		for(const event of this.properties.planner.calendar.events.list) {
			const day = this.properties.planner.calendar.getDayByDate(event.date)
			this.properties.planner.calendar.events.emit("remove", { event, day })
		}
	}

	/**
	* @event EventsEventListener#added
	* @property {object} data
	* @property {Event}  data.event
	* @property {Day}    data.day
	*/
	added(data) {
		data.day.emit("eventAdded")
	}

	/**
	* @event EventsEventListener#removed
	* @property {object} data
	* @property {Event}  data.event
	* @property {Day}    data.day
	*/
	removed(data) {
		if(data.day) {
			data.day.emit("eventRemoved")
		}
	}

	/**
	* @event EventsEventListener#updated
	* @property {object} data
	* @property {Event}  data.event
	* @property {Day}    data.day
	*/
	updated(data) {
		data.day.emit("eventUpdated")
	}

}

export default EventsEventListener

