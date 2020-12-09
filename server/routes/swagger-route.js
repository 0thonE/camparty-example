// import dependencies and initialize the express router
const express = require('express');
const swaggerUi = require('swagger-ui-express');

// const swaggerDoc = require('../config/swagger'); // replaced by the autodocumantation w/ comments
const swaggerJsDoc = require('swagger-jsdoc');

const router = express.Router();


require('dotenv').config()

const swaggerOptions = {
    swaggerDefinition: {
        swagger: "2.0",
        info: {
            "title": "Camp Party",
            "description": "This is a camping places reviewer",
            "termsOfService": "http://example.com/terms/",
            "contact": {
                "name": "Othón Escandón",
                "email": "is708135@iteso.mx"
            },
            "version": "1.0.0"
        },
        servers: [`http://localhost:${5000}`],
        components: {}

    },
    apis: ['server/routes/health-route.js', 'server/routes/user-routes.js', 'server/routes/api-routes.js', 'server/routes/swagger-route.js'],
    tags: ['camp']
}


const swaggerDoc = swaggerJsDoc(swaggerOptions)


// define routes
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDoc));

////////////////////////////////////////////////////////////////////////////////////
////////////////////////    All Model definitions   ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * definitions:
 *   Camp:
 *     type:  object
 *     properties:
 *       _id:
 *         type:  string
 *         definition: Is the camping place id
 *         example:  5fcbc892299a5b10b4acf6dd
 *       name: 
 *         type:  string
 *         definition: Is the camping place id
 *         example: Campamento Lazlo
 *       description:
 *         type:  string
 *         definition: Is the camping place id
 *         example: Esta es una descripción ejemplo
 *       price: 
 *         type:  string
 *         definition: Is the camping place id
 *         example:  324
 *       more: 
 *         type:  string
 *         definition: Is the camping place id
 *         example:  baños etc...
 *       userId:
 *         type:  string
 *         definition: Is the camping place id
 *         example: 5fcbcc61299a5b10b4acf6e1
 *       rateCount:
 *         type:  number
 *         definition: Is the camping place id
 *         example: 1
 *       rateValue: 
 *         type:  number
 *         definition: Is the camping place id
 *         example: 10
 *       loc:
 *         type:  object
 *         properties:
 *           "type": 
 *             type: string
 *             example: Point
 *           coordinates:
 *             type:  array
 *             definition: Is the camping place coordentates
 *             items:
 *               type:  string
 *               example: latitud, longitud
 */

////////////////////////////////////////////////////////////////////////////////////
//////////////////////// All Components definitions ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * components:
 *   schemas:
 *     Camp:
 *       type:  object
 *       properties:
 *         name: 
 *           type:  string
 *           definition: Is the camping place id
 *           example: Campamento Lazlo
 *         description:
 *           type:  string
 *           definition: Is the camping place description and info
 *           example: Esta es una descripción ejemplo
 *         price: 
 *           type:  string
 *           definition: an estimate of how much you could spend
 *           example:  324
 *         more: 
 *           type:  string
 *           definition: some characteristics of the place
 *           example:  baños etc...
 *         userId:
 *           type:  string
 *           definition: The id of the user that added this place 
 *           example: 5fcbcc61299a5b10b4acf6e1
 *         rateCount:
 *           type:  number
 *           definition: how many it has been rated
 *           example: 1
 *         rateValue: 
 *           type:  number
 *           definition: the sum of all the rates it has recived
 *           example: 10
 *         loc:
 *           type:  object
 *           properties:
 *             "type": 
 *               type: string
 *               definition: the type of object that will be created (for location)
 *               example: Point
 *             coordinates:
 *               type:  array
 *               definition: Is the camping place coordentates
 *               items:
 *                 type:  string
 *                 example: latitud, longitud
 *     
 */



module.exports = router;
