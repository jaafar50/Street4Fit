'use strict';



angular.module('myApp.street4fit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'street4fit/admin.html',
    controller: 'AdminCtrl'
  })
  $routeProvider.when('/street4fit', {
    templateUrl: 'street4fit/street4fit.html',
    controller: 'Street4fitCtrl'
  });
}])

.controller('AdminCtrl', ['$scope', '$firebaseArray',function($scope,$firebaseArray) {
 var ref= firebase.database().ref('users');
 $scope.users= $firebaseArray(ref);

 $scope.removeUser= function(user){
  $scope.users.$remove(user);

 }

 $scope.editFormShow=false;
  $scope.showEditForm= function(user){
  $scope.editFormShow=true;
  $scope.id = user.id;
  $scope.inputName = user.name;
  $scope.inputFirst = user.first;
  $scope.inputEmailFirst = user.email;
  $scope.phone = user.phone;
  $scope.inputMessage = user.message;

 }
// FIX THIS !!! THE ID IS UNDEFINED THAT IS WHY IT FAILS
 $scope.editUser= function(){
  var id = $scope.id;
  var record = $scope.users.$getRecord(last_id);
  record.name = $scope.inputName;
  record.first= $scope.inputFirst;
  record.email= $scope.inputEmailFirst;
  record.phone= $scope.phone ;
  record.message= $scope.inputMessage;

  // save

  $scope.users.$save(record).then(function(ref){
    console.log(ref.key);
  }); 

   // clean up the form
      $scope.inputName = '';
      $scope.inputFirst= '';
      $scope.inputEmailFirst= '';
      $scope.phone= '';
      $scope.inputMessage= '';


 }

  

}])

.controller('Street4fitCtrl', ['$scope', '$firebaseArray',function($scope,$firebaseArray) {


  //var ref= new Firebase("https://street4fit-bbee8.firebaseio.com/");
 $scope.users=firebase.database().ref('users/');

  


//   ref.onAuth(function(authData){
//     if(!authData){

//       //do nothing
//     }
//     else
//     {

//       console.log('user has been authenticated', authData);
//     }

//   });

// $scope.user = {};
//   $scope.SignIn = function(e){
//      e.preventDefault();
//      var username = $scope.user.email;
//      var password = $scope.user.password;
//      ref.authWithPassword ({
//                 email: username,
//                 password: password
//             })
//             .then(function(user) {
//                 //Success callback
//                 console.log('Authentication successful');
//             }, function(error) {
//                 //Failure callback
//                 console.log('Authentication failure');
//             });
//   }




	$scope.addUser = function(){
		console.log('adding a User to street4fit');
    firebase.database().ref('users/').push({
      name: $scope.inputName,
      first: $scope.inputFirst,
      email: $scope.inputEmailFirst,
      phone: $scope.phone,
      message: $scope.inputMessage
    }). then(function(){
     
      // clean up the form
      $scope.inputName = '';
      $scope.inputFirst= '';
      $scope.inputEmailFirst= '';
      $scope.phone= '';
      $scope.inputMessage= '';

    });

	}

}]);