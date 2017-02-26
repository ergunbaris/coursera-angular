(function () {
'use strict';

angular.module('MenuApp')
.controller('MainCategoriesController', MainCategoriesController);



MainCategoriesController.$inject = ['MenuDataService',
                                    'categories'];
function MainCategoriesController(MenuDataService,
                                  categories) {  
  var mainCategories = this;
  mainCategories.categories = categories;
}

})();
