/**
 * @module       controllers
 * @file         greeting.js
 * @description  GreetingController class takes the request and sends response
 * @author       Rajas Dongre <itsmerajas2@gmail.com>
*  @since        15/02/2021  
-----------------------------------------------------------------------------------------------*/
const service = require('../services/greetings.js');
const Joi = require('joi');
const logger = require('../../logger/logger.js')

const ControllerDataValidation = Joi.object().keys({
    name: Joi.string().required(),
    greeting: Joi.string().required()
})

class GreetingController {
    /**
         * @description Create and save a new greeting
         * @param req is used to get the request
         * @param res is used to send resposne
         */

    create = (req, res,) => {
        try {
            const greeting = {
                name: req.body.name,
                greeting: req.body.greeting
            };
            const validation = ControllerDataValidation.validate(greeting);
            if (validation.error) {
                res.status(400).send({
                    success: false,
                    message: " should be a string"
                })
            } else {
                service.create(greeting, (err, result) => {
                    if (err) {
                        (logger.error("Some error occurred while creating greeting"),
                            res.status(500).send({
                                sucess: false,
                                message: "Some error occurred while creating the Note."
                            })
                        )
                    } else {
                        logger.info("Greeting added successfully !"),
                            res.status(200).send({
                                sucess: true,
                                message: "created greetings sucessfully",
                                result: result
                            });
                    }
                });
            }
        } catch (error) {
            logger.error("could not create greeting ");
            return res.send({
                success: false,
                status_code: 500,
                message: "error creating greeting "
            })
        }


    };

    /**
        * @description Find all the greeting
        * @method findAll is service class method
        * @param req is used to get the request
        *  @param res is used to send resposne
        */

    findAll = (req, res) => {
        try {
            service.findAll((err, result) => {
                if (err) {
                    (logger.error("Some error occurred while serching greeting"),
                        res.status(404).send({
                            sucess: false,
                            message: "could not find any entries"
                        })
                    )
                } else {
                    logger.info("Greeting found successfully !"),
                        res.status(200).send({
                            sucess: true,
                            message: "found greetings sucessfully",
                            result: result
                        })
                }
            })
        } catch (error) {
            logger.error("greeting not found");
            res.send({
                success: false,
                status_code: 500,
                message: `greeting not found`,
            });
        }
    };

    /**
        * @description Find greeting by id
        * @method findOne is service class method
        * @param req is used to get the request
        * @param res is used to send the response
        */

    findOne = (req, res) => {
        try {
            const greetingId = req.params.greetingId
            service.findOne(greetingId, (err, result) => {
                if (err) {
                    (logger.error("Some error occurred while serching greetingId" + req.params.greetingId),
                        res.status(500).send({
                            sucess: false,
                            message: "could not find the entry"
                        })
                    )
                } else {
                    logger.info("Greeting found successfully !"),
                        res.status(200).send({
                            sucess: true,
                            message: "found greetings sucessfully",
                            result: result
                        })
                }
            })
        } catch (error) {
            logger.error("could not found greeting with id" + req.params.greetingId);
            return res.send({
                success: false,
                status_code: 500,
                message: "error retrieving greeting with id " + req.params.greetingId
            })
        }
    }

    /**
    * @description Update greeting by id
    * @method update is service class method
    * @param res is used to send the response
    * @param req is used to get the request
    */

    update = (req, res) => {
        try {
            const greeting = {
                name: req.body.name,
                greeting: req.body.greeting,
                greetingID: req.params.greetingId
            }
            service.update(greeting, (err, result) => {
                if (err) {
                    logger.error("Error updating greeting with id : " + req.params.greetingId),
                        res.status(500).send({
                            sucess: false,
                            message: "could not find the entry"
                        })
                } else {
                    logger.info("Greeting updated successfully !"),
                        res.status(200).send({
                            sucess: true,
                            message: "found greetings sucessfully",
                            result: result
                        })
                }
            })
        } catch (error) {
            logger.error("could update greeting with id" + req.params.greetingId);
            return res.send({
                success: false,
                status_code: 500,
                message: "error updating greeting with id " + req.params.greetingId
            })
        };
    }

    /**
     * @description delete greeting with id
     * @method delete is service class method
     * @param res is used to send the response
     * @param req is used to get the request 
     */

    delete = (req, res) => {
        try {
            const greetingId = req.params.greetingId;
            service.delete(greetingId, (err, result) => {
                if (err) {
                    logger.error("Error deleting greeting with id : " + req.params.greetingId),
                        res.status(500).send({
                            success: false,
                            message: "greeting not found with id " + greetingID
                        })
                } else {
                    logger.info("Greeting deleted successfully !"),
                        res.status(200).send({
                            success: true,
                            message: "greeting deleted successfully!",
                            result: result
                        })
                }
            })
        } catch (error) {
            logger.error("could delete greeting with id" + req.params.greetingId);
            return res.send({
                success: false,
                status_code: 500,
                message: "error could not delete greeting with id " + req.params.greetingId
            })
        }
    }
}
module.exports = new GreetingController();