(function(){ 'use strict';

require.config({ 
  baseUrl: '/js',
  paths: {    
    jQuery: 'lib/jquery-2.0.3.min',
    angular: 'lib/angular.min'
  },
  shim: {
    'jQuery': {
      exports : 'jQuery'
    },
    'angular': {
      deps: ['jQuery'],
      exports : 'angular'
    }
  }
});

require([
  'jQuery', 
  'angular'], function($, angular) {
    angular.bootstrap(document, ['PhotoViewer']);
  });

})();