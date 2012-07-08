var mrt = require('./helpers');
var path = require('path');
var fs = require('fs');
var assert = require('assert');

///// IMPORTANT NOTE!
// All real `install` tests are done on run because `install` is just a subset of `run` but `run` gives us simpler ways to verify behavior.

describe('`mrt install`', function() {
  
  beforeEach(function(done) {
    mrt.cleanup(done);
  });
  
  // Just a superficial test to make sure install is working
  it("should install meteor and the app's smart package", function(done) {
    mrt.invoke('run', 'app-with-smart-pkg', {
      waitForOutput: [
        "Fetching package mrt-test-pkg1 (branch: master)",
        "Fetching Meteor (branch: master)"
      ]
    }, done);
  })
  
});

describe("mrt uninstall --system", function(done) {
  it("should delete everything in ~/.meteorite", function(done) {
    
    var installDir = path.resolve('spec/support/home/.meteorite');
    
    // put something in there
    fs.mkdir(installDir);
    fs.mkdir(path.join(installDir, 'foo'));
    assert.equal(path.existsSync(installDir), true);
    console.log(installDir);
    
    mrt.invoke('uninstall --system', 'empty-dir', {
      waitForOutput: 'Deleting ~/.meteorite'
    }, function() {
      assert.equal(path.existsSync(installDir), false, "~/.meteorite wasn't uninstalled");
      done();
    });
        
  }, done);
});
