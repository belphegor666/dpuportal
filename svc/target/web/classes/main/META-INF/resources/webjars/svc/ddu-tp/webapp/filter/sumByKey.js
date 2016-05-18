/**
 * TODO needs comment
 */
angular.module('app').filter('sumByKey', function () {
    return function (data, key) {
        if (typeof (data) === 'undefined' && typeof (key) === 'undefined') {
            return 0;
        }
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += isNaN(parseInt(data[i][key])) ? 0 : parseInt(data[i][key]);
        }
        return sum;
    }
});