import { EventListener } from "domodel"

/**
 * @global
 */
class DiaryViewEventListener extends EventListener {

	/**
	 * @event DiaryViewEventListener#exported
	 *
	*/

	/**
	 * @event DiaryViewEventListener#imported
	 *
	*/

	/**
	 * @event DiaryViewEventListener#export
	 */
	export() {
		const { diary } = this.properties
		if (this.textFileURL !== null) {
			this.root.ownerDocument.defaultView.URL.revokeObjectURL(this.textFileURL)
		}
		const blob = new Blob( [ diary.events.toString() ], {
			type: "text/plain"
		})
		const date = new Date()
		this.textFileURL = URL.createObjectURL( blob )
		const anchor = this.root.ownerDocument.createElement("a")
		anchor.href = this.textFileURL
		anchor.download = `backup-domodel-diary-${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}.txt`
		anchor.click()
		diary.emit("exported")
	}

	/**
	 * @event DiaryViewEventListener#import
	 */
	import() {
		const { diary } = this.properties
		const inputFileNode = this.root.ownerDocument.createElement("input")
		inputFileNode.type = "file"
		inputFileNode.style.display = "none"
		inputFileNode.addEventListener("input", (event) => {
			const reader = new FileReader()
			reader.addEventListener("load", () => {
				try {
					// const bytes = CryptoES.AES.decrypt(reader.result, diary.password)
					// const decryptedData = JSON.parse(bytes.toString(CryptoES.enc.Utf8))
					// diary.events.emit("clear")
					decryptedData.forEach(event => diary.events.add(event.content, new Date(event.date)))
					diary.emit("imported")
				} catch(ex)  {
					console.error(ex)
					alert("Unable to import this backup. It might be due to the current password not matching with the backup.")
				}
			})
			reader.addEventListener("error", () => alert("Error reading file"))
			reader.readAsText(event.target.files[0], "UTF-8")
			inputFileNode.remove()
		})
		inputFileNode.click()
	}

	/**
	 * @event DiaryViewEventListener#openSettings
	 */
	openSettings() {
		this.popup.emit("show")
	}

}

export default DiaryViewEventListener
