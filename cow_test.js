var expect = chai.expect;

describe("Cow", () => {

    let sandbox

    beforeEach(() => {
        // create a sandbox
        sandbox = sinon.sandbox.create()

        // stub some console methods
        sandbox.stub(window.console, "log")
        sandbox.stub(window.console, "error")
    })

    afterEach(() => {
        // restore the environment as it was before
        sandbox.restore()
    })

    describe("construct", () => {
        it("should have a default name", () => {
            const cow = new Cow()
            expect(cow.name).to.equal("Anon cow")
        })

        it("should set cow's name if provided", () => {
            const cow = new Cow("Kate")
            expect(cow.name).to.equal("Kate")
        })
    })

    describe("#greets", () => {
        it("should throw if no target it passed in", () => {
            expect(() => {
                (new Cow()).greets()
            }).to.throw(Error)
        })

        it("should greet passed target", () => {
            const greetings = (new Cow("Kate")).greets("Baby")
            expect(greetings).to.equal("Kate greets Baby")
        })
    })

    describe("#lateGreets", function() {
        it("should pass an error if no target is passed", function(done) {
            (new Cow()).lateGreets(null, function(err, greetings) {
                expect(err).to.be.an.instanceof(Error)
                done()
            })
        })

        it("should greet passed target after one second", function(done) {
            (new Cow("Kate")).lateGreets("Baby", function(err, greetings) {
                expect(greetings).to.equal("Kate greets Baby")
                done()
            })
        })
    })

    describe("#logGreets", () => {
        it("should log an error if no target is passed in", () => {
            (new Cow()).logGreets()

            sinon.assert.notCalled(console.log)
            sinon.assert.calledOnce(console.error)
            sinon.assert.calledWithExactly(console.error, "missing target")
        })
    })
})
