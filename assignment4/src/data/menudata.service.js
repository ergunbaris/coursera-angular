(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('MenuApiBasePath', "https://davids-restaurant.herokuapp.com")
.constant('MenuApiCategoriesPath', "/categories.json")
.constant('MenuApiMenuItemsPath', "/menu_items.json")
.constant('MenuApiParams', "?category=");

MenuDataService.$inject = ['$http', 'MenuApiBasePath', 'MenuApiCategoriesPath',
                           'MenuApiMenuItemsPath', 'MenuApiParams'];
function MenuDataService($http,
                         MenuApiBasePath,
                         MenuApiCategoriesPath,
                         MenuApiMenuItemsPath,
                         MenuApiParams){
  var service = this;

  service.getAllCategories = function()
    {
    return $http({method: "GET",
                  url: (MenuApiBasePath + MenuApiCategoriesPath)}).
      then(function (result)
        {
        return result.data;
        });
    };
  service.getItemsForCategory = function(categoryShortName)
    {
    return $http({method: "GET",
                  url: (MenuApiBasePath +
                        MenuApiMenuItemsPath +
                        MenuApiParams +
                        categoryShortName)}).
      then(function (result)
        {        
        return result.data.menu_items;
        });
    };
}



})();
