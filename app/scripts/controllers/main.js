'use strict';
var jQuery = $.noConflict();
/**
 * @ngdoc function
 * @name pokedexApp.controller:PokedexController
 * @description
 * # PokedexController
 * Controller of the pokedexApp
 */
angular.module('pokedexApp')
    .controller('PokedexController', ['$scope', 'pokemonService', function ($scope, pokemonService) {
        
        $scope.showDetails = false; //the property to show or hide pokemon details card
        $scope.pokemons = []; //the array for current pokemon cards data
        $scope.detailsForPokemon = {}; //the object for pokemon details
        
        var i = 0,
            lastPokemonId = 0;    
        
        //creating a function for uploading a portion of pokemons from the server
        function getPokemonsAll(i, lastPokemonId) {
            var lastID = lastPokemonId || 0;
            pokemonService.getPokemons().get({id:lastID+i+1})
                .$promise
                .then(function(result)
                    {   
                        $scope.pokemons[i] = result;
                        i++;
                        if (i < 12) {
                            getPokemonsAll(i, lastID);
                        } else {
                            i = 0;
                        }
                    })
                .catch(function(response) {
                    alert("Server error: "+"Error status: "+response.status+" Error status text: "+response.statusText);
                });
        }
                
                
        getPokemonsAll(i, lastPokemonId);           
        
        
        //function for pokemon details card to show
        $scope.pokemonDetails = function(id) {
            $scope.showDetails = true;
            var elementPos = $scope.pokemons.map(function(x){return x.id}).indexOf(id);
            $scope.detailsForPokemon = $scope.pokemons[elementPos];
        };
        
        //function for uploading new portion of pokemon cards
        $scope.getPokemons = function() {
            //sessionStorage.clear();
            
            $scope.showDetails = false;
            
            var lastPokemonArrIndex = $scope.pokemons.length - 1,
                lastPokemonId = $scope.pokemons[lastPokemonArrIndex].id;
            
            $scope.pokemons = [];
            
            getPokemonsAll(i, lastPokemonId);
            
        };
        
        //function for sorting the pokemons ascending or descending basing on pokemon types
        $scope.pokemonsSort = function(sortType) {
            var i = 0,
                j = 0;
                
            switch (sortType) {
                case 'Asc':
                    for( i = 0; i < 11; i++ ) {
                        for( j = 0; j < 11; j++ ) {

                            var thisPokemonTypesLength = $scope.pokemons[j].types.length,
                                nextPokemonTypesLength = $scope.pokemons[j+1].types.length,
                                thisPokemon = {},
                                thisPokemonType = {},
                                thatPokemonType = {};

                            if (thisPokemonTypesLength === 1 && nextPokemonTypesLength === 1) {

                                if($scope.pokemons[j].types[0].type.name > $scope.pokemons[j+1].types[0].type.name) {
                                    thisPokemon = $scope.pokemons[j];
                                    $scope.pokemons[j] = $scope.pokemons[j+1];
                                    $scope.pokemons[j+1] = thisPokemon; 
                                }

                            } else if (thisPokemonTypesLength !== 1 && nextPokemonTypesLength == 1) {

                                if($scope.pokemons[j].types[0].type.name > $scope.pokemons[j].types[1].type.name) {
                                    thisPokemonType = $scope.pokemons[j].types[0];
                                    $scope.pokemons[j].types[0] = $scope.pokemons[j].types[1];
                                    $scope.pokemons[j].types[1] = thisPokemonType; 
                                }

                                if($scope.pokemons[j].types[0].type.name > $scope.pokemons[j+1].types[0].type.name) {
                                    thisPokemon = $scope.pokemons[j];
                                    $scope.pokemons[j] = $scope.pokemons[j+1];
                                    $scope.pokemons[j+1] = thisPokemon; 
                                }

                            } else if (thisPokemonTypesLength === 1 && nextPokemonTypesLength !== 1) {

                                if($scope.pokemons[j+1].types[0].type.name > $scope.pokemons[j+1].types[1].type.name) {
                                    thatPokemonType = $scope.pokemons[j+1].types[0];
                                    $scope.pokemons[j+1].types[0] = $scope.pokemons[j+1].types[1];
                                    $scope.pokemons[j+1].types[1] = thatPokemonType; 
                                }

                                if($scope.pokemons[j].types[0].type.name > $scope.pokemons[j+1].types[0].type.name) {
                                    thisPokemon = $scope.pokemons[j];
                                    $scope.pokemons[j] = $scope.pokemons[j+1];
                                    $scope.pokemons[j+1] = thisPokemon; 
                                }
                            } else {

                                if($scope.pokemons[j].types[0].type.name > $scope.pokemons[j].types[1].type.name) {
                                    thisPokemonType = $scope.pokemons[j].types[0];
                                    $scope.pokemons[j].types[0] = $scope.pokemons[j].types[1];
                                    $scope.pokemons[j].types[1] = thisPokemonType; 
                                }

                                if($scope.pokemons[j+1].types[0].type.name > $scope.pokemons[j+1].types[1].type.name) {
                                    thatPokemonType = $scope.pokemons[j+1].types[0];
                                    $scope.pokemons[j+1].types[0] = $scope.pokemons[j+1].types[1];
                                    $scope.pokemons[j+1].types[1] = thatPokemonType; 
                                }

                                if($scope.pokemons[j].types[0].type.name > $scope.pokemons[j+1].types[0].type.name) {
                                    thisPokemon = $scope.pokemons[j];
                                    $scope.pokemons[j] = $scope.pokemons[j+1];
                                    $scope.pokemons[j+1] = thisPokemon; 
                                }
                            }
                        }
                    }
                    break;
                case 'Dsc':
                    for( i = 0; i < 11; i++ ) {
                        for( j = 0; j < 11; j++ ) {

                            var thisPokemonTypesLength = $scope.pokemons[j].types.length,
                                nextPokemonTypesLength = $scope.pokemons[j+1].types.length,
                                thisPokemon = {},
                                thisPokemonType = {},
                                thatPokemonType = {};

                            if (thisPokemonTypesLength === 1 && nextPokemonTypesLength === 1) {

                                if($scope.pokemons[j].types[0].type.name < $scope.pokemons[j+1].types[0].type.name) {
                                    thisPokemon = $scope.pokemons[j];
                                    $scope.pokemons[j] = $scope.pokemons[j+1];
                                    $scope.pokemons[j+1] = thisPokemon; 
                                }

                            } else if (thisPokemonTypesLength !== 1 && nextPokemonTypesLength == 1) {

                                if($scope.pokemons[j].types[0].type.name < $scope.pokemons[j].types[1].type.name) {
                                    thisPokemonType = $scope.pokemons[j].types[0];
                                    $scope.pokemons[j].types[0] = $scope.pokemons[j].types[1];
                                    $scope.pokemons[j].types[1] = thisPokemonType; 
                                }

                                if($scope.pokemons[j].types[0].type.name < $scope.pokemons[j+1].types[0].type.name) {
                                    thisPokemon = $scope.pokemons[j];
                                    $scope.pokemons[j] = $scope.pokemons[j+1];
                                    $scope.pokemons[j+1] = thisPokemon; 
                                }

                            } else if (thisPokemonTypesLength === 1 && nextPokemonTypesLength !== 1) {

                                if($scope.pokemons[j+1].types[0].type.name < $scope.pokemons[j+1].types[1].type.name) {
                                    thatPokemonType = $scope.pokemons[j+1].types[0];
                                    $scope.pokemons[j+1].types[0] = $scope.pokemons[j+1].types[1];
                                    $scope.pokemons[j+1].types[1] = thatPokemonType; 
                                }

                                if($scope.pokemons[j].types[0].type.name < $scope.pokemons[j+1].types[0].type.name) {
                                    thisPokemon = $scope.pokemons[j];
                                    $scope.pokemons[j] = $scope.pokemons[j+1];
                                    $scope.pokemons[j+1] = thisPokemon; 
                                }
                            } else {

                                if($scope.pokemons[j].types[0].type.name < $scope.pokemons[j].types[1].type.name) {
                                    thisPokemonType = $scope.pokemons[j].types[0];
                                    $scope.pokemons[j].types[0] = $scope.pokemons[j].types[1];
                                    $scope.pokemons[j].types[1] = thisPokemonType; 
                                }

                                if($scope.pokemons[j+1].types[0].type.name < $scope.pokemons[j+1].types[1].type.name) {
                                    thatPokemonType = $scope.pokemons[j+1].types[0];
                                    $scope.pokemons[j+1].types[0] = $scope.pokemons[j+1].types[1];
                                    $scope.pokemons[j+1].types[1] = thatPokemonType; 
                                }

                                if($scope.pokemons[j].types[0].type.name < $scope.pokemons[j+1].types[0].type.name) {
                                    thisPokemon = $scope.pokemons[j];
                                    $scope.pokemons[j] = $scope.pokemons[j+1];
                                    $scope.pokemons[j+1] = thisPokemon; 
                                }
                            }
                        }
                    }
                    break;    
            }
        };
    }])
    
;
