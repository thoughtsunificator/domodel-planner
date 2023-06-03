import { Binding } from 'domodel'

import EventModel from "./event.js"
import EventBinding from "./event.binding.js"

import EventsEventListener from "./events.event.js"

export default class extends Binding {

    /**
	 * @param {object}   properties
	 * @param {Planner}    properties.planner
	 * @param {Day}      properties.day
	 * @param {Calendar} properties.calendar
	 */
	constructor(properties) {
        super(properties, new EventsEventListener(properties.planner.calendar.events))
	}

    onCreated() {

        const { planner, day } = this.properties

        this.root.addEventListener("click", event => {
            if(event.target == this.root) {
                const event = planner.calendar.addEvent("", day.date)
                this.run(EventModel(event), { binding: new EventBinding({ event }) })
                planner.calendar.events.emit("added")
            }
        })

        for(const event of planner.calendar.events.byDate(day.date)) {
            this.run(EventModel(event), { binding: new EventBinding({ event }) })
        }
        
    }
}