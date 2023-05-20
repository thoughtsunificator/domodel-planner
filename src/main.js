import "./main.css"

import { Core } from "domodel"
import Diary from "./object/diary.js"
import DiaryModel from "./model/diary.js"
import DiaryBinding from "./model/diary.binding.js"

import Persistence from "./persistence/persistence.js"

window.addEventListener("load", function() {

	const diary = new Diary()

	Persistence({ diary })

	Core.run(DiaryModel, {
		binding: new DiaryBinding({ diary }),
		parentNode: document.body
	})

})