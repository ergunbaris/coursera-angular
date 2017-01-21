(function (){
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController ($scope) {
    $scope.dishData = "";

    $scope.checkIfTooMuch = function () {
        if($scope.dishData){
          var commaTrimmedDishData = trimCommas($scope.dishData);
          var dishArray = commaTrimmedDishData.split(/[\s*,\s*]+/);
          if (dishArray.length <= 3){
              $scope.info = "Enjoy!"
          } else{
              $scope.info = "Too much!"
          }
        } else{
          $scope.info = "Please enter data first"
        }
    };

    // removes meaningless commas in the beginning and end of string
    function trimCommas(string){
      // TODO: Doing it in one regexp is kind of tricky but worths a try
      return string.replace(/^[\s*,\s*]*/, "")
                   .replace(/[\s*,\s*]*$/, "");
    }
  }
})();
