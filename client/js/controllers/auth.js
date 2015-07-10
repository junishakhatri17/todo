todo.controller('loginController', ['$cookies', '$state', 'Customer', '$rootScope', '$scope', function($cookies, $state, User, $rootScope, $scope) {
    $scope.register = function() {
        console.log('register');
        $state.go('register');
    }

    $scope.user = {};
    $scope.user.email = "new@new.com";
    $scope.user.password = "new";

    $scope.login = function() {
         User.login({email: $scope.user.email, password: $scope.user.password})
         .$promise
         .then(function(response) {
            console.log(response);
             $rootScope.user = {
                 token : response.id,
                 id : response.userId,
                 name : response.user.name
             };
             
             $cookies.put('user', JSON.stringify($rootScope.user));
             
             $state.go('todo');
         },
              function(reason) {
            console.log(reason);
         });
    }
}])

.controller('registerController',['$state', 'Customer', '$scope', function($state, User, $scope) {
    $scope.user = {};
    $scope.user.name = "new";
    $scope.user.email = "new@new.com";
    $scope.user.password = "new";
    
    $scope.register = function() {
        User.create({name:$scope.user.name, email:$scope.user.email, password:$scope.user.password})
        .$promise
        .then(function(response) {
            console.log(response);
            
            // what to do after sign up
            $state.go('login');
        },
              function(reason) {
            console.log(reason);
            
            // error handling
        });  
    };
}]);
