'use strict';

/**
 * @ngdoc overview
 * @name pokedexApp
 * @description
 * # pokedexApp
 *
 * Main module of the application.
 */
angular
  .module('pokedexApp', [
    'ui.router', 
    'ngResource'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        //route for the home page
        .state('app', {
            url: '/',
            views: {
                'header': {
                    template: "<h1>Here will be the header</h1>"
                },
                'content': {
                    templateUrl: 'views/main.html',
                    controller: 'PokedexController'
                },
                'footer': {
                    template: "<h1>Here will be the footer</h1>"
                }
            }
        });
        
        $urlRouterProvider.otherwise('/');
    
    });
