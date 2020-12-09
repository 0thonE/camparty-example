const Joi = require('joi');

/****************************************************************************************************
 

    This class verifies that the camp object has the needed properties for it to be used in the db & 
    checks that they are valid as expected, in case it doesnt comply with one of this conditions 
    it will throw an error with a message.

    The properties of the class:

        userId: string              - required      |   id of the user creating the camp
        name: string                - required      |   name of the camp area/place
        description: string         - required      |   a description / info about the camping place
        more: string                - optional      |   more info, "bullet points", EG. how many bathrooms, theres a lake...
        price: string               - optional      |   how much is expected to be spended ($xx- $xxxx)
        loc: object                 - optional      |   localization point
            type: string            - required ILE  |   "Point" defines the obj type
            coordinates: array      - required ILE  |   an array of the coordinates
                latitud: string     - required ILE  |   the latitud of place
                longitud: stirng    - required ILE  |   the longitud of the place  
        rateCount: integer          - not required  |   how many ratings has recived
        rateValue: integer          - not required  |   the sum of all ratings

       ** 
        ILE : If Loc Exists (is required if loc is used)
    rateCount & rateValue should be setted by no one but the class. It can be missing, but not empty.

 *****************************************************************************************************/

class Camp {

    // define all camp object properties and requirements to meet
    schema = Joi.object().keys({
        userId: Joi.string().trim().required(),
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        more: Joi.string().trim().allow(''),
        price: Joi.string().trim().allow(''),
        rateCount: Joi.number().min(0).integer(),
        rateValue: Joi.number(),
        loc: Joi.object({
            type: Joi.string().trim(),
            coordinates: Joi.array().length(2).items(Joi.string())
        }).allow("")
    });


    constructor({ userId, name, description, more, price, loc, rateCount, rateValue }) {
        let temp = { userId, name, description, more, price, loc, rateCount, rateValue }
        let status = this.validate(temp)
        if (!status.valid)
            throw status.msg;

        this.props = { ...temp };

        if (!this.props.more) this.props.more = "";
        if (!this.props.price) this.props.price = "";
        // if (!this.props.loc) this.props.loc = {type: "Point", coordinates: ["",""]};

        this.props.rateCount = 0;
        this.props.rateValue = 0;


    }


    validate = (camp) => {
        let v = (this.schema.validate(camp).error) ? false : true

        return {
            valid: v,
            msg: (!v) ? this.schema.validate(camp).error.details[0].message : 'is a valid camp'
        };
    }

    getCamp = () => {
        return this.props
    }

}


module.exports = Camp;