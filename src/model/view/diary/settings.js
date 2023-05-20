import { PopupModel } from "@domodel/popup"

export default PopupModel({
	tagName: "div",
	id: "settings",
	style: "display: contents",
	children: [
		{
			tagName: "button",
			textContent: "Export",
			identifier: "export"
		},
		{
			tagName: "button",
			textContent: "Import",
			identifier: "import"
		},
		{
			tagName: "button",
			textContent: "Logout",
			identifier: "logout"
		}
	]
})
