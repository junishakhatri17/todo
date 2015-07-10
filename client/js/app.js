/*var todo = angular.module('todo', ['ui.router']);
console.log('app.js');
todo.config(function($stateProvider, $urlRouterProvider) {
        console.log('config');
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginController'
            });
                 
        $urlRouterProvider.otherwise('login');
    });
todo.run(function($state) {
        console.log('run');
        $state.go('login');
    });*/
var todo = angular
  .module('todo', [
    'ngCookies',
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
      console.log('config');
    $stateProvider
        .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginController'
          })
        .state('register', {
                url: '/register',
                templateUrl: 'views/register.html',
                controller: 'registerController'
        })
        .state('todo', {
                url: '/todo',
                templateUrl: 'views/todo.html',
                controller: 'taskController',
                authenticate: true
        });
    $urlRouterProvider.otherwise('login');
  }])
.run(['$cookies', '$rootScope', '$state', function($cookies, $rootScope, $state) {
    
    $rootScope.user = $cookies.get('user');
    
    $rootScope.$on('$stateChangeStart', function(event, next) {
        // redirect to login page if not logged in
        if (next.authenticate && !$rootScope.user) {
            event.preventDefault(); //prevent current page from loading
            $state.go('login');
        }
    })
}])
.controller("MainControl", ['$state', function($state, $scope) {
    console.log("runs");
    $state.go('login');
}]);
