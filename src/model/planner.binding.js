import { Binding } from "domodel"

import PlannerViewEventListener from "./planner.event.js"

import Planner from "../object/planner.js"

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

		let menuOpened = false

		this.listen(planner, "logout", () => {
			this.stopInactivityTimer()
		})

		this.root.ownerDocument.defaultView.addEventListener("click", () => {
			this.restartInactivityTimer()
		})

		this.root.ownerDocument.defaultView.addEventListener("input", () => {
			this.restartInactivityTimer()
		})

		this.identifier.menuButton.addEventListener("click", () => {
			if (menuOpened) {
				this.identifier.menu.classList.remove("opened")
			} else {
				this.identifier.menu.classList.add("opened")
			}
			menuOpened = !menuOpened
		})

		this.identifier.export.addEventListener("click", (() => planner.emit("export")))
		this.identifier.import.addEventListener("click", (() => planner.emit("import")))

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
