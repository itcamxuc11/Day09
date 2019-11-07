angular.module('firstApp', [])
    .controller('userController', function ($scope, $http) {
        var vm = this;
        vm.message = "Data binding";
        $http.get("/api/users")
            .success(function (data) {
                if (data) {
                    vm.user = data;
                }
            })
            .error(function (data, status) {
                console.log(data);
            });
    });