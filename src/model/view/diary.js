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
					identifier: "menu",
					title: "Menu",
					className: "menu",
					textContent: "⚙️",
				},
			]
		},
		{
			tagName: "div",
			className: "content",
			identifier: "content",
			style: "display: contents",
			children: [
				{
					model: CalendarModel,
					binding: CalendarBinding
				}
			]
		}
	]
})
