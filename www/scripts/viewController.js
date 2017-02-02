(function () {
    angular.module('starter').controller('viewController', ['$scope', '$ionicPlatform', 'DBService', OverviewController]);

    function OverviewController($scope, $ionicPlatform, DBService) {
        var vm = this;
        var n = 100;
        $ionicPlatform.ready(function () {
            //var fsPromise = DBService.fileSystemPromise;
            // Initialize the database.
            var fsPromise = DBService.initializeLocalStorage();
            fsPromise.promise.then(function () {
                // Get all birthday records from the database.
                var data = DBService.getAllData();
                vm.displayData = data;

                $scope.$on("refresh", function () {
                    var data = DBService.getAllData();
                    vm.displayData = data;
                });


                vm.insertValues = function () {
                    var data = DBService.getAllData();
                    n = data.length;
                    var values = insertData(n);
                    DBService.insertTestData(values);
                    DBService.saveDb();
                    $scope.$emit("refresh");
                }
            });

            
        });

        

        function insertData(n) {
            var insertingData = [];
            var iValue = n > 99 ? n : 0;
            var toValue = iValue + 100;
            for (var i = iValue ; i < toValue; i++) {
                var insertDataSet = {
                    Id: i, personId: i + 100, empId: i + 1000, name: i + '-TestPerson',
                    address: i + '-Address'
                };
                insertingData.push(insertDataSet);
            }

            return insertingData;
        }

        return vm;
    }
})();