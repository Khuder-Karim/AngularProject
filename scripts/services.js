'use strict';

angular.module('confusionApp')

        .constant('baseURL', "http://localhost:3000/")

        .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
    
            this.getDishes = function(){
                
                return $resource(baseURL+"dishes/:id", null, 
                    {'update': {method: 'PUT' }});
                
            };

            this.getPromotion = function() {
                return $resource(baseURL+"promotions/:id");
            };
    
                // implement a function named getPromotion
                // that returns a selected promotion.
    
                        
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            var corpfac = {};

            corpfac.getLeaders = function() {
              return $resource(baseURL+"leadership/:id");
            };

            return corpfac;
     
            // Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            // Remember this is a factory not a service    
    
        }])

        .service('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {
            this.getFeedback = function() {
                return $resource(baseURL+"feedback");
            }
        }])

;