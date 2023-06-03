import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, EventListener } from "domodel"

import WeekEventListener from "../../src/model/view/planner/week.event.js"


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

