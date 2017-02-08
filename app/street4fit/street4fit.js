'use strict';



angular.module('myApp.street4fit', ['ngRoute'])

.directive("passwordVerify", function() {
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
})

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'street4fit/home.html',
    controller: 'HomeCtrl'
  })
  $routeProvider.when('/signin', {
    templateUrl: 'street4fit/signin.html',
    controller: 'SigninCtrl'
  })
  $routeProvider.when('/admin', {
    templateUrl: 'street4fit/admin.html',
    controller: 'AdminCtrl'
  })
  $routeProvider.when('/signup', {
    templateUrl: 'street4fit/signup.html',
    controller: 'SignupCtrl'
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
  console.log("the user id at editshow is");
  console.log(user.id);
  $scope.inputName = user.name;
  $scope.inputFirst = user.first;
  $scope.inputEmailFirst = user.email;
  $scope.phone = user.phone;
  $scope.inputMessage = user.message;

 }
// FIX THIS !!! THE ID IS UNDEFINED THAT IS WHY IT FAILS
 $scope.editUser= function(){
  var id = $scope.id;
  var record = $scope.users.$getRecord(id);
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

.controller('HomeCtrl', ['$scope', '$firebaseArray',function($scope,$firebaseArray) {
 var ref= firebase.database().ref('users');
 $scope.users= $firebaseArray(ref);

}])

.controller('SigninCtrl', ['$scope', '$firebaseArray',function($scope,$firebaseArray) {

  $scope.signInUser = function(){
      firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    // ...
    });
     

  }


}])

.controller('SignupCtrl', ['$scope', '$firebaseArray',function($scope,$firebaseArray) {


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
      password: $scope.inputPassword,
      phone: $scope.phone,
      message: $scope.inputMessage
    }). then(function(){
      firebase.auth().createUserWithEmailAndPassword($scope.inputEmailFirst, $scope.inputPassword).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
       // ...
      });
     
      // clean up the form
      $scope.inputName = '';
      $scope.inputFirst= '';
      $scope.inputEmailFirst= '';
      $scope.inputPassword= '';
      $scope.phone= '';
      $scope.inputMessage= '';

    });

	}

}]);