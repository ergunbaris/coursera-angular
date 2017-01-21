(function (){
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController ($scope) {
    var ENJOY_MESSAGE = "Enjoy!";
    var TOO_MUCH_MESSAGE = "Too much!";
    var MISSING_DATA_MESSAGE = "Please enter data first";
    $scope.dishData = "";
    $scope.checkIfTooMuch = function () {
        if($scope.dishData){
          var commaTrimmedDishData = trimCommas($scope.dishData);
          var dishArray = commaTrimmedDishData.split(/,+/);
          if (dishArray.length <= 3){
              $scope.message = ENJOY_MESSAGE;
          } else{
              $scope.message = TOO_MUCH_MESSAGE;
          }
        } else{
          $scope.message = MISSING_DATA_MESSAGE;
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
