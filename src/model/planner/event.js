export default event => ({
	tagName: "div",
	className: "event",
	children: [
		{
			tagName: "div",
			className: "editor",
			contentEditable: true,
			identifier: "editor",
			textContent: event.title,
			children: [
				{
					tagName: "br",
				},
				{
					tagName: "input",
					style: "width: 100%; margin-top: 10px",
					identifier: "time",
					type: "time"
				}
			]
		}
	]
})
