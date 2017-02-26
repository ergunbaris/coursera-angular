(function () {
'use strict';

angular.module('MenuApp')
.component('menuCategories', {
  templateUrl: 'src/menuapp/templates/categories.template.html',
  bindings: {
    categories: '<'
  }
});

})();
