const express = require('express');
const PeopleService = require('./people-service');
const peopleService = new PeopleService();
const app = express();
const bodyParser = require('body-parser');
const v1 = express.Router();
const httpStatus = require("http-status-codes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1', v1);

v1.get('/people', async (request, response) => {
    let filters = request.query;
    let people = await peopleService.getPeople(filters);
    response.send(people);
});


v1.put('/people/:id', async (request, response) => {
    let id = request.params.id;
    let body = request.body;

    try{
        const result = await peopleService.updatePeople(id, body);
        !result ? response.sendStatus(httpStatus.NOT_FOUND) : response.sendStatus(httpStatus.OK);
    }catch (e) {
        console.log('error occurs : ', e);
        response.sendStatus(httpStatus.BAD_REQUEST)
    }
});

module.exports = app;
