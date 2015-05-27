'use strict';

angular.module('spinnaker.delivery.buildDisplayName.filter', [])
  .filter('buildDisplayName', function() {
    return function(input) {
      var formattedInput = '';
      if( input.fullDisplayName !== undefined ){
        formattedInput = input.fullDisplayName.split('#' + input.number).pop();
      }
      return formattedInput;
    };
  });
