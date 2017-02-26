(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryItemsController', CategoryItemsController);


CategoryItemsController.$inject = ['MenuDataService', 'items'];
function CategoryItemsController(MenuDataService, items) {

  var categoryItems = this;
  categoryItems.items = items;
}

})();
