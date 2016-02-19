angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    }
  })
.controller("DBController", function($scope, $cordovaSQLite){
      $scope.insert = function(firstname, lastname){
        var query = "INSERT INTO people (firstname, lastname) VALUES(?,?)";
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res){
          console.log("INSERT ID -> " + res.insertId);
        }, function(error){
          console.log(error);
        });
      }

    $scope.select = function(lastname){
      var query = "SELECT firstname, lastname FROM people WHERE lastname =?";
      $cordovaSQLite.execute(db, query, [lastname]).then(function(res){
        if(res.rows.length > 0){
          console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
        } else{
          console.log("No result found");
        }
      }, function(error){
        console.log(error);
      })
    }
});
