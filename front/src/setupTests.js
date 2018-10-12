import fetch from "jest-fetch-mock"
import Adapter from "enzyme-adapter-react-16"
import {configure} from "enzyme"

// node-fetchをjest-fetch-mockでMockする
jest.setMock("node-fetch", fetch)
window.alert = console.log

configure({
    adapter: new Adapter()
})
