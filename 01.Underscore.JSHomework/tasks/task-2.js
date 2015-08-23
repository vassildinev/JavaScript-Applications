/*
 Create a function that:
 *   Takes an array of students
 *   Each student has a `firstName`, `lastName` and `age` properties
 *   **finds** the students whose age is between 18 and 24
 *   **prints**  the fullname of found students, sorted lexicographically ascending
 *   fullname is the concatenation of `firstName`, ' ' (empty space) and `lastName`
 *   **Use underscore.js for all operations**
 */

function solve() {
    return function (students) {
        var filteredStudents = _.filter(students, function (item) {
            return item.age >= 18 && item.age <= 24;
        });

        var sortedStudents = _.chain(filteredStudents)
            .sortBy('lastName')
            .sortBy('firstName')
            .value();

        _.each(sortedStudents, function (item) {
            console.log(item.firstName + ' ' + item.lastName);
        })
    };
}

module.exports = solve;
