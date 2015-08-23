/*
 Create a function that:
 *   Takes an array of students
 *   Each student has a `firstName` and `lastName` properties
 *   **Finds** all students whose `firstName` is before their `lastName` alphabetically
 *   Then **sorts** them in descending order by fullname
 *   fullname is the concatenation of `firstName`, ' ' (empty space) and `lastName`
 *   Then **prints** the fullname of founded students to the console
 *   **Use underscore.js for all operations**
 */

function solve() {
    return function (students) {
        var filteredStudents = _.filter(students, function (item) {
            return item.firstName < item.lastName;
        });

        var sortedStudents = _.chain(filteredStudents)
            .sortBy('lastName')
            .sortBy('firstName')
            .value()
            .reverse();

        _.each(sortedStudents, function (item) {
            var fullName = item.firstName + ' ' + item.lastName;
            console.log(fullName);
        })
    };
}

module.exports = solve;