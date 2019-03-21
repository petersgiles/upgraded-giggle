; (function(window, angular, undefined) {
    'use strict';
    
    function Service($http, $q, $moment, sharePointService) {
        var listName = 'Scenario';
        var snapshotListUrl = 'Threeyear%20scenario%20snapshots';

        function getPlanData() {
            return sharePointService.getListItems(listName, SP.CamlQuery.createAllItemsQuery()).then(
                function (items) {                    
                    var data = {};                    
                    var e = items.getEnumerator();                    
                    while (e.moveNext()) {
                        var item = e.get_current();
                        if (item.get_fileSystemObjectType() == 1) { // Folder
                            var folderIcon = item.get_item("Icon");     
                            var folderName = item.get_item('FileRef').split('/').reverse()[0];
                            var topicOrder = item.get_item("TopicOrder");
                            var keyPriority = item.get_item("KeyPriority");

                            folderIcon = folderIcon !== null ? folderIcon.get_url() : folderIcon;
                            
                            data[folderName] = {
                                topicIcon: folderIcon,
                                topicTitle: folderName,
                                topicOrder: topicOrder,
                                keyPriority: keyPriority,
                                items: []
                            };
                        } else {
                            var id = item.get_item('ID');                            
                            var folderName = item.get_item('FileDirRef').split('/').reverse()[0];
                            var title = item.get_item('Title');
                            //var startDate = item.get_item('StartDate');
                            //var endDate = item.get_item('_EndDate');
                            var startDate = item.get_item('Start_x0020_Date');
                            var endDate = item.get_item('End_x0020_Date');
                            var positionOverride = item.get_item('PositionOverride');
                            var textPositionOverride = item.get_item('TextPositionOverride');
                            var stream = item.get_item('Stream') || 0;
                            var displayIn = item.get_item('DisplayIn');
                            var topic = folderName;

                            var eventType = item.get_item('EventType');
                            var colour = item.get_item('EventType_x003a_Colour');
                            var shape = item.get_item('EventType_x003a_ShapeString');

                            var detail = item.get_item('Detail');                            

                            eventType = eventType !== null ? eventType.get_lookupValue() : eventType;
                            colour = colour !== null ? colour.get_lookupValue() : colour;
                            shape = shape !== null ? shape.get_lookupValue() : shape;
                            
                            if (startDate > endDate) {
                                console.log("Could not display item: " + folderName + "\\" + title);
                            } else {
                                data[folderName].items.push({    
                                    id: id,            
                                    title: title,
                                    startDate: startDate,
                                    endDate: endDate,
                                    eventType: eventType,
                                    colour: colour,
                                    shape: shape,
                                    positionOverride: positionOverride,
                                    textPositionOverride: textPositionOverride,
                                    stream: stream,
                                    displayIn: displayIn,
                                    detail: detail                                    
                                })
                            }
                        }
                    }

                    var dataArray = [];         
                    for (var key in data) {
                        dataArray.push(data[key]);
                    }       

                    return dataArray;
                }
            );
        }

        function saveSnapshot(filename, data) {
            data.forEach(function(topic) {
                var json = JSON.stringify(topic);
                sharePointService.createFileFromString(snapshotListUrl, filename + "_" + topic.topicTitle + ".txt", json);
            });            
        }

        function getSnapshot(filename) {
            return sharePointService.getFromWeb(snapshotListUrl + "/" + filename).then(function(response) {
                return response.data;
            });
        }

        function syncSecurity(filename) {
            
        }

        function isEditor(userId) {
            return sharePointService.getUserGroups(userId).then(function(groups) {
                var isEditor = false;
                for (var index in groups) {
                    var group = groups[index];
                    if (group.Title.endsWith("Owners") || group.Title.endsWith("Members")) {
                        isEditor = true;
                        break;
                    }
                }
                return isEditor;
            });
        }

        var service = {
            getPlanData: getPlanData,
            saveSnapshot: saveSnapshot,
            getSnapshot: getSnapshot,
            isEditor: isEditor
        };

        return service;
    }

    Service.$inject = ['$http', '$q', '$moment', 'sharePointService'];

    angular.module(window.appName)
        .service('planService', Service);

}(window, window.angular));

