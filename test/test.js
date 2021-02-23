let mongoose = require("mongoose");
let Greetings = require('../app/models/greetings.js');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');

let should = chai.should();
chai.use(chaiHttp);
const greet = require("./greetings.json");

describe("Greetings API", () => {

    /**
     * @description Test the GET API
     */
    describe("GET /greetings", () => {

        // test the GET API when points are proper
        it("should get all the greetings", (done) => {
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
});

describe('/POST book', () => {
    it('it should not POST a book without pages field', (done) => {
        let greeting = {
            name: "Rajas",
            greeting: "hello"
        }
        chai.request(server)
            .post('/greeting')
            .send(greeting)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

});

describe("/GET /greetings/greetingId", () => {

    // test the GET API when provided proper greeting Id
    it("givenGreetings_WhenGivenProperGreetoingId_ShouldGive_object", (done) => {
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
        const greetingID = 144;
        chai
            .request(server)
            .get("/greeting/:greetingId" + greetingID)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });

    })

});