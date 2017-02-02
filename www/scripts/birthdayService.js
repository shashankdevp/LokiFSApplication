(function () {

    var app = angular.module('starter');

    app.factory('DBService', function ($q, $ionicPlatform) {
        var localStorage = {
            OfflineStorage: null,
            Adapter: null,
            DbLoaded: false,
            fileSystemPromise: null,
            initializeLocalStorage: function () {
                var defLocal = $q.defer();
                var thisScope = this;
                $ionicPlatform.ready(function () {
                    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (fs) {
                        window.fs = fs.filesystem;
                        var baseDirectory = '';//cordova.file.dataDirectory;
                        var adapterFs = new FileSystemAdapter({
                            "base_dir": baseDirectory
                        });

                        var offlineDb = new loki("TestDB", { adapter: adapterFs });
                        thisScope.OfflineStorage = offlineDb;
                        offlineDb.loadDatabase({}, function () {
                            var testInititalized = offlineDb.getCollection('TestTable');
                            if (testInititalized === null) {
                                thisScope.createTables();
                                offlineDb.saveDatabase(function () {
                                    thisScope.DbLoaded = true;
                                    defLocal.resolve(true);
                                });
                            } else {
                                defLocal.resolve(true);
                            }
                        });
                    }, function (err) {
                        def.resolve(err);
                    });
                });
                //localStorage.fileSystemPromise = defLocal
                return defLocal;
            },
            createTables: function () {
                var offlineDb = this.OfflineStorage;

                var testCollection = offlineDb.addCollection('TestTable');

                if (testCollection === null) {
                    testCollection.insert({
                        Id: null, personId: -1, empId: null, name: null,
                        address: null,
                    });
                    questionnaireRecipientCollection.removeDataOnly();
                }
            },
            getAllData: function () {
                var offlineDb = this.OfflineStorage;

                var testCollection = offlineDb.getCollection('TestTable');

                var testData = testCollection.find({ 'Id': { '$gt': 0 } });
                return testData;
            },
            insertTestData: function (data) {
                var offlineDb = this.OfflineStorage;

                var testCollection = offlineDb.getCollection('TestTable');

                testCollection.insert(data);
            },
            saveDb: function () {
                var offlineDb = this.OfflineStorage;
                offlineDb.saveDatabase();
            }
        }
        return localStorage;
    });




})();