(function() {
  'use strict';

  describe('directive validate pesel', function() {
    var $log;
    var vm;
    var el;
    var $scope, form;

    beforeEach(module('validators'));
    beforeEach(inject(function($compile, $rootScope, $q, _$log_) {
      $log = _$log_;
      $scope = $rootScope;
      el = angular.element('<form name="form">' +
          '<input ng-model="pesel" name="pesel" validate-pesel-number />' +
          '</form>');
      $scope.model = { pesel: null};
      $compile(el)($scope);
      $scope.$digest();
      form = $scope.form;
    }));

    it('should be compiled', function() {
      expect(el.html()).not.toEqual(null);
    });

    it('should be invalid', function() {
      var peselArr = [
        '81030712149',
        '81061507246',
        '81114718377'
      ];
      angular.forEach(peselArr, function(element) {
        form.pesel.$setViewValue(element);
        expect($scope.pesel).toEqual(element);
        expect(form.pesel.$valid).toBe(false);
      });
    });

    it('should be valid', function() {
      var peselArr = [
          '81030718149',
          '81061707246',
          '81112718377'
      ];
      angular.forEach(peselArr, function(element) {
        form.pesel.$setViewValue(element);
        expect($scope.pesel).toEqual(element);
        expect(form.pesel.$valid).toBe(true);
      });
    });

  });


  describe('directive validate id document', function() {
    var $log;
    var vm;
    var el;
    var $scope, form;

    beforeEach(module('validators'));
    beforeEach(inject(function($compile, $rootScope, $q, _$log_) {
      $log = _$log_;
      $scope = $rootScope;
      el = angular.element('<form name="form">' +
          '<input ng-model="docId" name="docId" validate-id-number />' +
          '</form>');
      $scope.model = { docId: null };
      $compile(el)($scope);
      $scope.$digest();
      form = $scope.form;
    }));

    it('should be compiled', function() {
      expect(el.html()).not.toEqual(null);
    });

    it('should be invalid', function() {
      var idArr = [
        '81030712149',
        '81061507246',
        '81114718377'
      ];
      angular.forEach(idArr, function(element) {
        form.docId.$setViewValue(element);
        expect($scope.docId).toEqual(element);
        expect(form.docId.$valid).toBe(false);
      });
    });

    it('should be valid', function() {
      var idArr = [
        'AHB902100',
        'AHB902100',
        'AHB902100'
      ];
      angular.forEach(idArr, function(element) {
        form.docId.$setViewValue(element);
        expect($scope.docId).toEqual(element);
        expect(form.docId.$valid).toBe(true);
      });
    });

  });



})();
