'use strict';

describe('Service: timeBoundaries', function () {

  //NOTE: This is only testing the service dependencies. Please add more tests.

  var timeBoundaries;

  beforeEach(
    module('spinnaker.timeBoundaries.service')
  );

  beforeEach(
    inject(function (_timeBoundaries_) {
      timeBoundaries = _timeBoundaries_;
    })
  );

  it('should instantiate the controller', function () {
    expect(timeBoundaries).toBeDefined();
  });
});

