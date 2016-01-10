(function() {
  'use strict';
    /** @ngInject */
  angular
    .module('validators', [])
      .directive('validatePeselNumber', validatePeselNumber);

        /** @ngInject */
        function validatePeselNumber() {
                return {
                        restrict: 'A',
                        require: 'ngModel',

                        link: function(scope, element, attr, ctrl) {

                                function customValidator(ngModelValue) {

                                        var value = ngModelValue;

                                        var pesel = value.replace(/[\ \-]/gi, '');

                                        if(pesel === '') {
                                                ctrl.$setValidity('peselNumberValidator', true);
                                                return ngModelValue;
                                        }

                                        if(pesel.length < 11 || pesel.length > 11) {
                                                ctrl.$setValidity('peselNumberValidator', false);
                                                return ngModelValue;
                                        }

                                        if (pesel.length === 11) {
                                                var steps = new Array(1, 3, 7, 9, 1, 3, 7, 9, 1, 3);
                                                var sum_nb = 0;
                                                for (var x = 0; x < 10; x++) { sum_nb += steps[x] * pesel[x];}
                                                var sum_m = 10 - sum_nb % 10;
                                                if (sum_m == 10) { var sum_c = 0; } else { var sum_c = sum_m;}
                                                if (sum_c != pesel[10]) {
                                                        ctrl.$setValidity('peselNumberValidator', false);
                                                        return ngModelValue;
                                                }
                                        }

                                        ctrl.$setValidity('peselNumberValidator', true);
                                        return ngModelValue;
                                }

                                ctrl.$parsers.push(customValidator);
                        }

                };
        };


})();
