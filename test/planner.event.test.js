import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, EventListener } from "domodel"

import PlannerViewEventListener from "../src/model/view/planner.event.js"

import PlannerViewModel from "../src/model/view/planner.js"

import PlannerViewBinding from "../src/model/view/planner.binding.js"

import Planner from "../src/object/planner.js"


const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("PlannerViewEventListener instance", (test) => {
	test.true(PlannerViewEventListener.prototype instanceof EventListener)
})

test("PlannerViewEventListener export", (test) => {
	test.pass()
})

test("PlannerViewEventListener import", (test) => {
	test.pass()
})

test("PlannerViewEventListener openSettings", test => {
	return new Promise(resolve => {
		const planner = new Planner()
		const binding = new PlannerViewBinding({ planner })
		test.context.rootBinding.run(PlannerViewModel(), { binding })
		binding.popup.listen("show", () => {
			test.pass()
			resolve()
		})
	})
})
