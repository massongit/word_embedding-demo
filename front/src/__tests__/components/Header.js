import React from "react"
import Header from "../../components/Header"
import {shallow} from "enzyme"

describe("components/Header", () => {
    it("『Word2Vec』という文字が含まれている", () => {
        expect(shallow(
            <Header/>
        ).children().contains("Word2Vec")).toBeTruthy()
    })
})
