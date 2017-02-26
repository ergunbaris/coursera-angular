(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })
  // Menu Categories page
  .state('mainCategories', {
    url: '/main-categories',
    templateUrl: 'src/menuapp/templates/main-categories.template.html',
    controller: 'MainCategoriesController as mainCategories',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })
  // Menu Items page
  .state('mainCategories.categoryItems', {
    url: '/category-items/{categoryId}',
    templateUrl: 'src/menuapp/templates/main-items.template.html',
    controller: "CategoryItemsController as categoryItems",
    resolve: {
      items: ['MenuDataService', '$stateParams',
              function (MenuDataService, $stateParams) {
        return MenuDataService.getItemsForCategory($stateParams.categoryId);
      }]      
    }
  });

}

})();
