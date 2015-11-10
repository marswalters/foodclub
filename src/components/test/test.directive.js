angular.module('foodClubApp')
    .directive('name', function() {
        return {
            restrict: 'E',
            controller: testController,
            controllerAs: 'vm',
            templateUrl: 'components/test/test.html'
        };
    });

function testController() {
    var vm = this;
    vm.name = "Shiner";
}
