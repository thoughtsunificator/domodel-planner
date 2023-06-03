export default {
    tagName: "div",
    className: "date-browser",
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
            className: "controls",
            children: [
                {
                    tagName: "div",
                    children: [
                        {
                            tagName: "button",
                            identifier: "previousMonth",
                            textContent: "←"
                        },
                        {
                            tagName: "select",
                            identifier: "month",
                            children: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => ({
                                tagName: "option",
                                value: index + 1,
                                textContent: month
                            }))
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
}