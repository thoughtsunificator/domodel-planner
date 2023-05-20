export default {
	tagName: "div",
	id: "calendar",
	style: "display: grid; grid-template-rows: auto auto 1fr; height: 100%",
	children: [
		{
			tagName: "h2",
			identifier: "date",
			style: "text-align: center; padding: 10px 0"
		},
		{
			tagName: "div",
			style: "display: grid; grid-gap: 15px; grid-auto-flow: column;justify-content: center;",
			children: [
				{
					tagName: "div",
					children: [
						{
							tagName: "button",
							identifier: "today",
							textContent: "↩️"
						},
					]
				},
				{
					tagName: "div",
					style: "display: grid; grid-auto-flow: column",
					children: [
						{
							tagName: "div",
							style: "display: grid; grid-auto-flow: column",
							children: [
								{
									tagName: "button",
									identifier: "previousMonth",
									textContent: "←"
								},
								{
									tagName: "select",
									identifier: "month",
									children: [
										{
											tagName: "option",
											value: 1,
											textContent: "January"
										},
										{
											tagName: "option",
											value: 2,
											textContent: "February"
										},
										{
											tagName: "option",
											value: 3,
											textContent: "March"
										},
										{
											tagName: "option",
											value: 4,
											textContent: "April"
										},
										{
											tagName: "option",
											value: 5,
											textContent: "May"
										},
										{
											tagName: "option",
											value: 6,
											textContent: "June"
										},
										{
											tagName: "option",
											value: 7,
											textContent: "July"
										},
										{
											tagName: "option",
											value: 8,
											textContent: "August"
										},
										{
											tagName: "option",
											value: 9,
											textContent: "September"
										},
										{
											tagName: "option",
											value: 10,
											textContent: "October"
										},
										{
											tagName: "option",
											value: 11,
											textContent: "November"
										},
										{
											tagName: "option",
											value: 12,
											textContent: "December"
										}
									]
								},
								{
									tagName: "button",
									identifier: "nextMonth",
									textContent: "→"
								},
							]
						},
						{
							tagName: "input",
							type: "number",
							identifier: "year"
						},
					]
				}
			]
		},
		{
			tagName: "table",
			identifier: "body",
			className: "margin-top",
			style: "table-layout:fixed; width: 100%",
			children: [
				{
					tagName: "tr",
					children: [
						{
							tagName: "th",
							className: "day-header padding-2xs",
							textContent: "Sun"
						},
						{
							tagName: "th",
							className: "day-header padding-2xs",
							textContent: "Mon"
						},
						{
							tagName: "th",
							className: "day-header padding-2xs",
							textContent: "Tue"
						},
						{
							tagName: "th",
							className: "day-header padding-2xs",
							textContent: "Wed"
						},
						{
							tagName: "th",
							className: "day-header padding-2xs",
							textContent: "Thu"
						},
						{
							tagName: "th",
							className: "day-header padding-2xs",
							textContent: "Fri"
						},
						{
							tagName: "th",
							className: "day-header padding-2xs",
							textContent: "Sat"
						}
					]
				}
			]
		}
	]
}
