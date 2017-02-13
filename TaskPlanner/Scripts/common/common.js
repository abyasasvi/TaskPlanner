var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {
    
    //if (localStorage.tasks) {
        $.ajax({
            type: "POST",
            url: "/Home/getTasks",
            data: '{name: " Bharath" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccess,
            failure: function (response) {
                 alert(response.d);
            }
        });
    /*} else {
        $scope.tasksData = JSON.parse(localStorage.tasks);
        formatArray($scope);
        $scope.$apply();
    }*/
    function OnSuccess(response) {
        $scope.tasksData = response.data;
        //localStorage.tasks = JSON.stringify(response.data);
        formatArray($scope);
        $scope.$apply();
    };
    
    
    $scope.saveTask = function (task, index) {
        $scope.tasksData[index] = task;
        //localStorage.tasks = JSON.stringify($scope.tasksData);
        formatArray($scope);
        ajaxSaveTask();
    }
    $scope.clone = function (task) {
        return $.extend(true, {}, task);
    }
    $scope.addTask = function (tasklist) {
        $scope.addTaskObj = {};
        $scope.addTaskObj["type_name"] = tasklist.type_name;
        $scope.addTaskObj["type_id"] = tasklist.type_id;
        $scope.addTaskObj["id"] = $scope.tasksData.length + 1;
        $scope.addTaskObj["index"] = $scope.tasksData.length ;
        $scope.addTaskObj["title"] = "";
        $scope.addTaskObj["desp"] = "";
        $scope.addTaskObj["due_date"] = formatDate(new Date());
        $scope.addTaskObj["est_time"] = 1;
    }
    $scope.cancelAddTask = function () {
        $scope.addTaskObj = null;
    }
    $scope.saveAddTask = function (addTaskObj) {
        $scope.tasks[addTaskObj["type_id"]].tasks.push(addTaskObj);
        $scope.tasksData.push(addTaskObj);
        //localStorage.tasks = JSON.stringify($scope.tasksData);
        $scope.addTaskObj = null;
    }
    function ajaxSaveTask() {
       // localStorage.tasks = JSON.stringify($scope.tasksData);
        /*$.ajax({
            type: "POST",
            url: "/Home/setTasks",
            data: JSON.stringify($scope.tasksData),
            dataType : "json",
            success: OnSuccess1,
            failure: function (response) {
                alert(response.d);
            }
        });
        function OnSuccess1(response) {
            alert("Your Task is saved.");
        };*/
    }
});
function formatArray($scope) {
    $scope.tasks = {};
    for (var i in $scope.tasksData) {
        $scope.tasksData[i]["index"] = i;
        $scope.tasksData[i]["status"] = calcTimeLeft($scope.tasksData[i]["due_date"], $scope.tasksData[i]["est_time"]);
        if ($scope.tasks[$scope.tasksData[i]["type_id"]]) {
            $scope.tasks[$scope.tasksData[i]["type_id"]]["tasks"].push($scope.tasksData[i])
        } else {
            $scope.tasks[$scope.tasksData[i]["type_id"]] = {};
            $scope.tasks[$scope.tasksData[i]["type_id"]]["type_name"] = $scope.tasksData[i]["type_name"];
            $scope.tasks[$scope.tasksData[i]["type_id"]]["type_id"] = $scope.tasksData[i]["type_id"];
            $scope.tasks[$scope.tasksData[i]["type_id"]]["tasks"] = [$scope.tasksData[i]];
        }
    }
    console.log($scope.tasks);
}
function calcTimeLeft(date, est) {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(date);
    var secondDate = new Date();
    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    if (diffDays > 2*est) {
        return "success";
    } else if (diffDays > est) {
        return "warning";
    } else {
        return "danger";
    }
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
function drop(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var thisCol = angular.element($(ev.target).closest(".tasks-col")).scope().tasklist.tasks[0];
    var thistaskID = angular.element($("#" + data)).scope().task.index;
    var scope = angular.element($(".tasks-cont")).scope();
    scope.tasksData[thistaskID]["type_id"] = thisCol["type_id"];
    scope.tasksData[thistaskID]["type_name"] = thisCol["type_name"];
    /*angular.element($(ev.target).closest(".tasks-col")).scope().tasklist.tasks.push(angular.element($("#" + data)).scope().task);
    angular.element($(ev.target).closest(".tasks-col")).scope().$apply();
    angular.element($("#" + data)).scope().$parent.tasklist.tasks.splice(angular.element($("#" + data)).scope().$index, 1);
    angular.element($("#" + data)).scope().$apply();*/
    
    formatArray(scope);
    scope.$apply();
};
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
};
function allowDrop(ev) {
    ev.preventDefault();
}

app.controller('remsCtrl', function ($scope) {
   // if (!localStorage.rems) {
        $.ajax({
            type: "POST",
            url: "/Home/getRems",
            data: '{name: " Bharath" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccess,
            failure: function (response) {
                alert(response.d);
            }
        });
   /* } else {
        $scope.remsList = JSON.parse(localStorage.rems);
       // $scope.$apply();
    }*/
    function OnSuccess(response) {
        $scope.remsList = response;
       // localStorage.rems = JSON.stringify($scope.remsList);
        //formatArray($scope);
        $scope.$apply();
    };
    $scope.addRem = function () {
        $scope.addRemObj = {};
        $scope.addRemObj["id"] = $scope.remsList.length + 1;
        $scope.addRemObj["title"] = "";
        $scope.addRemObj["desp"] = "";
        $scope.addRemObj["due_date"] = formatDate(new Date());
        $scope.addRemObj["remind_before"] = 15;
    }
    $scope.saveNewRem = function (addRemObj) {
        //addRemObj.due_date = String(addRemObj.due_date);
        $scope.remsList.push(addRemObj);
       // localStorage.rems = JSON.stringify($scope.remsList);
        $scope.addRemObj = null;
    }
    $scope.cancelNewRem = function () {
        $scope.addRemObj = null;
    }
    $scope.cancelNewRem = function () {
        $scope.addRemObj = null;
    }
    $scope.saveEditRem = function (rem, index) {
        //rem.due_date = String(rem.due_date);
        $scope.remsList[index] = rem;
      //  localStorage.rems = JSON.stringify($scope.remsList);
    }
    $scope.clone = function (task) {
        return $.extend(true, {}, task);
    }
    setInterval(function () {
        for (var i in $scope.remsList) {
            diff = (new Date($scope.remsList[i].due_date) - new Date()) / 60000;
            if (diff < 0) {
                $scope.remsList[i].status = "default";
            } else if (diff < $scope.remsList[i].remind_before) {
                $scope.remsList[i].status = "danger";
            } else if (diff == $scope.remsList[i].remind_before) {
                $scope.remsList[i].status = "warning";
                alert("REMINDER: " + $scope.remsList[i].title);
            } else {
                $scope.remsList[i].status = "primary";
            }
        }
    }, 100);
});