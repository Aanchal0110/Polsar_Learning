async function dashBoard(req, res) {
    console.log("from auth");
    res.end("Hi");
}

module.exports = {
    dashBoard,
}