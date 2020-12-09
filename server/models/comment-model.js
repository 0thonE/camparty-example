const Joi = require('joi');

/****************************************************************************************************
 

    This class verifies that the comment object has the needed properties for it to be used in the db & 
    checks that they are valid as expected, in case it doesnt comply with one of this conditions 
    it will throw an error with a message.

    The properties of the class:

        userId: string      - required      | the id of the user that commented
        comment: string     - required      | the comment
        campId: string      - required      | the camp that it was commented to
        usern: string       - optional      | user's name commenting
        likes: integer      - not required  | is set by the class 
        date: date          - not required  | is set by the class


    usern empty '' or missing.
    likes & date should be setted by no one but the class. They can be missing, but not empty.

 *****************************************************************************************************/

class Comment {

    // define all comment object properties and requirements to meet
    schema = Joi.object().keys({
        userId: Joi.string().trim().required(),
        comment: Joi.string().trim().required(),
        campId: Joi.string().trim().required(),
        usern: Joi.string().trim(),
        likes: Joi.number().min(0).max(0).integer(),
        date: Joi.date()
    })


    constructor({ userId,usern,comment,campId,likes,date }) {
        let temp = { userId,usern,comment,campId,likes,date }
        let status = this.validate(temp)
        if (!status.valid)
            throw status.msg;

        this.props = { ...temp };
        this.props.usern= (usern)?usern:"Anónimo";
        this.props.likes=0;
        this.props.date= new Date();


    }

    validate = (comment) => {
        let v = (this.schema.validate(comment).error) ? false : true

        return {
            valid: v,
            msg: (!v) ? this.schema.validate(comment).error.details[0].message : 'is a valid comment'
        };
    }

    getComment = () => {
        return this.props
    }

}


module.exports = Comment;