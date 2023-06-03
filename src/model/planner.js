import CalendarModel from "./planner/calendar.js"

import CalendarBinding from "./planner/calendar.binding.js"

export default {
	tagName: "div",
	id: "planner",
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
}
