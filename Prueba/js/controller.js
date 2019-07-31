angular.module('app',[])
    .controller('Controller',['$http','$scope', ($http,$scope) => {
        $scope.nodescount = 0;
        $scope.matriz =[];
        $scope.loadMatriz = function () {
            $scope.matriz = new Array($scope.nodescount);
            console.log($scope.matriz.length);
            for (let i = 0; i < $scope.matriz.length; i++) {
                $scope.matriz[i] = new Array($scope.nodescount);
                for (let j = 0; j < $scope.matriz[i].length; j++) {
                    $scope.matriz[i][j] = 0;
                }
            }
            console.log($scope.matriz);
        }

    }]);
