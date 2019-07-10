var friendsData = require ("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    })

    app.post("api/friends", function (req, res) {
        // friendsData.push(req.body);
           // change scores from strings to numbers  
    req.body.scores = req.body.scores.map(Number);
    
    // find closest matching friend
    var differences = []
    friendsData.forEach(friend => {
        var totalDifference = 0;
        console.log(friend);
        for(var i=0; i<req.body.scores.length; i++ ){
            totalDifference += Math.abs(req.body.scores[i]-friend.scores[i]);
        };
        differences.push(totalDifference);
    });
    var closestFriend = friendsData[differences.indexOf(Math.min.apply(null, differences))];
    console.log(closestFriend);

    // push on to friends array and send
    friendsData.push(req.body);
    res.send(closestFriend);
    })
}