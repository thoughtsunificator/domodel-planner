import { Binding } from 'domodel'

import EventModel from "./event.js"
import EventBinding from "./event.binding.js"

import EventsEventListener from "./events.event.js"

export default class extends Binding {

    /**
	 * @param {object}   properties
	 * @param {Diary}    properties.diary
	 * @param {Day}      properties.day
	 * @param {Calendar} properties.calendar
	 */
	constructor(properties) {
        super(properties, new EventsEventListener(properties.diary.calendar.events))
	}

    onCreated() {

        const { diary, day } = this.properties

        this.root.addEventListener("click", event => {
            if(event.target == this.root) {
                const event = diary.calendar.addEvent("", day.date)
                this.run(EventModel(event), { binding: new EventBinding({ event }) })
                diary.calendar.events.emit("added")
            }
        })

        for(const event of diary.calendar.events.byDate(day.date)) {
            this.run(EventModel(event), { binding: new EventBinding({ event }) })
        }
        
    }
}