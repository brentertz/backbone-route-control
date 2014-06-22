(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'));
  } else {
    root.BackboneRouteControl = factory(root._, root.Backbone);
  }
})(this, function(_, Backbone) {
  var BackboneRouteControl = Backbone.Router.extend({
    constructor: function(options) {
      options || (options = {});
      if (options.controllers) { this.controllers = options.controllers; }
      Backbone.Router.prototype.constructor.call(this, options);
    },

    _bindRoutes: function() {
      if (!this.routes) { return; }
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        var routeAction = this.routes[route];
        var routeParts = routeAction.split('#');
        var isControllerAction = routeParts.length === 2;

        if (isControllerAction) {
          var controller, controllerName, method, methodName;
          controllerName = routeParts[0];
          controller = this.controllers[controllerName];
          methodName = routeParts[1];
          method = controller[methodName];
          this.route(route, routeAction, _.bind(method, controller));
        } else {
          this.route(route, routeAction);
        }
      }
    }
  });

  return BackboneRouteControl;
});
