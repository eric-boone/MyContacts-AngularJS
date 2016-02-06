'use strict';

angular.module('myContacts.contacts', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

// contacts controller
.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  // firebase init
  var ref = new Firebase('https://eb-contacts-app.firebaseio.com/contacts');

  // get contacts
  $scope.contacts = $firebaseArray(ref);
  // console.log($scope.contacts);

  // show add form
  $scope.showAddForm = function(contact){
    $scope.addFormShow = true;
  }

  // show edit form
  $scope.showEditForm = function(contact){
		$scope.editFormShow = true;

		$scope.id = contact.$id;
		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.company = contact.company;
		$scope.work_phone = contact.phones[0].work;
		$scope.home_phone = contact.phones[0].home;
		$scope.mobile_phone = contact.phones[0].mobile;
		$scope.street_address = contact.address[0].street_address;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;
		$scope.zipcode = contact.address[0].zipcode;
	}

  // hide form
  $scope.hide = function(){
    $scope.addFormShow = false;
    $scope.contactShow = false;
  }

  // submit contact
	$scope.addFormSubmit = function(){
		console.log('Adding Contact...');

		// assign values
		if($scope.name){
      var name = $scope.name;
    } else {
      var name = null;
    }

		if($scope.email){
      var email = $scope.email;
    } else {
      var email = null;
    }

		if($scope.company){
      var company = $scope.company;
    } else {
      var company = null;
    }

		if($scope.mobile_phone){
      var mobile_phone = $scope.mobile_phone;
    } else {
      var mobile_phone = null;
    }

		if($scope.home_phone){
      var home_phone = $scope.home_phone;
    } else {
      var home_phone = null;
    }

		if($scope.work_phone){
      var work_phone = $scope.work_phone;
    } else {
      var work_phone = null;
    }

		if($scope.street_address){
      var street_address = $scope.street_address;
    } else {
      var street_address = null;
    }

		if($scope.city){
      var city = $scope.city;
    } else {
      var city = null;
    }

		if($scope.state){
      var state = $scope.state;
    } else {
      var state = null;
    }

		if($scope.zipcode){
      var zipcode = $scope.zipcode;
    } else {
      var zipcode = null;
    }

		// build object
		$scope.contacts.$add({
			name: name,
			email: email,
			company: company,
			phones:[
				{
					mobile: mobile_phone,
					home: home_phone,
					work: work_phone
				}
			],
			address: [
				{
					street_address: street_address,
					city: city,
					state: state,
					zipcode: zipcode
				}
			]
		}).then(function(ref){
			var id = ref.key();
			console.log('Added Contact with ID: '+id);

			// clear form
			clearFields();

			// hide this form
			$scope.addFormShow = false;

			// send message
			$scope.msg = "Contact Added";
		});
	}

  // edit contact form
  $scope.editFormSubmit = function(){
    console.log('Updating Contact');

    //get ID
    var id = $scope.id;

    //get record
    var record = $scope.contacts.$getRecord(id);

    // assign values
    record.name = $scope.name;
		record.email = $scope.email;
		record.company = $scope.company;
		record.phones[0].mobile = $scope.mobile_phone;
		record.phones[0].home = $scope.home_phone;
		record.phones[0].work = $scope.work_phone;
		record.address[0].street_address = $scope.street_address;
		record.address[0].city = $scope.city;
		record.address[0].state = $scope.state;
		record.address[0].zipcode = $scope.zipcode;

    // save contact
    $scope.contacts.$save(record).then(function(ref){
      console.log(ref.key);
    });

    clearFields();

    // hide edit form
    $scope.editFormShow = false;

    $scope.msg = "Contact Updated";
  }
  // show contact information
  $scope.showContact = function(contact){
    console.log('Getting Contact');
    $scope.name = contact.name;
    $scope.email = contact.email;
    $scope.company = contact.company;
    $scope.mobile_phone = contact.phones[0].mobile;
    $scope.home_phone = contact.phones[0].home;
    $scope.work_phone = contact.phones[0].work;
    $scope.street_address = contact.address[0].street_address;
    $scope.city = contact.address[0].city;
    $scope.state = contact.address[0].state;
    $scope.zipcode = contact.address[0].zipcode;

    $scope.contactShow = true;
  };

  // delete contact
  $scope.removeContact = function(contact){
    console.log('Removing Contact');

    $scope.contacts.$remove(contact);

    $scope.msg="Contact Removed";
  }

  // clear form fields
  function clearFields(){
		console.log('Clearing Form Fields');

		$scope.name = '';
		$scope.email = '';
		$scope.company = '';
		$scope.mobile_phone = '';
		$scope.home_phone = '';
		$scope.work_phone = '';
		$scope.street_address = '';
		$scope.city = '';
		$scope.state = '';
		$scope.zipcode = '';
	}

}]);
