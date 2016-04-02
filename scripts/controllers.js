'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
        
        $scope.tab = 1;
        $scope.orderText = '';
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";

        menuFactory.getDishes().query(
            function(response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

                    
        $scope.select = function(setTab) {
            $scope.tab = setTab;
            
            if (setTab === 2) {
                $scope.orderText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.orderText = "mains";
            }
            else if (setTab === 4) {
                $scope.orderText = "dessert";
            }
            else {
                $scope.orderText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };
    }])

    .controller('ContactController', ['$scope', function($scope) {

        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
        
        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
        
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
                    
    }])

    .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
        
        $scope.sendFeedback = function() {
            
            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;

                feedbackFactory.getFeedback().save($scope.feedback, function() {
                    console.log("Good");
                }, function() {
                    console.log("Error")
                });

                $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                $scope.feedback.mychannel="";
                $scope.feedbackForm.$setPristine();
            }
        };
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

        $scope.showDish = false;
        $scope.message = "Loading ...";

        $scope.dish = menuFactory.getDishes().get({id: parseInt($stateParams.id, 10)})
        .$promise.then(
            function(response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
        
    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
        
        $scope.comment = {rating:5, comment:"", author:"", date:""};
        
        $scope.submitComment = function () {
            
            $scope.comment.date = new Date().toISOString();
            $scope.comment.rating = parseInt($scope.comment.rating);
            
            $scope.dish.comments.push($scope.comment);
            menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);
            
            $scope.commentForm.$setPristine();
            
            $scope.comment = {rating:5, comment:"", author:"", date:""};
        };
    }])

    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
        $scope.showDish = false;
        $scope.showPromotion = false;
        $scope.showShef = false;
        $scope.errorDish = "Loading ...";
        $scope.errorPromotion = "Loading ...";
        $scope.errorShef = "Loading ...";

        $scope.bestDish = menuFactory.getDishes().get({id: 0})
        .$promise.then(
            function(response) {
                $scope.bestDish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.errorDish = "Error: " + response.status + " " + response.statusText;
            }
        );

        menuFactory.getPromotion().get({id: 0})
        .$promise.then(
            function(response) {
                $scope.promotionDish = response;
                $scope.showPromotion = true;
            },
            function(response) {
                $scope.errorPromotion = "Error: " + response.status + " " + response.statusText;
            }
        );

        corporateFactory.getLeaders().get({id: 3})
        .$promise.then(
            function(response) {
                $scope.shef = response;
                $scope.showShef = true;
            },
            function(response) {
                $scope.errorShef = "Error: " + response.status + " " + response.statusText;
            }
        );

    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){

        $scope.showLeaders = false;
        $scope.errorLeaders = "Loading ...";

        corporateFactory.getLeaders().query(
            function(response) {
                $scope.leaders = response;
                $scope.showLeaders = true;
            },
            function(response) {
                $scope.errorLeaders = "Error: " + response.status + " " + response.statusText;
            }
        );

    }])

        // implement the IndexController and About Controller here


;