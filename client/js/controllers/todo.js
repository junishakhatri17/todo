todo.controller('taskController', ['$state', 'Customer', 'Task', '$rootScope', '$scope', function($state, User, Task, $rootScope, $scope) {
    
    $scope.tasks = [];
    
    $scope.sampleTask = {
        title: 'title',
        description: 'description',
        deadline: 'deadline',
        checked: false,
        selected: false
    };
    
//    $scope.tasks.push($scope.sampleTask);
    
    $scope.logout = function() {
        User.logout({access_token:$rootScope.user.token})
        .$promise
        .then(function(response) {
            console.log('logout', response);
            $rootScope.user = null;
            $state.go('login');
        }, function(reason) {
            console.log('logout', reason);
        });
    }
    
    $scope.addNew = function() {
        $scope.newTask.checked = false;
        $scope.newTask.selected = false;
        
        $scope.tasks.push($scope.newTask);
        
        Task.create({
          "title": $scope.newTask.title,
          "description": $scope.newTask.description,
          "date-creation": new Date(),
          "deadline": $scope.newTask.deadline,
          "completed": $scope.newTask.checked,
          "customerId": $rootScope.user.id
        })
        .$promise
        .then(function(response) {
            console.log('addNew', response);
        }, function(reason) {
            console.log('addNew', reason);
        });
    }
}]);
