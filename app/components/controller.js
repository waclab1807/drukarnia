/**
 * Created by waclabdev on 15.08.16.
 */

app.controller('mainController', ['$scope', function($scope){

    $scope.msg = 'mainController';

    var canvas = window._canvas = new fabric.Canvas('canvas');

    /** downloading picture */
    $scope.downloadCanvas = function () {

        var canvas = document.getElementById("canvas");
        var image = canvas.toDataURL();
        var aLink = document.createElement('a');
        console.log(aLink);
        var evt = document.createEvent("HTMLEvents");

        try
        {
            evt.initEvent("click");
            aLink.download = 'image.png';
            aLink.href = image;
            aLink.dispatchEvent(evt);
            console.log('downloaded');
        }
        catch (ex)
        {
            evt.initEvent("click", true, false);
            aLink.download = 'image.png';
            aLink.href = image;
            aLink.dispatchEvent(evt);
            console.log('download failed');
        }

    };

    $scope.customConf = {
        spacing: 50,
        diameter: 10,
        margin: 5,
        colorCutOut: 'white',
        height: 0,
        width: 0
    };

    $scope.create = function () {
        console.log(canvas.getActiveObject());
        var activeObject = canvas.getActiveObject();
        if (!activeObject) canvas.remove(activeObject);
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

    $scope.optionsCutOut = function (ofsetVertical, ofsetHorizontal) {
        var options = {
            top: ofsetVertical,
            left: ofsetHorizontal,
            fill: $scope.customConf.colorCutOut
        };
        options.radius = $scope.customConf.diameter;
        canvas.add(new fabric.Circle(options));
    };

    $scope.uploader={};

    /** uploading picture */
    $scope.imageStrings = [];
    $scope.processFiles = function(files){
        angular.forEach(files, function(flowFile, i){
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                var uri = event.target.result;
                $scope.imageStrings[i] = uri;
            };
            fileReader.readAsDataURL(flowFile.file);
        });
        setTimeout(function(){
            $scope.showImage();
        },500);
    };

    $scope.showImage = function() {
        var image = new Image();
        image.onload = function() {
            var image2 = new fabric.Image(image);
            canvas.add(image2);
            image2.set({
                selectable: false
            });
                canvas.setHeight(image2.getHeight());
                canvas.setWidth(image2.getWidth());
                $scope.customConf.height = image2.getHeight();
                $scope.customConf.width = image2.getWidth();
        };
        image.src = $scope.imageStrings[0];
    };

}] );