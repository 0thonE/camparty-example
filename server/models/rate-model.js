const Joi = require('joi');

/****************************************************************************************************
 

    This class verifies that the rate object has the needed properties for it to be used in the db & 
    checks that they are valid as expected, in case it doesnt comply with one of this conditions 
    it will throw an error with a message.

    The properties of the class:

        userId: string      - required      | the id of the user that commented
        campId: string      - required      | the camp that it was commented to
        value: integer      - required      | the value of the rate provided by the user (0-10)
        commentId: string   - optional      | if it's related with a comment
        date: date          - not required  | is set by the class


    Most of the properties can't be empty '', length = 0, the only exception is commentId
    date should be setted by no one but the class. It can be missing, but not empty.

 *****************************************************************************************************/

class Rate {

    // define all rate object properties and requirements to meet
    schema = Joi.object().keys({
        userId: Joi.string().trim().required(),
        campId: Joi.string().trim().required(),
        value: Joi.number().min(0).max(10).required(),
        commentId: Joi.string().trim().allow(''),
        date: Joi.date()
    })


    constructor({ userId, campId, commentId, value, date }) {
        let temp = { userId, campId, commentId, value, date }
        let status = this.validate(temp)
        if (!status.valid)
            throw status.msg;

        this.props = { ...temp };

        if(!this.props.commentId) this.props.commentId="";  
        this.props.date = new Date();


    }


    validate = (rate) => {
        let v = (this.schema.validate(rate).error) ? false : true

        return {
            valid: v,
            msg: (!v) ? this.schema.validate(rate).error.details[0].message : 'is a valid rate'
        };
    }

    getRate = () => {
        return this.props
    }


}


module.exports = Rate;