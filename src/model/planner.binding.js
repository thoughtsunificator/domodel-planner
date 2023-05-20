import { Binding } from "domodel"

import PlannerViewEventListener from "./planner.event.js"

/**
 * @global
 */
class PlannerViewBinding extends Binding {

	/**
	 * @readonly
	 * @type {number}
	 */
	static INACTIVITY_TIMER_DELAY = (60 * 1000) * 15

	/**
	 * @param {object} properties
	 * @param {Planner}  properties.planner
	 */
	constructor(properties) {
		super(properties, new PlannerViewEventListener(properties.planner))
		this.textFileURL = null
		this.interval = null
		this.inactivity_timer_delay = this.properties.inactivity_timer_delay || PlannerViewBinding.INACTIVITY_TIMER_DELAY
	}

	onCreated() {

		const { planner } = this.properties

		this.listen(planner, "logout", () => {
			this.stopInactivityTimer()
		})

		this.root.ownerDocument.defaultView.addEventListener("click", () => {
			this.restartInactivityTimer()
		})

		this.root.ownerDocument.defaultView.addEventListener("input", () => {
			this.restartInactivityTimer()
		})

		this.identifier.export.addEventListener("click", () => planner.emit("export"))
		this.identifier.import.addEventListener("click", () => planner.emit("import"))
		this.identifier.calendarButton.addEventListener("click", () => {
			this.identifier.calendar.root.style.display = ""
			this.identifier.nextEvents.root.style.display = "none"
		})
		this.identifier.nextEventsButton.addEventListener("click", () => {
			this.identifier.calendar.root.style.display = "none"
			this.identifier.nextEvents.root.style.display = ""
		})

		this.startInactivityTimer()

	}

	startInactivityTimer() {
		this.interval = this.root.ownerDocument.defaultView.setInterval(() => this.properties.planner.emit("logout"), this.inactivity_timer_delay)
	}

	stopInactivityTimer() {
		this.root.ownerDocument.defaultView.clearInterval(this.interval)
	}

	restartInactivityTimer() {
		this.stopInactivityTimer()
		this.startInactivityTimer()
	}

}

export default PlannerViewBinding
