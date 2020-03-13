const _ = require('lodash');

const estates = [
    {
        name: '興民邨',
        blocks: ['民逸樓', '民澤樓', '民富樓'],
        floors: 45,
        units: 15,
    },
    {
        name: '興華一邨',
        blocks: ['興翠樓', '卓華樓', '美華樓'],
        floors: 38,
        units: 21,
    },
    {
        name: '戲院大廈',
        blocks: ['戲院大廈'],
        floors: 27,
        units: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    },
    {
        name: '華泰大廈',
        blocks: ['華泰大廈'],
        floors: 23,
        units: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    },
];

const getAddresses = () => {
    const rows = [];
    estates.forEach((estate) => {
        estate.blocks.forEach((block) => {
            _.times(estate.floors, (floor) => floor + 1).forEach((floor) => {
                const units = typeof estate.units ===  "number" ? _.times(estate.units, (unit) => _.padStart(String(unit), 2, '0')) : estate.units;
                units.forEach((unit) => {
                    let address = {
                        estate: estate.name,
                        block,
                        floor,
                        unit,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    };
                    rows.push(address);
                })
            })
        })
    });
    return rows;
};

module.exports = {
    getAddresses,
};