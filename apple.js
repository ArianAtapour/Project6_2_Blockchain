// Function to count apples
function countApples(appleList) {
    var appleCounts = [];
    appleList.forEach(function (appleType) {
        var existingApple = appleCounts.find(function (a) { return a.type === appleType; });
        if (existingApple) {
            existingApple.count++;
        }
        else {
            appleCounts.push({ type: appleType, count: 1 });
        }
    });
    return appleCounts;
}
// Example usage
var appleList = ['Granny Smith', 'Fuji', 'Granny Smith', 'Fuji'];
var appleCounts = countApples(appleList);
console.log(appleCounts);
