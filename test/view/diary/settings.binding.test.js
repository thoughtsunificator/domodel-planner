import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import SettingsModel from "../../../src/model/view/diary/settings.js"

import SettingsBinding from "../../../src/model/view/diary/settings.binding.js"

import Diary from "../../../src/object/diary.js"

const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("SettingsBinding instance", (test) => {
	test.true(SettingsBinding.prototype instanceof Binding)
})

test("SettingsBinding onCreated", (test) => {
	const diary = new Diary()
	const binding = new SettingsBinding({ diary })
	test.context.rootBinding.run(SettingsModel, { binding })
	test.pass()
})

test("SettingsBinding export button click", (test) => {
	test.pass()
})

test("SettingsBinding import button click", (test) => {
	test.pass()
})

test("SettingsBinding logout button click", (test) => {
	test.pass()
})
