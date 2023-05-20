import { EventListener } from "domodel"

/**
 * @global
 */
class PlannerViewEventListener extends EventListener {

	/**
	 * @event PlannerViewEventListener#exported
	 *
	*/

	/**
	 * @event PlannerViewEventListener#imported
	 *
	*/

	/**
	 * @event PlannerViewEventListener#export
	 */
	export() {
		const { planner } = this.properties
		if (this.textFileURL !== null) {
			this.root.ownerDocument.defaultView.URL.revokeObjectURL(this.textFileURL)
		}
		const blob = new Blob( [ planner.calendar.events.toString() ], {
			type: "text/plain"
		})
		const date = new Date()
		this.textFileURL = URL.createObjectURL( blob )
		const anchor = this.root.ownerDocument.createElement("a")
		anchor.href = this.textFileURL
		anchor.download = `backup-domodel-planner-${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}.txt`
		anchor.click()
		planner.emit("exported")
	}

	/**
	 * @event PlannerViewEventListener#import
	 */
	import() {
		const { planner } = this.properties
		const inputFileNode = this.root.ownerDocument.createElement("input")
		inputFileNode.type = "file"
		inputFileNode.style.display = "none"
		inputFileNode.addEventListener("input", (event) => {
			const reader = new FileReader()
			reader.addEventListener("load", () => {
				try {
					const events = JSON.parse(reader.result)
					planner.calendar.events.emit("clear")
					events.forEach(item => planner.calendar.events.add(item.title, new Date(item.date)))
					planner.emit("imported")
				} catch(ex)  {
					console.error(ex)
					alert("Unable to import this backup.")
				}
			})
			reader.addEventListener("error", () => alert("Error reading file"))
			reader.readAsText(event.target.files[0], "UTF-8")
			inputFileNode.remove()
		})
		inputFileNode.click()
	}

	/**
	 * @event PlannerViewEventListener#openSettings
	 */
	openSettings() {
		this.popup.emit("show")
	}

}

export default PlannerViewEventListener
