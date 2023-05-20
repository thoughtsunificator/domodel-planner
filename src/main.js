import "./main.css"

import { Core } from "domodel"
import Planner from "./object/planner.js"
import PlannerModel from "./model/planner.js"
import PlannerBinding from "./model/planner.binding.js"

import Persistence from "./persistence/persistence.js"

window.addEventListener("load", function() {

	const planner = new Planner()

	Persistence({ planner })

	Core.run(PlannerModel, {
		binding: new PlannerBinding({ planner }),
		parentNode: document.body
	})

})
