const fs = require('fs');

module.exports = class PeopleService {
    constructor() {
        this.peoples = JSON.parse(fs.readFileSync(__dirname + '/people.json', 'utf8'));
    }

    updatePeople(id, people) {
        const pplToUpdate = this.peoples.find((ppl) => ppl.id === parseInt(id));
        if (!pplToUpdate) return null;
        return Object.assign(pplToUpdate, people);
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
