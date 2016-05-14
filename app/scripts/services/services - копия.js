angular.module('pokedexApp')
    .constant("baseURL", "http://pokeapi.co/api/v2/")
    .service('pokemonService', ['$resource', 'baseURL', function($resource, baseURL) {
        this.getPokemons = function() {
            return $resource(baseURL+"pokemon/:id",null,{
                'get': {method: 'GET'},
                'query':  {method:'GET', isArray:true}
            });
        };
    }])
    .service('pokemonServiceDetail', ['$resource', 'baseURL', function($resource, baseURL){
    
    }])
;