; (function (window, angular, $, undefined) {

    'use strict';

    function controller(
        $scope,
		$routeParams,
        $anchorScroll, 
        $location, 
        $timeout,
		$log,
        $q,
        $moment,
        $sce,
        planService,
        context,
        configService
		) {        

        var componentName = "plan";
        var timeStart, timeEnd, timeLabels, timeDiff, numberOfMonths, numberOfYears;
        
        function initConfig() { 
            return configService.getConfig(componentName).then(function(config) {                
                timeStart = moment(config.timeStart, 'DD/MM/YYYY');
                timeEnd = moment(config.timeEnd, 'DD/MM/YYYY');
                timeLabels = config.timeLabels;
                timeDiff = Math.abs(timeStart.diff(timeEnd));
                numberOfMonths = Math.ceil(Math.abs(timeStart.diff(timeEnd, 'months', true)));
                numberOfYears = timeEnd.year() - timeStart.year() + 1;   
            });
        }

        /*$scope.siteCollectionUrl = context.siteCollectionUrl;
        $scope.appUrl = context.appUrl;
        $scope.webUrl = context.webUrl;*/ 
        $scope.siteAssetsUrl = context.siteAssetsUrl;

        $scope.params = $routeParams;
        $scope.data = {};
        $scope.settingsUrl = context.appConfigRootUrl;
        $scope.editUrl = context.webUrl + "/Lists/Scenario/AllItems.aspx";
        $scope.accessibleUrl = context.webUrl + "/Lists/Scenario/AccessibleAllItems.aspx?IsDlg=1";
        $scope.detailToggle = {};
        $scope.detailToggle.checked = false;    
        $scope.isEditor = false;     
        $scope.detail = "Select an event for more detail";
        $scope.eventTitle = "Event Detail";

        $scope.busy = false;

        var eventTypes = {};

        var $window = $(window);        

        $scope.snapshot = function(filename) {
            planService.saveSnapshot(filename, $scope.data);
        };

        $scope.syncSecurity = function(filename) {
            //TODO: implement
        };
                
        // $scope.resizeDetail = function(expand) {
        //     if (expand) {
        //         $scope.detailColWidth = 9;
        //         $scope.detailIcon = "fullscreen exit";
        //     }
        //     else {
        //         $scope.detailColWidth = 3;
        //         $scope.detailIcon = "fullscreen";
        //     }
        // }  
        // $scope.resizeDetail(false);      

        function bindTextOnClick(textObject, hitMargin, parentShape, fn) {
            var hit = new createjs.Shape();
            var bounds = textObject.getTransformedBounds();
            var heightMargin = (hitMargin - bounds.height) / 2;                    
            hit.graphics.beginFill("#000000").drawRect(0, 0 - heightMargin, bounds.width, bounds.height + heightMargin);
            
            textObject.hitArea = hit;
            textObject.hitArea.cursor = textObject.cursor = "pointer";

            textObject.on("click", function () {                        
                fn();
            });

            parentShape.graphics
                .setStrokeStyle(1)
                .setStrokeDash([2,2], 0)
                .beginStroke("#fffffff")
                .moveTo(bounds.x, bounds.y + bounds.height)
                .lineTo(bounds.x + bounds.width + 8, bounds.y + bounds.height)
                .endStroke();
        }

        var stage, canvas, bg, mg, sfg, fg, bgText, fgText, shapes, containerIcon;
        function initStage() {
            if (stage) {
                stage.removeAllChildren();
                stage.update();                
            }
            stage = new createjs.Stage('timelineCanvas');    
                stage.enableMouseOver();
                canvas = stage.canvas;    
            containerIcon = new createjs.Container();
            bg = new createjs.Shape();
            mg = new createjs.Shape();
            sfg = new createjs.Shape();
            fg = new createjs.Shape();
            bgText = [];
            fgText = [];
            shapes = [];
        }

        var linePadding = 3;

        var canvasHeight, canvasWidth, yLabelWidth, yearOffset, yearLabelHeight, minLineHeight, monthWidth, 
            timeWidth, barHeight, barFontSize, subLineHeight, keyPrioritiesBarWidth, keyWidth, keyX, lineScale, streamPadding;
        function setCanvasHeight() {
            lineScale = 2.2;
                       
            yearLabelHeight = 100; 
            canvasHeight = yearLabelHeight;
            canvasWidth = $('#timelineCanvas').width();
            //yLabelWidth = 120;
            yLabelWidth = 270;            
            yearOffset = yLabelWidth + 1;
            barHeight = 16 * lineScale;
            //barHeight = 18 * lineScale;
            barFontSize = 6 * lineScale;
            //barFontSize = 6 * lineScale;
            minLineHeight = (barHeight + linePadding) * 2;
            subLineHeight = barHeight + (3 * lineScale);             
            //keyWidth = 120;
            keyWidth = 0;
            keyX = canvasWidth - keyWidth;
            timeWidth = canvasWidth - yLabelWidth - keyWidth;
            monthWidth = timeWidth / numberOfMonths;
            keyPrioritiesBarWidth = 20;
            streamPadding = 3 * lineScale;
        }

        function tick(event) {
            if(stage) {
                stage.update();
            }
        }

        $scope.toggleRefresh = function() {
            resize();
        }

        function resize() {
            initStage();
            setCanvasHeight();
            //TODO: update items instead of nuking the whole thing?
            drawChart();
        }

        function oversample() {
            $('#timelineCanvas').height(canvasHeight);
            //oversample for better, crisper resolution!
            var oversample = 2;
            canvas.height = canvasHeight * oversample;
            canvas.width = canvasWidth * oversample;
            stage.scaleX = oversample;
            stage.scaleY = oversample;
        }

        function drawYear(fill, label, labelFill, firstMonth, lastMonth) {
            var firstMonth = (typeof firstMonth !== 'undefined') ? firstMonth : 0;
            var lastMonth = (typeof lastMonth !== 'undefined') ? lastMonth : 11;

            var months = lastMonth - firstMonth + 1;
            var yearWidth = months * monthWidth;

            //header
            bg.graphics
                .setStrokeStyle(6)
                .beginStroke(labelFill)
                .beginFill(labelFill)
                .drawRect(yearOffset, 0, yearWidth, yearLabelHeight)
                .beginStroke("#eaeaea")
                .moveTo(yearOffset, yearLabelHeight / 2)
                .lineTo(yearOffset + yearWidth, yearLabelHeight / 2)
                .endStroke()
                ;
            
            //header label
            var labelText = new createjs.Text(label, '22px Montserrat', '#525252');
            //labelText.x = yearOffset + (yearWidth / 2);
            labelText.x = yearOffset - 15;
            labelText.y = yearLabelHeight * 0.25;
            labelText.textAlign = "left";
            labelText.textBaseline = "middle";
            bgText.push(labelText);


            //TODO: create object array of config
            //months
            var monthOffset = yearOffset;
            for (var i = firstMonth; i <= lastMonth; i++) {
                //var monthColour = fill;
                var monthColour = "rgba(225,225,255,0.5)"
                var monthLabel = "";
                var monthLabelColour = "#000";
                var monthFont = "14px Montserrat";
                var monthLabelX = monthOffset;
                var monthLabelY = yearLabelHeight * 0.75;
                var monthLabelRotation = 0;         
                var monthTextAlign = "center";    
                var monthBaseline = "middle";   
                switch (i) {
                    case 0: // Jan
                        monthLabel = "Jan";
                        monthTextAlign = "center";
                        break;
                    case 1:
                        monthLabel = "Add. Estimates";
                        //monthColour = "#b6d9de";
                        monthColour = "rgba(250,250,250,0.5)"
                        monthFont = "bold 14px Arial";
                        monthLabelColour = "#bbb";
                        //monthLabelColour = "#3195a1";
                        monthLabelRotation = 90;
                        monthLabelX += monthWidth / 2;
                        monthLabelY = (canvasHeight - yearLabelHeight) * .7;
                        break;
                    case 9:
                        monthLabel = "Supp. Estimates";
                        //monthColour = "#c6d9f1";
                        monthColour = "rgba(255,255,255,0.25)"
                        monthLabelColour = "#bbb";
                        monthFont = "bold 14px Arial";
                        //monthLabelColour = "#3195a1";
                        monthLabelRotation = 90;
                        monthLabelX += monthWidth / 2;
                        monthLabelY = (canvasHeight - yearLabelHeight) * .7;
                        break;
                    case 10:// Myefo
                        monthLabel = "MYEFO";
                        //monthColour = "#b6d9de";
                        monthColour = "rgba(250,250,250,0.5)"
                        monthFont = "bold 14px Arial";
                        monthLabelColour = "#bbb";
                        //monthLabelColour = "#3195a1";
                        monthLabelRotation = 90;
                        monthLabelX += monthWidth / 2;
                        monthLabelY = (canvasHeight - yearLabelHeight) * .7;
                        break;
                    case 4: // Budget
                        monthLabel = "Budget";
                        //monthColour = "#c6d9f1";
                        monthColour = "rgba(255,255,255,0.25)"
                        monthFont = "bold 14px Arial";
                        monthLabelColour = "#bbb";
                        //monthLabelColour = "#3195a1";
                        monthLabelRotation = 90;
                        monthLabelX += monthWidth / 2;
                        monthLabelY = (canvasHeight - yearLabelHeight) * .7;
                        break;                    
                    // case 2: //COAG
                    // case 9: //COAG
                    //     monthLabelX += monthWidth;
                    //     monthLabel = "COAG";                        
                    //     monthFont = "10px Arial";
                    //     break;
                    case 6: // July
                        monthLabel = "Jul";
                        monthTextAlign = "center";
                        break;
                    default:
                        break;
                }
                bg.graphics
                    .setStrokeStyle(2)
                    .beginStroke('rgba(255,255,255,0.5)')
                    .beginFill(monthColour)
                    .drawRect(monthOffset, yearLabelHeight + 1, monthWidth, canvasHeight - yearLabelHeight)
                    ;               

                if (monthLabel) {                    
                    var monthText = new createjs.Text(monthLabel, monthFont, monthLabelColour);
                    monthText.rotation = monthLabelRotation;                    
                    monthText.x = monthLabelX;
                    monthText.y = monthLabelY;
                    monthText.textAlign = monthTextAlign;
                    monthText.textBaseline = monthBaseline;
                    bgText.push(monthText);
                }

                // EOY and EOFY dividers
                switch (i) {                    
                    case 0: // Jan
                    case 6: // July
                        drawDivider(monthOffset);
                        // Draw circles above Months
                        bg.graphics
                            .beginStroke("#bbb")
                            .beginFill("#bbb")
                            .drawCircle(monthOffset, monthText.y - 25, 8)
                        break;
                }

                if (i == lastMonth) { // round off chart
                    drawDivider(monthOffset + monthWidth);
                }

                monthOffset += monthWidth;
            }

            yearOffset += yearWidth;
        }

        function drawDivider(x) {
            bg.graphics
                .setStrokeStyle(2)
                //.beginStroke('#409CA9')
                .beginStroke('rgba(150,200,200,0.5)')
                //.beginStroke('#e1e1e1')
                .moveTo(x, yearLabelHeight)
                .lineTo(x, canvasHeight)
                .endStroke()
                ;
        }

        function drawXAxis() {
            var icon = ''
            var yLabelText = '';
            var yLabelHeader = new createjs.Text(yLabelText, 'bold 22px Montserrat', '#3a99a7');
            yLabelHeader.x = 10;
            yLabelHeader.y = 10;
            yLabelHeader.lineWidth = yLabelWidth - yLabelHeader.x;
            fgText.push(yLabelHeader); 

            // Sort by keyPriority, then topicOrder            
            $scope.data.sort(function (a, b) {
                return a.keyPriority == b.keyPriority
                    ? a.topicOrder - b.topicOrder
                    : b.keyPriority - a.keyPriority;
            });
            
            var offset = yearLabelHeight;
            var isKeyPrioritiesDrawn = false;
            $scope.data.forEach(function(topic, index) {
                var iconPath = topic.topicIcon;

                var icon = new createjs.Bitmap(iconPath);
                var toggleIcon = new createjs.Bitmap("");//new createjs.Bitmap("/sites/IB/SiteAssets/apps/css/images/ic_expand_more_black_24dp_1x.png");

                var title = topic.topicTitle;
                var drawnHeight = drawData(topic.items, offset);
                var lineHeight = drawnHeight > minLineHeight ? drawnHeight : minLineHeight;                
                var lineY = offset + lineHeight;

                // key priorities bar
                if (!isKeyPrioritiesDrawn && !topic.keyPriority) {
                    if (index == 0) {
                        isKeyPrioritiesDrawn = true;
                    }
                    else {
                        var keyPrioritiesBarHeight = offset - yearLabelHeight;
                        fg.graphics
                            .setStrokeStyle(2)
                            .beginStroke('rgba(179,224,224,0.75)')
                            .beginFill('rgba(179,224,224,0.75)')
                            .drawRect(0, yearLabelHeight, keyPrioritiesBarWidth, keyPrioritiesBarHeight)
                            ;
                        var keyPrioritiesText = new createjs.Text("Key reform priorities", "Bold 16px Montserrat", "#525252");
                        keyPrioritiesText.x = keyPrioritiesBarWidth / 2;
                        keyPrioritiesText.y = yearLabelHeight + keyPrioritiesBarHeight / 2;
                        keyPrioritiesText.rotation = -90;
                        keyPrioritiesText.textAlign = "center";
                        keyPrioritiesText.textBaseline = "middle";
                        fgText.push(keyPrioritiesText);

                        isKeyPrioritiesDrawn = true;
                    }
                }
                
                // x-axis lines
                mg.graphics
                    .setStrokeStyle(1)
                    //.beginStroke('#b3b3b3')
                    .beginStroke('rgba(150,200,200,0.3)')
                    .moveTo(0, lineY)
                    .lineTo(canvasWidth - keyWidth, lineY)
                    .endStroke()
                    ;

                // labels
                var fontSize = barFontSize * 1.2;
                var labelText = new createjs.Text(title, fontSize + 'px Montserrat', '#525252');
                labelText.textAlign = "left";//"right";
                labelText.textBaseline = "middle";
                labelText.x = 60;//yLabelWidth - 20;
                labelText.lineWidth = yLabelWidth - 30;
                var bounds = labelText.getBounds();
                // labelText.hitArea = bounds;
                labelText.y = offset + (lineHeight / 2) 
                    - ((bounds.height / fontSize) - 1) * fontSize * 0.5; //Adjusting for multi-line text
                    
                // expand or collapse icons
                toggleIcon.x = labelText.lineWidth + 15;
                toggleIcon.y = labelText.y - 10;
                toggleIcon.width = 24;
                
                // Topic Icon
                icon.width = icon.height = 24;
                icon.scaleX = icon.scaleY = 1.0;
                icon.x = labelText.x - (icon.width *2);//labelText.x - toggleIcon.x;
                icon.y = labelText.y - 20;
                icon.alpha = 0.3;

                // // hit area
                bindTextOnClick(labelText, lineHeight, mg, $scope.toggleDetail);

                // var hitContainer = new createjs.Container();
                // var topicHit = new createjs.Shape();
                // // hitContainer.addChild(topicHit);
                
                // // Right aligned LabelText
                // // topicHit.graphics.beginFill("rgba(255,255,255,0.1)").drawRect((labelText.x - labelText.lineWidth), toggleIcon.y, labelText.lineWidth + toggleIcon.width, 30);
                // // Left aligned LabelText
                // topicHit.graphics.beginFill("rgba(255,255,255,0.1)").drawRect((labelText.x - (icon.width * icon.scaleX)), toggleIcon.y, labelText.lineWidth + icon.width, 30);
                // topicHit.cursor =  "pointer";
                
                fgText.push(labelText, icon, toggleIcon);

                offset += lineHeight;
                canvasHeight += lineHeight;

            });
        }

        function getFilteredRows(array, filter) {
            var filteredRowIndices = [];
            array.forEach(function(row, index) {
                if (row[filter.column] == filter.value) {
                    filteredRowIndices.push(index);
                }
            });

            return filteredRowIndices;
        }

        function drawData(data, offset) {
            offset += streamPadding;     
            var maxLineHeight = 0;
            
            var sortedRows = data.sort(function(a, b) {               
                return a.stream - b.stream == 0
                    ? moment(a.startDate) - moment(b.startDate)
                    : a.stream - b.stream;
            });

            var detailIndex = 0;
            var streamOffset = 0;
            var streamCount = 0;
            var previousRows = [];            
            sortedRows.filter(function(row) {
                var start = moment(row.startDate);
                var end = moment(row.endDate);
                var show = row.displayIn == "Both" || row.displayIn == null 
                    || $scope.detailToggle.checked && row.displayIn == "Detail" || !$scope.detailToggle.checked && row.displayIn == "Overview"; 
                    // draw things appropraite to the current details setting
                return show && start <= timeEnd && end >= timeStart; // don't draw things that start before the end or end before the start
            })
            .forEach(function(row, i) {
                var id = id;
                var label = row.title;
                var start = moment(row.startDate);
                var end = moment(row.endDate);
                var eventType = row.eventType;
                var colour = row.colour;
                var shape = row.shape;
                var positionOverride = row.positionOverride;
                var textPositionOverride = row.textPositionOverride;
                var stream = row.stream;
                var displayIn = row.displayIn;
                var detail = row.detail;                                                

                var lineStart = getDateX(start);
                var lineEnd = getDateX(end);
                lineEnd = lineEnd > keyX ? keyX : lineEnd;
                var lineLength = lineEnd - lineStart;
                
                if (previousRows.length) {
                    var previousRow = previousRows[previousRows.length - 1]; 
                }

                if (previousRow && previousRow.stream != stream) {
                        streamOffset += Math.max.apply(null, previousRows.map(function(row) {
                            return row.subLineIndex;
                        })) + 1;
                        previousRows = [];
                        detailIndex = 0;

                        if ($scope.detailToggle.checked) {
                            var dividerY = offset + streamPadding + (streamOffset * subLineHeight);                
                            // fg.graphics    
                            //     .setStrokeStyle(2)
                            //     .beginStroke("#ffffff")
                            //     .moveTo(yLabelWidth, dividerY)
                            //     .lineTo(canvasWidth - keyWidth, dividerY)
                            //     .endStroke();    

                            offset += streamPadding * 2;
                            streamCount++;                  
                        }                    
                }

                var subLineIndex = 0;
                if (positionOverride) {
                    subLineIndex = positionOverride - 1;
                } else {
                    // ascertain subline index
                    var collisionLineIndices = [];
                    if (label) {
                        var isPointInTime = ["Cabinet submission", "Key date", "State election"].indexOf(eventType) > -1;                
                        var collisions = previousRows.filter(function(row) {
                            if (row.label && row.label.length) {
                                return false;
                            }
                            var rowIsLine = ["Policy process", "Legislation process", "Implementation"].indexOf(row.eventType) > -1;
                            var textCollision = lineStart <= row.rightTextBound + (3 * lineScale);           
                            var lineCollision = start <= row.end;          
                            return isPointInTime && rowIsLine ? textCollision : textCollision || lineCollision;                                
                        });
                        collisionLineIndices = collisions.map(function(item) {
                            return item.subLineIndex;
                        });
                    }
                    if (!collisionLineIndices.length) {
                        collisionLineIndices.push(-1);
                    }

                    collisionLineIndices.sort(function(a, b){
                        return a - b;
                    });
                
                    if ($scope.detailToggle.checked) {
                        subLineIndex = detailIndex;
                    } else {
                        var previousIndex = -1;    
                        var maxIndex = Math.max.apply(null, collisionLineIndices);
                        for (i = 0; i <= maxIndex || i < collisionLineIndices.length; i++) {
                            var index = collisionLineIndices[i];
                            var expectedSequence = previousIndex + 1; 
                            if (index > expectedSequence) { // found a hole in the sequence
                                subLineIndex = expectedSequence; 
                                break;
                            }
                            previousIndex = index;
                        }

                        if (previousIndex == maxIndex) { // If no holes, next index in sequence
                            subLineIndex = maxIndex + 1;
                        }
                    }
                }
      
                var subLineOffset = (subLineIndex + streamOffset) * subLineHeight;
                var lineY = offset + subLineOffset + (barHeight / 2);

                var shape = drawItem.event(eventType, shape, colour, lineStart, lineY, lineLength);

                if (detail) {
                    shape.cursor = "pointer";
                    // shape.beginFill("#000")
                    shape.on("click", function (event) {                        
                        handleSelect(bounds, shape, text, detail, label);
                    });
                }                
                shapes.push(shape);
                
                if ($scope.detailToggle.checked && previousRow && previousRow.stream == stream) {                
                    sfg.graphics
                        .setStrokeStyle(2)
                        .beginStroke('rgba(150,200,200,0.5)')
                        .moveTo(previousRow.lineStart + 3, previousRow.lineY)
                        .lineTo(previousRow.lineStart + 3, lineY)
                        .lineTo(lineStart + 3, lineY)
                        .endStroke();                  
                }

                if (label) {                
                    // TODO: chuck into an object, index by textPositionOverride 
                    // Text                
                    var text = new createjs.Text(label, barFontSize + "px Arial", '#000000');
                    text.x = lineStart + 5;
                    text.y = lineY;
                    text.textBaseline = "middle";
                    switch (textPositionOverride) {
                        case "Above":
                            text.y -= 6;
                            text.textAlign = "center";
                            text.textBaseline = "bottom";
                            break;
                        case "Below":
                            text.y += 6;
                            text.textAlign = "center";
                            text.textBaseline = "top";
                            break;
                        case "Left":                       
                            text.x -= 5;                       
                            text.textAlign = "right";
                            break;
                        case "Right":                        
                        default:                        
                            text.x += 10;
                            break;
                    }
                              
                    if (detail) {

                        // var textBkgd = new createjs.Shape();
                        // var hit = new createjs.Shape();
                        // var bounds = text.getTransformedBounds();
                        // var heightMargin = (subLineHeight - bounds.height) / 2;
                        // textBkgd.graphics.beginFill("rgba(255,255,255,0.5)").drawRect(text.x -15, (text.y - 15), bounds.width + 30, (bounds.height * 2));                     
                        // hit.graphics.beginFill("#000000").drawRect(0, 0 - heightMargin, bounds.width, bounds.height + heightMargin);
                    

                        var bounds = text.getTransformedBounds();
                        var itemClick = function() {
                            handleSelect(bounds, shape, text, detail, label);
                        }

                        bindTextOnClick(text, subLineHeight, fg, itemClick);
                    }

                    // fgText.push(textBkgd, text);
                    fgText.push(text);
                }

                // push row details to array for collision detection in subsequent iterations                
                var rightTextBound = text && ["Above", "Below", "Left"].indexOf(textPositionOverride) == -1 ? text.x + text.getBounds().width : 0;
                previousRows.push({stream: stream, lineStart: lineStart, lineY: lineY, end: end, rightTextBound: rightTextBound, eventType: eventType, subLineIndex: subLineIndex});

                // get max line height to return to calling function
                var height = subLineOffset + subLineHeight + ((streamCount + 1) * streamPadding * 2);
                maxLineHeight = height > maxLineHeight ? height : maxLineHeight;
                detailIndex++;
            });
            
            return maxLineHeight;
        }

        var handleSelect = function(bounds, shape, text, detail, label) {
            $scope.busy = true;
            
            unselect(highlightSelect);  
            $timeout(function() {
                $scope.detail = detail;            
                $scope.eventTitle = label;
                $scope.selected = {shape: shape, text: text};
                $scope.busy = false;
            })
            // var shadow = new createjs.Shadow("rgba(179,224,224,1.0)", 4, 4, 7);
            // shape.shadow = shadow;
            var highlightSelect = new createjs.Shape();
            highlightSelect.graphics.beginFill("rgba(179,224,224,0.2)").drawRect(text.x, (text.y - 25), bounds.width, (bounds.height * 3.8));

            text.font = "bold " + text.font;
            text.color = "darkred";

        }

        var unselect = function() {
            if ($scope.selected) {
                $scope.selected.shape.shadow = null;

                $scope.selected.text.font = $scope.selected.text.font.replace("bold ", "");
                $scope.selected.text.color = $scope.selected.text.color.replace("darkred", "#000");
            }
            
        }

        var drawItem = function() {
            function line(colour, x, y, length) {
                return new createjs.Graphics()
                    .setStrokeStyle(colour)
                    .setStrokeStyle(barHeight,'round','round')
                    .beginStroke(colour)
                    .moveTo(x, y)
                    .lineTo(x + length, y)
                    .endStroke()
                    ;
            }

            function circle(colour, x, y) {
                var radius = 3.5 * lineScale;
                return new createjs.Graphics()
                    .setStrokeStyle(1)
                    .beginStroke(colour)
                    .beginFill(colour)
                    .drawCircle(x, y, radius)
                    ;
            }

            function triangle(colour, x, y) {
                var triangleY = y + (barHeight / 5);  
                var triangleX = x = x - (3 * lineScale);

                return new createjs.Graphics()    
                    .setStrokeStyle(3,'round','round')
                    .beginStroke(colour)
                    .beginFill("transparent")
                    .moveTo(x, triangleY)
                    .lineTo(x + (3 * lineScale), triangleY - (6 * lineScale))
                    .lineTo(x + (6 * lineScale), triangleY)
                    .closePath()
                    ;
            }

            function mapMarker(colour, x, y) {
                var triangleY = y + (barHeight / 4) - (3 * lineScale);
                var triangleX = x = x - (3 * lineScale);

                var circle = new createjs.Graphics.Circle(x + 6.5, y, 7);

                return new createjs.Graphics()    
                    .setStrokeStyle(3,'round','round')
                    .beginStroke(colour)
                    .beginFill(colour)
                    .moveTo(x, triangleY)
                    .append(circle)
                    .lineTo(x + (6 * lineScale), triangleY)
                    .lineTo(x + (3 * lineScale), triangleY + 12)
                    .closePath()
                    ;
            }

            function event(title, shape, colour, x, y, length) {
                if (shape === null || colour === null) {
                    return;
                }
                
                eventTypes[title] = { title: title, shape: shape, colour: colour};
                var graphics, layer;
                switch (shape.toLowerCase()) {
                    case 'line':
                        graphics = line(colour, x, y, length);
                        layer = mg;
                        break;
                    case 'triangle':
                        graphics = triangle(colour, x, y);
                        layer = fg;
                        break;
                    case 'mapmarker':
                        graphics = mapMarker(colour, x, y);
                        layer = fg;
                        break;
                    case 'circle':
                        graphics = circle(colour, x, y);
                        layer = fg;
                        break
                    default:
                        break;
                }

                return new createjs.Shape(graphics);
            }

            // function policyProcess(x, y, length) {
            //     line('#bfbfbf', x, y, length);
            // }
            // function legislationProcess(x, y, length) {
            //     line('#ffc000', x, y, length);
            // }
            // function implementation(x, y, length) {
            //     line('#dea0db', x, y, length);
            // }
            // function cabinetSubmission(x, y) {
            //     triangle('#004759', x, y);
            // }
            // function keyDate(x, y) {
            //     circle('#008000', x, y);
            // }
            // function stateElection(x, y) {
            //     circle('#ff6600', x, y);
            // }

            return {
                // policyProcess: policyProcess,
                // legislationProcess: legislationProcess,
                // implementation: implementation,
                // cabinetSubmission: cabinetSubmission,
                // keyDate: keyDate,
                // stateElection: stateElection,
                event: event
            }         
        }();

        

        // Ascertain the x co-ordinate of a given date
        // Get ratio of date vs timeStart and apply to timeWidth, then offset by the yLabelWidth
        function getDateX(date) {
            var diff = Math.max(moment(date).diff(timeStart), 0); // If the diff is negative, treat as 0          
            return (diff / timeDiff * timeWidth + yLabelWidth);
        }

        function drawChaser() {            
            // Get ratio of today vs timescale and apply to time width
            var today = new Date();
            if (today < timeStart) {
                return;
            }

            var todayX = getDateX(today);
            var width = todayX - yLabelWidth;
            bg.graphics
                .setStrokeStyle(1)
                //.beginStroke('#f1e4c7')
                //.beginFill('#f1e4c7')
                .beginStroke('#fff')
                .beginFill('rgba(215,215,215,0.25)')
                .drawRect(yLabelWidth, yearLabelHeight + 1, width, canvasHeight - yearLabelHeight)
                ;
            var months = Math.floor(width / monthWidth);
            var monthOffset = yLabelWidth + monthWidth;            
            for (var i = 0; i < months; i++) {
                bg.graphics
                    .beginStroke("#ffffff")
                    .moveTo(monthOffset, yearLabelHeight)
                    .lineTo(monthOffset, canvasHeight)
                    .endStroke()
                    ;
                monthOffset += monthWidth;
            }
        }

        function drawKey() {
            var x = canvasWidth - keyWidth + 10;    
            var height = barHeight + 3;    
            var length = 10;    

            var keyText = new createjs.Text("KEY", "Bold 16px Arial", "#525252");
            keyText.x = x;
            keyText.y = yearLabelHeight;
            fgText.push(keyText);

            var offsetY = yearLabelHeight + height * 2;
            for (var index in eventTypes) {
                var eventType = eventTypes[index];
                var shape = drawItem.event(eventType.title, eventType.shape, eventType.colour, x, offsetY, length);
                shapes.push(shape);
                //drawItem[fnName](x, offsetY, length);

                // var label = fnName.replace(/([A-Z])/g, ' $1')
                //     .replace(/^./, function(str){ return str.toUpperCase(); })
                //     .replace(/\s\w/, function(str){ return str.toLowerCase(); });
                var text = new createjs.Text(eventType.title, barFontSize + "px Arial", '#525252');                
                text.x = x + 15;
                text.y = offsetY;   
                text.textBaseline = "middle";
                fgText.push(text);

                offsetY += height;
            }
        }

        var yearColourCombos = [
            /*{fill: '#E7F2F4', labelFill: '#86BFC8'},
            {fill: '#D7EDF0', labelFill: '#409CA9'},
            {fill: '#E7F2F4', labelFill: '#017A8D'},
            {fill: '#D7EDF0', labelFill: '#015C6A'}*/
            {fill: '#E7F2F4', labelFill: '#fff'}
        ];

        function drawYears() {
            // yLabel background
            bg.graphics            
                .setStrokeStyle(1)
                .beginStroke('#fff')
                .beginFill('#fff')
                .drawRect(0, 0, yLabelWidth, canvasHeight)
                ;
            var year = timeStart.year();
            for (var i = 0; i < numberOfYears; i++, year++) {
                var colourCombo = yearColourCombos[i % yearColourCombos.length];
                if (i == 0) { // first year
                    drawYear(colourCombo.fill, year, colourCombo.labelFill, timeStart.month());
                } else if (i == numberOfYears - 1) { // last year
                    drawYear(colourCombo.fill, year, colourCombo.labelFill, 0, timeEnd.month());
                } else { // all other years
                    drawYear(colourCombo.fill, year, colourCombo.labelFill);
                }
            }
        }

        function drawTimeLabels() {
            var labelY = yearLabelHeight * 0.75;
            timeLabels.forEach(function(timeLabel, index) {
                var labelX = getDateX(moment(timeLabel.date, "DD/MM/YYYY"));
                var text = new createjs.Text(timeLabel.label, "10px Arial", "#ffffff");
                text.x = labelX;
                text.y = labelY;
                text.textAlign = "center";
                text.textBaseline = "middle";
                fgText.push(text);
            });
        }

        function drawChart() {  
            drawXAxis();
            oversample();
            drawYears();
            drawChaser();
            //drawKey();  
            drawTimeLabels();          

            // add background
            stage.addChild(bg);
            bgText.forEach(function(item, index) {
                stage.addChild(item);
            });

            // add midground
            stage.addChild(mg);

            // add subforeground
            stage.addChild(sfg);

            //TODO: add lines to mg and other shapes to fg
            shapes.forEach(function(item, index) {
                stage.addChild(item);
            });

            // add foreground
            stage.addChild(fg);
            fgText.forEach(function(item, index) {
                stage.addChild(item);
            });

            // render the stage onto the canvas
            stage.update();
            // This is so the images get rendered
            $timeout(function() {
                stage.update();
            }, 100);
        }

        $scope.toggleDetail = function () {
            $scope.detailToggle.checked = !$scope.detailToggle.checked;    
            resize();
        } 

        $scope.trustAsHtml = function(html) {
            return $sce.trustAsHtml(html);
        }

        function refreshData() {
            $scope.busy = true;
            planService.getPlanData()
            .then(function(data) {
                $scope.data = data;
                // .filter(function(topic) {
                //     return ["NISA", "Smart Cities Plan", "Infrastructure"].indexOf(topic.topicTitle) > -1;
                // });       
            })
            .then(function() {
                
                drawChart();
            });   

            // planService.getSnapshot("test.txt").then(function(data) {
            //     $scope.data = data;
            // }).then(function() {
            //     drawChart();
            // }); 
            
            // .finally(function() {
                $scope.busy = false;
            // });
        }

        function initSecurity() {
            //planService.isEditor(context.userId).then(function(isEditor) {
                //$scope.isEditor = isEditor;
            //});

            $scope.isEditor = true;
        }

        function init() {
            initSecurity();
            initConfig().then(function() {
                initStage();
                setCanvasHeight();
                $window.resize(resize);            
                refreshData();
            });              
        }

        init();
    }

    controller.$inject = [
        '$scope',
        '$routeParams',
        '$anchorScroll', 
        '$location', 
        '$timeout',
        '$log',
        '$q',
        '$moment',
        '$sce',
        'planService',
        'context',
        'configService'
    ];

    angular.module(window.appName)
        .controller('PlanCtrl', controller);


} (window, window.angular, window.jQuery));