var trait = require('../src/index.js');
var include = trait.include;
var extend = trait.extend;
var isTrait = trait.isTrait;
var assert = require('assert');

exports['test should create trait'] = function() {
    var FooTrait = trait({
        bar: function() {
            return this.foo() + ', OK';
        },
        foo: trait.required
    });

    function BigBang() {
    }

    BigBang.prototype.foo = function() {
        return 'foo';
    };

    var NewBigBang = include(BigBang, FooTrait);

    var obj = new BigBang();
    assert.equal('foo, OK', obj.bar());

    var newObj = new NewBigBang();
    assert.equal('foo, OK', newObj.bar());
};

exports['test should create trait only adding required'] = function() {
    var FooTrait = trait({
        foo: trait.required
    });

    function BigBang() {
    }

    BigBang.prototype.foo = function() {
        return 'foo';
    };

    var NewBigBang = include(BigBang, FooTrait);

    var obj = new NewBigBang();
    assert.equal('foo', obj.foo());
};

exports['test should create trait only adding method'] = function() {
    var FooTrait = trait({
        bar: function() {
            return 'OK';
        }
    });

    function BigBang() {
    }

    var NewBigBang = include(BigBang, FooTrait);

    var obj = new NewBigBang();
    assert.equal('OK', obj.bar());
};

exports['test should throw exception without required function'] = function() {
    var FooTrait = trait({
        bar: function() {
            return this.foo() + ', OK';
        },
        foo: trait.required
    });

    function BigBang() {
    }

    assert.throws(function() {
        include(BigBang, FooTrait);
    }, Error);
};

exports['test should throw exception if required function is not a function'] = function() {
    var FooTrait = trait({
        bar: function() {
            return this.foo() + ', OK';
        },
        foo: trait.required
    });

    function BigBang() {
    }

    BigBang.prototype.foo = 1;

    assert.throws(function() {
        include(BigBang, FooTrait);
    }, Error);
};

exports['test should throw exception if passing constructor is undefined'] = function() {
    var FooTrait = trait({
        bar: function() {
            return this.foo() + ', OK';
        },
        foo: trait.required
    });

    assert.throws(function() {
        include(undefined, FooTrait);
    }, TypeError);
};

exports['test should throw exception if passing trait is undefined'] = function() {
    function BigBang() {
    }

    assert.throws(function() {
        include(BigBang, undefined);
    }, TypeError);
};

exports['test should throw exception if passing trait is not a trait'] = function() {
    function BigBang() {
    }

    assert.throws(function() {
        include(BigBang, BigBang);
    }, TypeError);
};

exports['test should extend object with trait'] = function() {
    var FooTrait = trait({
        bar: function() {
            return this.foo() + ', OK';
        },
        foo: trait.required
    });

    function BigBang() {
    }

    BigBang.prototype.foo = function() {
        return 'foo';
    };

    var obj = new BigBang();

    var newObj = extend(obj, FooTrait);
    assert.equal('foo, OK', newObj.bar());
};

exports['test should throw exception if passing obj is undefined'] = function() {
    var FooTrait = trait({
        bar: function() {
            return this.foo() + ', OK';
        },
        foo: trait.required
    });

    assert.throws(function() {
        extend(undefined, FooTrait);
    }, TypeError);
};

exports['test should throw exception if passing obj is undefined'] = function() {
    function BigBang() {
    }

    assert.throws(function() {
        extend(new BigBang(), undefined);
    }, TypeError);
};

exports['test should throw exception if passing obj is undefined'] = function() {
    function BigBang() {
    }

    assert.throws(function() {
        extend(new BigBang(), BigBang);
    }, TypeError);
};

exports['test should know if passing object is a trait'] = function() {
    var FooTrait = trait({
        bar: function() {
            return this.foo() + ', OK';
        },
        foo: trait.required
    });
    assert.equal(isTrait(FooTrait), true);
    assert.equal(isTrait(undefined), false);
    assert.equal(isTrait({}), false);
}

require('test').run(exports);