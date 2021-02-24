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
});

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
    it('GivenGreeting_WhenImproperProper_should POST a object', (done) => {
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

describe("/PUT  /greetings/:greetingId", function () {
    // test the PUT API when provided proper Id
    it("givenGreetings_WhenGivenProperId_ShouldUpdate_Greeting", (done) => {
        const greetingID = greet.greetings.greetingToUpdate.greetingId;
        const greeting = greet.greetings.greetingWithImproperName.greetingId7;
        chai
            .request(server)
            .put("/greetings/" + greetingID)
            .send(greeting)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("Object");
                done();
            });
    });

    // test the PUT API when provided improper Id
    it("givenGreetings_WhenNotGivenProperName_ShouldNotUpdate_Greeting", (done) => {
        const greetingID = greet.greetings.greetingWithImproperName.greetingId;
        const greeting = greet.greetings.greetingWithoutMessage.greetingId8;
        chai
            .request(server)
            .put("/greetings/" + greetingID)
            .send(greeting)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});