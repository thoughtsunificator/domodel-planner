import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, EventListener } from "domodel"

import DayModel from "../../../src/model/view/diary/day.js"

import DayBinding from "../../../src/model/view/diary/day.binding.js"

import DayEventListener from "../../../src/model/view/diary/day.event.js"

import Diary from "../../../src/object/diary.js"
import Day from "../../../src/object/day.js"

const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("DayEventListener instance", (test) => {
	test.true(DayEventListener.prototype instanceof EventListener)
})

test("DayEventListener select", (test) => {
	const diary = new Diary()
	const day = new Day(new Date())
	const binding = new DayBinding({ diary, day })
	test.context.rootBinding.run(DayModel(day), { binding })
	day.emit("select")
	test.true(binding.root.classList.contains("active"))
})

test("DayEventListener unselect", (test) => {
	const diary = new Diary()
	const day = new Day(new Date())
	const binding = new DayBinding({ diary, day })
	test.context.rootBinding.run(DayModel(day), { binding })
	binding.root.classList.add("active")
	test.true(binding.root.classList.contains("active"))
	day.emit("unselect")
	test.false(binding.root.classList.contains("active"))
})
