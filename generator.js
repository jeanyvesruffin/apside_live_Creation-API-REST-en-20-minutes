// Exemple de generation de 1000 peoples avec les attributs ci-dessous dans 100 entreprises
module.exports = function () {
    let faker = require("faker/locale/fr");
    let _ = require("lodash");
    return {
        peoples: _.times(1000, (n) => {
            return {
                id: n,
                name: faker.name.findName(),
                job: faker.name.jobTitle(),
                mail: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
                avatar: faker.internet.avatar(),
                companyId: faker.random.number(99)
            }
        }),
        companies: _.times(100, (n) => {
            return {
                id: n,
                name: faker.company.companyName(),
                catchPhrase: faker.company.catchPhrase(),
            }
        })
    }
}
