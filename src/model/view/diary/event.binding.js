import { Binding } from 'domodel'

export default class extends Binding {
    
    onCreated() {
    
        const { diary, event, day } = this.properties

        this.identifier.editor.addEventListener("input", () => {
            event.title = this.identifier.editor.textContent
        })

        this.identifier.time.addEventListener("input", event => {
            const date = event.target.valueAsDate
            date.setMonth(day.date.getMonth())
            date.setDate(day.date.getDate())
            date.setYear(day.date.getYear())
            event.date = date
        })
        
    }

    onRendered() {
        this.identifier.editor.focus()
    }

}