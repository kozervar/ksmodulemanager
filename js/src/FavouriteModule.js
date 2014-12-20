/**
 * Created by Marcin Kozaczyk on 2014-12-20.
 */

var module = angular.module('app.favourite', [
]);

module

    .controller('FavouriteCtrl', function FavouriteCtrl($scope, $http, CONST) {

        console.log("Favourite ctrl");
        var helper = new DBHelper(storedb);

        $scope.results = [];

        $scope.refresh = function () {
            try {
                $scope.results = helper.getAll(CONST.COLLECTION.FAVOURITE);
            }
            catch (err) {
                if (err === 'collection not exist') {
                    $scope.results = [];
                }
                else
                    console.log(err);
            }
        };


        $scope.removeFromFavourites = function (mod) {
            helper.remove(CONST.COLLECTION.FAVOURITE, { id: mod.id}, function () {
                console.log(mod.name + ' removed from favourites!');
                $scope.refresh();
            }, function (err) {
                console.log(err);
            })
        };

        // call
        $scope.refresh();
    })

;