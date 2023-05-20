import { Observable } from "domodel"

class App extends Observable {

	/**
	 * @param {string} message
	 */
	constructor(message) {
		super()
		this._message = message
	}

	/**
	 * @type {string}
	 */
	get message() {
		return this._message
	}

}

export default App
