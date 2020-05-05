const fs = require('fs');

module.exports = class PeopleService {
    constructor() {
        this.peoples = JSON.parse(fs.readFileSync(__dirname + '/people.json', 'utf8'));
    }

    updatePeople(id, people) {
        let peopleIdx = this.peoples.indexOf(this.peoples.filter(person => person.id === id))
        this.peoples[peopleIdx] = people;
        fs.writeFile(__dirname + '/people.json', JSON.stringify(this.peoples), error => {
            error ? console.log(error) : '';
        });
    }

    getPeople(filters = null) {
        if (filters === null) return this.peoples;
        const allFilterKeys = Object.keys(filters);
        return this.getPeople().filter(ppl => {
            return allFilterKeys.every(key => {
                return filters[key] === ppl[key]
            });
        });
    }
}
