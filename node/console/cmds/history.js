module.exports = function() {
    retval = false;
    console.log();
    var a = 0;
    history.forEach(function (item) {
        console.log(++a+".\t"+item);
    });
    return false;
};
