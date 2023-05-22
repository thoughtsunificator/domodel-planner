import { Binding } from "domodel"

import DiaryViewEventListener from "./diary.event.js"

import Diary from "../../object/diary.js"

/**
 * @global
 */
class DiaryViewBinding extends Binding {

	/**
	 * @readonly
	 * @type {number}
	 */
	static INACTIVITY_TIMER_DELAY = (60 * 1000) * 15

	/**
	 * @param {object} properties
	 * @param {Diary}  properties.diary
	 * @param {Router} properties.router
	 */
	constructor(properties) {
		super(properties, new DiaryViewEventListener(properties.router.view))
		this.textFileURL = null
		this.interval = null
		this.inactivity_timer_delay = this.properties.inactivity_timer_delay || DiaryViewBinding.INACTIVITY_TIMER_DELAY
	}

	onCreated() {

		const { diary, router } = this.properties

		let menuOpened = false

		this.listen(diary, "logout", () => {
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

		this.identifier.export.addEventListener("click", (() => router.view.emit("export")))
		this.identifier.import.addEventListener("click", (() => router.view.emit("import")))

		this.startInactivityTimer()

	}

	startInactivityTimer() {
		this.interval = this.root.ownerDocument.defaultView.setInterval(() => this.properties.diary.emit("logout"), this.inactivity_timer_delay)
	}

	stopInactivityTimer() {
		this.root.ownerDocument.defaultView.clearInterval(this.interval)
	}

	restartInactivityTimer() {
		this.stopInactivityTimer()
		this.startInactivityTimer()
	}

}

export default DiaryViewBinding
