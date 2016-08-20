var app = angular.module('firstApp', []);

app.controller('ExampleController', ['$scope','$window', function ($scope, $window) {

    angular.element($window).bind('resize', function() {
        console.log('kkkk');
    });

    $scope.customConf = {
        spacing: 50,
        diameter: 10,
        margin: 5,
        colorCutOut: 'white',
        height: 0,
        width: 0
    };

    var canvas = window._canvas = new fabric.Canvas('canvas');


    $scope.downloadCanvas = function () {

        var test = {
            konik: 'wow',
            mysz: 15
        };

        var canvas = document.getElementById("canvas");
        var image = canvas.toDataURL();
        var aLink = document.createElement('a');
        console.log('###########',aLink);
        var evt = document.createEvent("HTMLEvents");

        try
        {
            evt.initEvent("click");
            aLink.download = 'image.jpg';
            aLink.href = image;
            aLink.dispatchEvent(evt);
            console.log('Chrom like you rly');

        }
        catch (ex)
        {
            evt.initEvent("click", true, false);
            aLink.download = 'image.jpg';
            aLink.href = image;
            aLink.dispatchEvent(evt);

            console.log('IE dont like you rly dode');
        }



    };

    fabric.Image.fromURL('img.jpg', function (img) {
        canvas.add(img);
        canvas.setHeight(img.getHeight());
        canvas.setWidth(img.getWidth());
        $scope.customConf.height = img.getHeight();
        $scope.customConf.width = img.getWidth();
    });



    $scope.optionsCutOut = function (ofsetVertical, ofsetHorizontal) {
        var options = {
            top: ofsetVertical,
            left: ofsetHorizontal,
            fill: $scope.customConf.colorCutOut
        };
        options.radius = $scope.customConf.diameter;
        canvas.add(new fabric.Circle(options));
    };

    $scope.create = function () {
        var columnsNumber = ((($scope.customConf.width - (2 * $scope.customConf.margin) - $scope.customConf.diameter * 2) / ($scope.customConf.spacing + ($scope.customConf.diameter * 2))) ) + 1;
        var columns = parseInt(columnsNumber);
        var errorSumAddedColumn = (columnsNumber % columns * ($scope.customConf.spacing + ($scope.customConf.diameter * 2))) / columns;
        console.log('columnsNumber',columnsNumber,'columns',columns,'errorSumAddedColumn',errorSumAddedColumn);


        var rowsNumber = ((($scope.customConf.height -   (2 * $scope.customConf.margin) - $scope.customConf.diameter * 2) / ($scope.customConf.spacing + ($scope.customConf.diameter * 2))) ) + 1;
        var rows = parseInt(rowsNumber);
        var errorSumAddedRow = (rowsNumber % rows * ($scope.customConf.spacing + ($scope.customConf.diameter * 2))) / rows;
        console.log('rowsNumber',rowsNumber,'rows',rows,'errorSumAddedRow',errorSumAddedRow);

        var ofsetVertical = $scope.customConf.margin;
        var ofsetHorizontal = $scope.customConf.margin;

        for (var i = rows; i--;) {
            for (var j = columns; j--;) {

                if (rows == i + 1) {
                    $scope.optionsCutOut(ofsetVertical, ofsetHorizontal);
                }
                else if (j == 0) {
                    $scope.optionsCutOut(ofsetVertical, ofsetHorizontal);
                }
                else if (i == 0) {
                    $scope.optionsCutOut(ofsetVertical, ofsetHorizontal);
                }

                else if (columns == j + 1) {
                    $scope.optionsCutOut(ofsetVertical, ofsetHorizontal);
                }

                ofsetHorizontal += $scope.customConf.spacing + ($scope.customConf.diameter * 2) + errorSumAddedColumn;
            }
            ofsetHorizontal = $scope.customConf.margin;
            ofsetVertical += $scope.customConf.spacing + ($scope.customConf.diameter * 2) + errorSumAddedRow;
        }
    };

    $scope.downloadLink = function () {

        fabric.log('jpeg dataURL with low quality: ', canvas.toDataURL({
            format: 'jpg',
            quality: 1
        }));

        fabric.log('jpeg dataURL with low quality: ', canvas.toDataURL({
            format: 'png',
            left: 100,
            top: 100,
            width: 200,
            height: 200
        }));

        fabric.log('jpeg dataURL with low quality: ', canvas.toDataURL({
            format: 'png',
            multiplier: 2
        }));
    };

}]);