import * as extension from "./extension"
// @ponicode
describe("extension.activate", () => {
    test("0", () => {
        let callFunction: any = () => {
            extension.activate(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
