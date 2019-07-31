angular.module('app',[])
    .controller('Controller',['$http','$scope', ($http,$scope) => {
        $scope.nodescount = 0;
        $scope.matriz =[];
        $scope.rows = 0;
        $scope.matrizHeader = [];

        $scope.loadMatriz = function () {
            $scope.matriz = new Array($scope.nodescount);
            $scope.matrizHeader = new Array($scope.nodescount);
            console.log($scope.matriz.length);
            for (let i = 0; i < $scope.matriz.length; i++) {
                $scope.matriz[i] = new Array($scope.nodescount);
                $scope.matrizHeader[i] = i;
                for (let j = 0; j < $scope.matriz[i].length; j++) {
                    $scope.matriz[i][j] = 0;
                }
            }
            console.log($scope.matriz);
        }

        $scope.generateMatriz = function () {
            //
            $scope.nodesMatrix = [];
            $scope.edgesMatrix = [];
            for (let i = 0; i < $scope.matriz.length; i++) {
                $scope.nodesMatrix.push({
                    id: i, label: `${i}`
                });
            }
            console.log($scope.nodesMatrix);
            for (let i = 0; i < $scope.matriz.length; i++) {
                for (let j = 0; j < $scope.matriz[i].length; j++) {
                    console.log($scope.matriz[i][j], i,j);
                    if($scope.matriz[i][j] > 0){
                        console.log("Entro");
                        $scope.edgesMatrix.push({from: i, to:j});
                    }

                }
            }
            console.log($scope.edgesMatrix);
            $scope.data = {
                nodes: $scope.nodesMatrix,
                edges: $scope.edgesMatrix
            };
            $scope.network = new vis.Network($scope.container, $scope.data, {});

            //{A:C, B:[C,D], C:[B:D], D:A}

        }

        $scope.getNumber = function (){
            return $scope.rows += 1;
        };

        $scope.nodes = [
            {id: 1, label: 'A'},
            {id: 2, label: 'B'},
            {id: 3, label: 'C'},
            {id: 4, label: 'D'},
            {id: 5, label: 'E'},
            {id: 6, label: 'F'},
            {id: 7, label: 'G'},
            {id: 8, label: 'H'},
            {id: 9, label: 'I'},
            {id: 10, label: 'J'},
            {id: 11, label: 'K'},
            {id: 12, label: 'L'},
            {id: 13, label: 'M'}
        ];

        // create an array with edges
        $scope.edges = [
            {from: 1, to: 2},
            {from: 1, to: 8},
            {from: 1, to: 9},
            {from: 1, to: 7},
            {from: 2, to: 10},
            {from: 2, to: 4},
            {from: 2, to: 3},
            {from: 3, to: 10},
            {from: 3, to: 4},
            {from: 4, to: 5},
            {from: 4, to: 11},
            {from: 5, to: 11},
            {from: 5, to: 6},
            {from: 6, to: 7},
            {from: 6, to: 12},
            {from: 7, to: 8},
            {from: 7, to: 12},
            {from: 12, to: 11},
            {from: 11, to: 13},
            {from: 13, to: 9}
        ];

        // create a network
        $scope.container = document.getElementById('visualization');
        $scope.data = {
            nodes: $scope.nodes,
            edges: $scope.edges
        };
        $scope.network = new vis.Network($scope.container, $scope.data, {});

    }]);
