
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');

let should = chai.should();
chai.use(chaiHttp);
const greet = require("./greetings.json");

/**
 * @description Test the GET API
 */

describe("Testing Greetings API", () => {

    describe("GET /greetings", () => {

        it("givenGreeting_whenProper_should get all the greetings", (done) => {
            console.log("getting all data .");
            chai
                .request(server)
                .get("/greeting")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });

    })
    describe('/POST book', () => {
        it('GivenGreeting_WhenProper_should POST a object', (done) => {
            const greeting = greet.greetings.greetingToPost
            chai.request(server)
                .post('/greeting')
                .send(greeting)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('GivenGreeting_WhenImproperProper_shouldGiveStatusError', (done) => {
            const greeting = greet.greetings.improperGreetingToPost
            chai.request(server)
                .post('/greeting')
                .send(greeting)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

    describe("/GET /greetings/greetingId", () => {

        it("givenGreetings_WhenGivenProperGreetingId_ShouldGive_object", (done) => {
            const greetingId = greet.greetings.getGreetingById.greetingId
            chai
                .request(server)
                .get("/greeting/:greetingId" + greetingId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        })

        it("givenGreetings_WhenNotGivenProperGreetoingId_ShouldNotGive_object", (done) => {
            const greetingID = 23;
            chai
                .request(server)
                .get("/greeting/:greetingId" + greetingID)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        })

    });

    describe("/PUT  /greetings/:greetingId", () => {

        it("givenGreetings_WhenGivenProperId_ShouldUpdateGreeting", (done) => {
            const greetingID = greet.greetings.greetingToUpdate.greetingId;
            chai
                .request(server)
                .put("/greeting/:greetingId" + greetingID)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("Object");
                    done()
                })
        })

        it("givenGreetings_WhenGivenImproperId_ShouldNotUpdate_Greeting", (done) => {
            const greetingID = null
            chai
                .request(server)
                .put("/greeting/:greetingId" + greetingID)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a("Object");
                    done()
                })
        })
    })

    describe("/Delete  /greetings/:greetingId", () => {

        it("givenGreetings_WhenGivenProperId_ShouldDeleteGreeting", (done) => {
            const greetingID = greet.greetings.greetingToUpdate.greetingId;
            chai
                .request(server)
                .delete("/greeting/:greetingId" + greetingID)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("Object");
                    done()
                })
        })
    })

    it("givenGreetings_WhenGivenProperId_ShouldNotDeleteGreeting", (done) => {
        const greetingID = greet.greetings.greetingToDelete.greetingId;
        chai
            .request(server)
            .delete("/greetings/:greetingId" + greetingID)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("Object");
                done()
            })
    })
})