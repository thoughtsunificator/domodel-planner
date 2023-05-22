import { Binding } from 'domodel'

export default class extends Binding {
    
    onCreated() {
    
        const { diary } = this.properties
        
		const { calendar } = diary

        calendar.listen("setDate", (data) => {
            const date = new Date(data.date)
            this.identifier.month.selectedIndex = date.getMonth()
            this.identifier.year.value = date.getFullYear()
        })

		this.identifier.today.addEventListener("click", event => calendar.emit("setDate", { date: new Date() }))
		this.identifier.month.addEventListener("change", event => calendar.emit("setDate", { date: this.getCurrentMonthDate(), rebuild: true }))
		this.identifier.previousMonth.addEventListener("click", () => calendar.emit("setDate", { date: this.getPreviousMonthDate(), rebuild: true }))
		this.identifier.nextMonth.addEventListener("click", () => calendar.emit("setDate", { date: this.getNextMonthDate(), rebuild: true }))
		this.identifier.year.addEventListener("input", event => calendar.emit("setYear", event.target.value))
        
    }

    getDateByMonthIndex(month) {
		const date = this.properties.diary.calendar.date
		if(month > this.identifier.month.options.length - 1) {
			month = 0
			date.setYear(parseInt(this.identifier.year.value) + 1)
		} else if(month < 0) {
			month = 0
			date.setYear(this.identifier.year.value - 1)
		}
		date.setMonth(month)
		return date
	}

	/**
	 * @returns {Date}
	 */
	getNextMonthDate() {
		return this.getDateByMonthIndex(this.identifier.month.selectedIndex + 1)
	}

	/**
	 * @returns {Date}
	 */
	getPreviousMonthDate() {
		return this.getDateByMonthIndex(this.identifier.month.selectedIndex - 1)
	}

	getCurrentMonthDate() {
		return this.getDateByMonthIndex(this.identifier.month.selectedIndex)
	}

}