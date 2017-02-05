(function () {
  'use strict';

  angular.module('NarrowItDownApp', []).
  controller('NarrowItDownController',NarrowItDownController).
  service('MenuSearchService', MenuSearchService).
  filter('searchTerm', SearchTermFilter).
  directive('foundItems', FoundItemsDirective).
  constant('MenuApiBasePath', "https://davids-restaurant.herokuapp.com").
  constant('MenuApiMenuItemsPath', "/menu_items.json");

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var narrow = this;

    narrow.searchTerm = "";
    narrow.getMatchedMenuItems = function()
      {
      if (narrow.searchTerm)
        {
        var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
        promise.then(function (response)
          {
          narrow.isEmpty = response.length === 0;
          narrow.found = response;
          }).catch(function (error)
          {
          console.log(error.message);
          });
        }
      else
        {
        narrow.found = [];
        narrow.isEmpty = true;
        }
      };
    narrow.removeFromList = function(index)
      {
      narrow.found.splice(index,1);
      }
  }

  MenuSearchService.$inject = ['$http',
                               '$filter',
                               'MenuApiBasePath',
                               'MenuApiMenuItemsPath',
                               'searchTermFilter'];
  function MenuSearchService($http,
                             $filter,
                             MenuApiBasePath,
                             MenuApiMenuItemsPath,
                             searchTermFilter){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm)
      {
      return $http({method: "GET",
                    url: (MenuApiBasePath + MenuApiMenuItemsPath)}).
        then(function (result)
          {
          return $filter('searchTerm')(result.data.menu_items, searchTerm);
          });
      };
  }

function FoundItemsDirective()
  {
  var ddo = {
    templateUrl: 'foundItemsList.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'found',
    bindToController: true
  };
  return ddo;
  }

function FoundItemsDirectiveController()
  {
  var foundItems = this;
  }


function SearchTermFilter(){
  return function(input, searchTerm){
    var output = [];
    if (searchTerm)
      {
      angular.forEach(input,
        function (item)
          {
          if (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
            {
            output.push(item)
            }
          }
        );
      }
    else
      {
      output = input;
      }
  return output;
  };
}
})();
