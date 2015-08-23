/* 
 Create a function that:
 *   **Takes** an array of animals
 *   Each animal has propeties `name`, `species` and `legsCount`
 *   **groups** the animals by `species`
 *   the groups are sorted by `species` descending
 *   **sorts** them ascending by `legsCount`
 *	if two animals have the same number of legs sort them by name
 *   **prints** them to the console in the format:

 ```
 ----------- (number of dashes is equal to the length of the GROUP_1_NAME + 1)
 GROUP_1_NAME:
 ----------- (number of dashes is equal to the length of the GROUP_1_NAME + 1)
 NAME has LEGS_COUNT legs //for the first animal in group 1
 NAME has LEGS_COUNT legs //for the second animal in group 1
 ----------- (number of dashes is equal to the length of the GROUP_2_NAME + 1)
 GROUP_2_NAME:
 ----------- (number of dashes is equal to the length of the GROUP_2_NAME + 1)
 NAME has LEGS_COUNT legs //for the first animal in the group 2
 NAME has LEGS_COUNT legs //for the second animal in the group 2
 NAME has LEGS_COUNT legs //for the third animal in the group 2
 NAME has LEGS_COUNT legs //for the fourth animal in the group 2
 ```
 *   **Use underscore.js for all operations**
 */
var _ = require('underscore');

function solve() {
    return function (animals) {
        var groupedAnimals = _.groupBy(animals, function (item) {
            return item.species;
        });

        var sortedGroupedAnimalsKeys = _.sortBy(_.keys(groupedAnimals), function (item) {
            return item;
        })
            .reverse();

        var sortedGroupedAnimalsValues = _.chain(sortedGroupedAnimalsKeys)
            .map(function (item) {
                return groupedAnimals[item];
            })
            .each(function (item, key, array) {
                array[key] = _.chain(item)
                    .sortBy(function (item) {
                        return item.name;
                    })
                    .sortBy(function (item) {
                        return item.legsCount;
                    })
                    .value();
            })
            .value();

        _.each(sortedGroupedAnimalsKeys, function (item, index) {
            console.log(_.map(new Array(item.length + 1), function () {
                return '-';
            })
                .join(''));

            console.log(item + ':');

            console.log(_.map(new Array(item.length + 1), function () {
                return '-';
            })
                .join(''));

            var currentGroup = sortedGroupedAnimalsValues[index];
            _.each(currentGroup, function (item) {
                console.log(item.name + ' has ' + item.legsCount + ' legs');
            })
        });
    };
}

// For debug purposes:
var animals = [{
    name: 'Minkov',
    species: 'Bogomolka',
    legsCount: 4
}, {
    name: 'Doncho',
    species: 'Centipede',
    legsCount: 201
}, {
    name: 'Komara',
    species: 'Mosquito',
    legsCount: 8
}];

solve()(animals);
module.exports = solve;
