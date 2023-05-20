import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, EventListener } from "domodel"

import WeekModel from "../../../src/model/view/diary/week.js"

import WeekBinding from "../../../src/model/view/diary/week.binding.js"

import WeekEventListener from "../../../src/model/view/diary/week.event.js"

import Diary from "../../../src/object/diary.js"


const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("WeekEventListener instance", (test) => {
	test.true(WeekEventListener.prototype instanceof EventListener)
})

test("WeekEventListener remove", (test) => {
	test.pass()
})

