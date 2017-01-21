(function (){
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController ($scope) {
    // All the constants below could be declared in a separate constants js
    // module
    var ENJOY_MESSAGE = "Enjoy!";
    var TOO_MUCH_MESSAGE = "Too much!";
    var MISSING_DATA_MESSAGE = "Please enter data first";
    var VALID_COLOR = "green";
    var INVALID_COLOR = "red";

    $scope.dishData = "";
    $scope.checkIfTooMuch = function () {
        if($scope.dishData){
          var commaTrimmedDishData = trimCommas($scope.dishData);
          var dishArray = commaTrimmedDishData.split(/(?:\s*,+)+/);
          if (dishArray.length <= 3){
              $scope.message = ENJOY_MESSAGE;
          } else{
              $scope.message = TOO_MUCH_MESSAGE;
          }
          $scope.myStyle = getStyleWithColor(VALID_COLOR);
        } else{
          $scope.message = MISSING_DATA_MESSAGE;
          $scope.myStyle = getStyleWithColor(INVALID_COLOR);
        }
    };

    // removes meaningless commas in the beginning and end of string
    function trimCommas(string){
      // TODO: Doing it in one regexp is kind of tricky but worths a try
      return string.replace(/^[\s*,\s*]*/, "")
                   .replace(/[\s*,\s*]*$/, "");
    }

    function getStyleWithColor(color){
      return {"color" : color,
              "border-style": "solid",
              "border-color": color};
    }
  }
})();
