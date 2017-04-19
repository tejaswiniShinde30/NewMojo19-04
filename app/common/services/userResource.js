(function () {
    angular.module('common.services')
        .factory('UserResource', UserResource);

    UserResource.$inject = ['$q', '$filter', '$timeout'];

    function UserResource($q, $filter, $timeout) {

        var randomsItems = [];
        var backUnabled = false;

        function createRandomItem(id) {
            var title = ['Batman', 'Superman', 'Robin', 'Thor', 'Hulk', 'Niki Larson', 'Stark', 'Bob Leponge'];
            var desc = ['Batman', 'Superman', 'Robin', 'Thor', 'Hulk', 'Niki Larson', 'Stark', 'Bob Leponge'];
            var img = ['Batman', 'Superman', 'Robin', 'Thor', 'Hulk', 'Niki Larson', 'Stark', 'Bob Leponge'];
            return {
                id: id,
                title: title[Math.floor(Math.random() * 7)],
                desc: desc[Math.floor(Math.random() * 7)],
                img: img[Math.floor(Math.random() * 7)],
                noOfUsersFollowing: Math.floor(Math.random() * 10000),
                 isDeleted:"Delete"
            };

        }
        
        function deleteInitiative(id){
             var deferred = $q.defer();
            angular.forEach(randomsItems, function(item, key) {
                if(item.id == id){
                    randomsItems.splice(id, 1);
                    debugger
                    item.isDeleted = "Deleted";
                    deferred.resolve("Success");
                }
                });
            return deferred.promise;
        }
        
        
        
        
        
        

        for (var i = 0; i < 1000; i++) {
            randomsItems.push(createRandomItem(i));
        }
        debugger

        //fake call to the server, normally this service would serialize table state to send it to the server (with query parameters for example) and parse the response
        //in our case, it actually performs the logic which would happened in the server
        function getPage(start, number, params) {

            var deferred = $q.defer();

            var filtered = params.search.predicateObject ? $filter('filter')(randomsItems, params.search.predicateObject) : randomsItems;

            if (params.sort.predicate) {
                filtered = $filter('orderBy')(filtered, params.sort.predicate, params.sort.reverse);
            }

            var result = filtered.slice(start, start + number);

            $timeout(function () {
                //note, the server passes the information about the data set size
                deferred.resolve({
                    data: result,
                    numberOfPages: Math.ceil(filtered.length / number)
                });
            }, 1500);


            return deferred.promise;
        }

        return {
            getPage: getPage,
            deleteInitiative:deleteInitiative
        };
    }

}());
