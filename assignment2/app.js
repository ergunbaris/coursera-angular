(function (){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.markItem = function (itemIndex) {
      ShoppingListCheckOffService.markItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    bought.items = ShoppingListCheckOffService.getBoughtItems();

    // Just some extra functionality which will give the chance the user
    // to undo selection which helped re-testing as well
    bought.undoItem = function (itemIndex) {
      ShoppingListCheckOffService.undoItem(itemIndex);
    };
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // An anti-Yaakov List of shopping items
    var toBuyitems = [{ name: "brocolli", quantity: 1 },
                      { name: "spinach", quantity: 1 },
                      { name: "leek", quantity: 2 },
                      { name: "okra", quantity: 2 },
                      { name: "aubergine", quantity: 3 }];

    var boughtitems = [];

    service.markItem = function (itemIndex) {
      moveItem(itemIndex, toBuyitems, boughtitems);
    };

    service.undoItem = function (itemIndex) {
      moveItem(itemIndex, boughtitems, toBuyitems);
    };

    var moveItem = function (itemIndex, fromArray, toArray) {
      var item = fromArray[itemIndex];
      fromArray.splice(itemIndex, 1);
      toArray.push(item);
    };

    service.getToBuyItems = function () {
      return toBuyitems;
    };

    service.getBoughtItems = function () {
      return boughtitems;
    };
  }
})();
