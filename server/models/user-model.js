const Joi = require('joi');
const crypto = require('crypto');

/****************************************************************************************************
 

    This class verifies that the user has the needed properties for it to be used in the db & 
    checks that they are valid as expected, in case it doesnt comply with one of this conditions 
    it will throw an error with a message.

    The properties of the class:

        usern: string                   - required | is the username 
        email: string w/ email format   - required | users email
        pwd: string 8-25 characters     - optional | the users password (depending on the login methods he has)
        pToken: string                  - optional | the google auth token (depending on the login methods he has)


    None of the properties can be empty '', length = 0.
    pwd & pToken are optional as long as there is at least one of them. They can be missing, but not empty.

 *****************************************************************************************************/

const emailLoginSchema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    pwd: Joi.string().min(8).max(25),
});

const usernLoginSchema = Joi.object().keys({
    usern: Joi.string().trim().required(),
    pwd: Joi.string().min(8).max(25),
});
const emailAuthSchema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    pToken: Joi.string().min(8).max(25),
});

const usernAuthSchema = Joi.object().keys({
    usern: Joi.string().trim().required(),
    pToken: Joi.string().min(8).max(25),
});


class User {

    // define all user properties and requirements to meet
    userSchema = Joi.object().keys({
        usern: Joi.string().trim().required(),
        email: Joi.string().trim().email().required(),
        pwd: Joi.string().min(8).max(25),
        pToken: Joi.string()
    }).or('pwd', 'pToken');

  


    constructor({ usern, email, pwd, pToken }) {
        let temp = { usern, email, pwd, pToken }
        let status = this.validate(temp)
        if (!status.valid)
            throw status.msg;

        this.props = { ...temp };

        if (this.props.pwd) {
            this.props.pwd = this.priv_encrypt(this.props.pwd);
            this.props.pToken="";
        }

        if (this.props.pToken) {
            this.props.pToken = this.priv_encrypt(this.props.pToken);
            this.props.pwd="";
        }

    }


    validate = (user) => {
        let v = (this.userSchema.validate(user).error) ? false : true

        return {
            valid: v,
            msg: (!v) ? this.userSchema.validate(user).error.details[0].message : 'is a valid user'
        };
    }

    priv_encrypt = (pwd) => {
        return crypto.scryptSync(pwd, 'salt', 24).toString('hex');
    }
    
    getUser = () => {
        return this.props
    }

    static encrypt = (pwd) => {
        return crypto.scryptSync(pwd, 'salt', 24).toString('hex');
    }

    static validateLogin = (user) => {
        let schema = (user.usern )?
                ((user.pwd)?usernLoginSchema:usernAuthSchema)
                :((user.pwd)?emailLoginSchema:emailAuthSchema);
        let v = (schema.validate(user).error) ? false : true
        return {
            valid: v,
            msg: (!v) ? schema.validate(user).error.details[0].message : 'is a valid user'
        };
    }

}

module.exports = User;