import { EventListener } from "domodel"

/**
 * @global
 */
class DiaryEventListener extends EventListener {

	/**
	 * @event DiaryEventListener#login
	 * @property {string} password
	 *
	*/

	/**
	 * @event DiaryEventListener#reset
	 */
	reset() {
		const { diary } = this.properties
		diary.firstRun = true
	}

}

export default DiaryEventListener
