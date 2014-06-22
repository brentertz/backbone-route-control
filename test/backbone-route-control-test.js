describe('backbone-route-control', function() {
  var navigateOptions = { trigger: true, replace: true };

  beforeEach(function() {
    var ctx = this;

    var FooController = function() {
      return {
        index: sinon.stub(),
        show: sinon.stub(),
        form: sinon.stub()
      };
    };

    var Router = BackboneRouteControl.extend({
      routes: {
        'foo': 'foo#index',
        'foo/new': 'foo#form',
        'foo/:id': 'foo#show',
        'foo/:id/edit': 'foo#form',
        'somewhere': 'somewhere'
      },
      somewhere: sinon.stub()
    });

    ctx.controllers = {
      foo: new FooController()
    };

    ctx.router = new Router({
      controllers: ctx.controllers
    });

    ctx.routeEventSpy = sinon.spy();
    ctx.router.on('route', ctx.routeEventSpy);

    // Start history to enable routes to fire
    // Do not trigger initial route
    Backbone.history.start({ silent: true });
  });

  afterEach(function() {
    Backbone.history.stop();
  });

  context('routes are correctly matched to actions', function() {
    context('routes to actions defined directly in the router', function() {
      it('routes to somewhere', function() {
        var ctx = this;

        ctx.router.navigate('somewhere', navigateOptions);

        // Route event
        expect(ctx.routeEventSpy)
          .to.have.been.calledOnce.and
          .to.have.been.calledWith('somewhere');

        // Route action
        expect(ctx.router.somewhere)
          .to.have.been.calledOnce;
      });
    });

    context('routes to actions defined in external controllers', function() {
      it('routes to foo#index', function() {
        var ctx = this;

        ctx.router.navigate('foo', navigateOptions);

        // Route event
        expect(ctx.routeEventSpy)
          .to.have.been.calledOnce.and
          .to.have.been.calledWith('foo#index');

        // Route action
        expect(ctx.router.controllers.foo.index)
          .to.have.been.calledOnce;
      });

      it('routes to foo#show', function() {
        var ctx = this;

        ctx.router.navigate('foo/1', navigateOptions);

        // Route event
        expect(ctx.routeEventSpy)
          .to.have.been.calledOnce.and
          .to.have.been.calledWith('foo#show', ['1', null]);

        // Route action
        expect(ctx.router.controllers.foo.show)
          .to.have.been.calledOnce.and
          .to.have.been.calledWith('1');
      });

      it('routes to foo#form (new)', function() {
        var ctx = this;

        ctx.router.navigate('foo/new', navigateOptions);

        // Route event
        expect(ctx.routeEventSpy)
          .to.have.been.calledOnce.and
          .to.have.been.calledWith('foo#form');

        // Route action
        expect(ctx.router.controllers.foo.form)
          .to.have.been.calledOnce.and
          .to.have.been.calledWithExactly;
      });

      it('routes to foo#form (edit)', function() {
        var ctx = this;

        ctx.router.navigate('foo/1/edit', navigateOptions);

        // Route event
        expect(ctx.routeEventSpy)
          .to.have.been.calledOnce.and
          .to.have.been.calledWith('foo#form', ['1', null]);

        // Route action
        expect(ctx.router.controllers.foo.form)
          .to.have.been.calledOnce.and
          .to.have.been.calledWith('1');
      });
    });
  });
});
