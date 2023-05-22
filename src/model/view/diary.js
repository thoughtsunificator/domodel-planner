import CalendarModel from "./diary/calendar.js"

import CalendarBinding from "./diary/calendar.binding.js"

export default data => ({
	tagName: "div",
	id: "diary",
	style: "display: contents",
	children: [
		{
			tagName: "div",
			id: "navigation",
			identifier: "navigation",
			children: [
				{
					tagName: "button",
					identifier: "menuButton",
					title: "Menu",
					textContent: "⚙️",
				},
				{
					tagName: "div",
					className: "menu",
					identifier: "menu",
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
						}
					]
				}
			]
		},
		{
			model: CalendarModel,
			binding: CalendarBinding
		}
	]
})
