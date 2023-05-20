import { Binding } from "domodel"

import EventEventListener from "./event.event.js"

export default class extends Binding {

	constructor(properties) {
		super(properties, new EventEventListener(properties.event))
	}

	onCreated() {

		const { planner, day } = this.properties

		this.identifier.editor.addEventListener("blur", () => {
			if(this.properties.event.title.trim() === "") {
				planner.calendar.events.emit("remove", { event: this.properties.event, day })
			}
		})

		this.identifier.editor.addEventListener("input", () => {
			planner.calendar.events.emit("update", { event: this.properties.event, form: { title: this.identifier.editor.textContent }, day })
		})

		this.identifier.time.addEventListener("input", event => {
			const date = event.target.valueAsDate
			date.setMonth(day.date.getMonth())
			date.setDate(day.date.getDate())
			date.setYear(day.date.getYear())
			planner.calendar.events.emit("update", { event: this.properties.event, form: { date }, day })
		})

	}

	onRendered() {
		this.identifier.editor.focus()
	}

}
