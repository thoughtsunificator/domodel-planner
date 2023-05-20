import { Binding } from "domodel"
import { PopupBinding } from "@domodel/popup"

/**
 * @global
 */
class SettingsBinding extends PopupBinding {

	/**
	 * @param {object} properties
	 * @param {Diary}  properties.diary
	 * @param {Popup}  properties.popup
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		super.onCreated()

		const { diary, popup, router } = this.properties

		this.identifier.export.addEventListener("click", (() => router.view.emit("export")))
		this.identifier.import.addEventListener("click", (() => router.view.emit("import")))
		this.identifier.logout.addEventListener("click", (() => diary.emit("logout")))

	}

}

export default SettingsBinding
