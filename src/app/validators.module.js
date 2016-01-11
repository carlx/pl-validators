(function() {
  'use strict';
    /** @ngInject */
  angular
    .module('validators', [])
      .directive('validatePeselNumber', validatePeselNumber)
      .directive('validateVatNumber', validateVatNumber)
      .directive('validateIdNumber', validateIdNumber)
      .directive('validateRegonNumber', validateRegonNumber);

        /** @ngInject */
        function validatePeselNumber() {
                return {
                        restrict: 'A',
                        require: 'ngModel',

                        link: function(scope, element, attr, ctrl) {

                                function customValidator(ngModelValue) {

                                        var value = ngModelValue;

                                        var pesel = value.replace(/[\ \-]/gi, '');

                                        if (pesel === '') {
                                                ctrl.$setValidity('peselNumberValidator', true);
                                                return ngModelValue;
                                        }

                                        if (pesel.length < 11 || pesel.length > 11) {
                                                ctrl.$setValidity('peselNumberValidator', false);
                                                return ngModelValue;
                                        }

                                        if (pesel.length === 11) {
                                                var steps = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
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

        /** @ngInject */
        function validateIdNumber() {
                return {
                        restrict: 'A',
                        require: 'ngModel',

                        link: function(scope, element, attr, ctrl) {
                                console.log('test');

                                function customValidator(ngModelValue) {

                                        if (ngModelValue === '') {
                                                ctrl.$setValidity('peselDowOsValidator', true);
                                                return ngModelValue;
                                        }

                                        var numer = ngModelValue.toUpperCase();

                                        var letterValues = [
                                                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                                                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                                                'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                                                'U', 'V', 'W', 'X', 'Y', 'Z'
                                        ];

                                        function getLetterValue(letter) {
                                                for (var j = 0; j < letterValues.length; j++) {
                                                        if (letter == letterValues[j]) {
                                                                return j;
                                                        }
                                                }
                                                return -1;
                                        }

                                        //Check serie
                                        for (var i = 0; i < 3; i++) {
                                                if (getLetterValue(numer[i]) < 10) {
                                                        ctrl.$setValidity('dowOsValidator', false);
                                                        return ngModelValue;
                                                }
                                        }
                                        //Check number
                                        for (var i = 3; i < 9; i++) {
                                                if (getLetterValue(numer[i]) < 0 || getLetterValue(numer[i]) > 9) {
                                                        ctrl.$setValidity('peselDowOsValidator', false);
                                                        return ngModelValue;
                                                }
                                        }
                                        //sprawdz cyfre controlna
                                        var sum = 7 * getLetterValue(numer[0]) +
                                            3 * getLetterValue(numer[1]) +
                                            1 * getLetterValue(numer[2]) +
                                            7 * getLetterValue(numer[4]) +
                                            3 * getLetterValue(numer[5]) +
                                            1 * getLetterValue(numer[6]) +
                                            7 * getLetterValue(numer[7]) +
                                            3 * getLetterValue(numer[8]);
                                        sum %= 10;
                                        if (sum != getLetterValue(numer[3])) {
                                                ctrl.$setValidity('peselDowOsValidator', false);
                                                return ngModelValue;
                                        }
                                        ctrl.$setValidity('peselDowOsValidator', true);
                                        return ngModelValue;
                                }

                                ctrl.$parsers.push(customValidator);
                        }

                };
        };

        /** @ngInject */
        function validateVatNumber() {
                return {
                        restrict: 'A',
                        require: 'ngModel',

                        link: function(scope, element, attr, ctrl) {

                                function customValidator(ngModelValue) {
                                        var value = ngModelValue;

                                        var verificatorVat = [6, 5, 7, 2, 3, 4, 5, 6, 7];
                                        var nip = value.replace(/[\ \-]/gi, '');

                                        if (nip.length != 10) {
                                                ctrl.$setValidity('vatNumberValidator', false);
                                                return ngModelValue;
                                        } else {
                                                var n = 0;
                                                for (var i = 0; i < 9; i++) {
                                                        n += nip[i] * verificatorVat[i];
                                                }
                                                n %= 11;
                                                if (n != nip[9]) {
                                                        ctrl.$setValidity('vatNumberValidator', false);
                                                        return ngModelValue;
                                                }
                                        }
                                        ctrl.$setValidity('vatNumberValidator', true);
                                        return ngModelValue;

                                }

                                ctrl.$parsers.push(customValidator);

                        }

                };
        };

        /** @ngInject */
        function validateRegonNumber() {
                return {
                        restrict: 'A',
                        require: 'ngModel',

                        link: function(scope, element, attr, ctrl) {

                                function customValidator(ngModelValue) {
                                        var value = ngModelValue;

                                        if (value.length == 9) {
                                                var weights = [8, 9, 2, 3, 4, 5, 6, 7];
                                        } else if (value.length == 14) {
                                                var weights = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];
                                        } else {
                                                ctrl.$setValidity('vatNumberValidator', false);
                                                return ngModelValue;
                                        }

                                        var sum = 0;
                                        for (var i = 0;i < weights.length; i++) {
                                                sum += weights[i] * value[i];
                                        }
                                        var int = sum % 11;
                                        var checksum = (int == 10) ? 0 : int;
                                        if (checksum == value[weights.length]) {
                                                ctrl.$setValidity('vatNumberValidator', true);
                                                return ngModelValue;
                                        }

                                        ctrl.$setValidity('vatNumberValidator', false);
                                        return ngModelValue;

                                }

                                ctrl.$parsers.push(customValidator);
                        }

                };
        };

})();
