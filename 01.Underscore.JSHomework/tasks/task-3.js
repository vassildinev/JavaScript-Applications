/* 
 Create a function that:
 *   Takes an array of students
 *   Each student has:
 *   `firstName`, `lastName` and `age` properties
 *   Array of decimal numbers representing the marks
 *   **finds** the student with highest average mark (there will be only one)
 *   **prints** to the console  'FOUND_STUDENT_FULLNAME has an average score of MARK_OF_THE_STUDENT'
 *   fullname is the concatenation of `firstName`, ' ' (empty space) and `lastName`
 *   **Use underscore.js for all operations**
 */

function solve() {
    return function (students) {
        var topAverageMark = 0;
        var sortedStudents = _.sortBy(students, function (item) {
            var sumOfMarks = _.reduce(item.marks, function (sum, item) {
                return sum + item;
            });

            var averageMark = sumOfMarks / item.marks.length;
            if(averageMark > topAverageMark) {
                topAverageMark = averageMark;
            }

            return averageMark;
        });

        var topStudentIndex = sortedStudents.length - 1;
        var topStudent = sortedStudents[topStudentIndex];

        console.log(topStudent.firstName + ' ' + topStudent.lastName + ' has an average score of ' + topAverageMark);
    };
}

module.exports = solve;
