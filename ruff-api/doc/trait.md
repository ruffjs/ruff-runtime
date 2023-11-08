# Trait

The `trait` module provides you with extending behaviour of a class. It can be accessed with
`require('trait')`.

Traits both provide a set of methods that implement behaviour to a class and require that the class implement a set of methods that parameterize the provided behaviour.

## Define a trait

You can define a trait as follows:

```javascript
var trait = require('trait');

var FooTrait = trait({
    bar: function() {
        return this.foo() + ', OK';
    },
    foo: trait.required
});
```

`bar` is the function you define to extend behaviour of a class. `foo`, annotated with `trait.required`, is the function the class need to implement.

Now, we define a `BigBang` class to use this trait.

```javascript
function BigBang() {
}

BigBang.prototype.foo = function() {
    return 'foo';
};
```

This `BigBang` class has defined a `foo` function which is required for `FooTrait`.

## Include a trait for a class

If you add `FooTrait` to all `BigBang` instance, you can use `include` function.

```javascript
var BigBangWithTrait = trait.include(BigBang, FooTrait);
```

Now any `BigBang` instance extends a `bar` function.

```javascript
var instance = new BigBangWithTrait();
instance.bar();
```

## Extend a trait for a instance

If `FooTrait` is only added to a specific instance, You need `extend` function.

```javascript
var instance = new BigBang();
var instanceWithTrait = trait.extend(instance, FooTrait);
```

Now `instance` has already extended a `bar` function.

```javascript
instanceWithTrait.bar();
```

## API

### trait(spec)
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

Create a trait. The `spec` argument should be a plain object. e.g.

```javascript
trait({
    bar: function() {
        return this.foo() + ', OK';
    },
    foo: trait.required
})
```

There are two kinds of function in trait:

* Plain Javascript function. It will become a provided function in trait and will be a member function of the target class, which means `this` could be used to access the function defined in trait, or the required function.
* Required function. It is annotated with `trait.required`, which is the function the class need to implement.

### trait.include(constructor, trait)
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

Include `trait` into `constructor`. All `trait` provided functions will be a part of the prototype of `constructor`. It also checks if required functions in `trait` exist in the protype of `constructor`.

The return value is the constructor with trait. You can `new` instance with it directly.

In current implementation, the prototype of `constructor` will be changed. Potentially, this behaviour could be changed in the future.

### trait.extend(instance, trait)
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

extend `instance` with `trait`. All `trait` provided functions will be a part of the prototype of `instance`. It also checks if required functions in `trait` exist in the protype of `instance`.

The return value is the instance with trait. You can use this instance directly.

In current implementation, `instance` will be changed. Potentially, this behaviour could be changed in the future.

### trait.isTrait(trait)
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

Return true if the argument is `trait` created by this module, otherwise, false.
