# backbone-route-control

> backbone-route-control adds support for __controller#action__ style syntax to
> Backbone's router.
>
> This facilitates route callbacks to be defined in separate controller/handler
> objects, helping to keep your router slim.  This separation of concerns
> can also aid greatly in the maintainability and testability of these classes.

## Installation

```
npm install backbone-route-control
```

or

```
bower install backbone-route-control
```

## Usage

Create a router class, that extends from BackboneRouteControl.

```JavaScript
var Router = BackboneRouteControl.extend({});
```

Define and organize your routes, using the __controller#action__ syntax.

```JavaScript
var Router = BackboneRouteControl.extend({
  routes: {
    'foo': 'foo#index',
    'foo/new': 'foo#form',
    'foo/:id': 'foo#show',
    'foo/:id/edit': 'foo#form',
    'whatever': 'whatever'
  },
  whatever: function() {}
});
```

_Note that you can still define methods directly in the router and use the normal Backbone syntax as well._


Create controller classes, to match your route organization.  These can be simple JavaScript objects or really whatever you like.  I suggest to create them as functions so that you may inject options or dependencies.

```JavaScript
var FooController = function(options) {
  return {
    index: function() {},
    show: function(id) {},
    form: function(id) {}    
  };
};
```

Instantiate your router, passing in a hash of controllers.

```JavaScript
var router = new Router({
  controllers: {
  	foo: new FooController()
  }
});
```

## Tests

```
grunt
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code
using [Grunt](http://gruntjs.com/).

## Release History

- 0.1.0 Initial release
