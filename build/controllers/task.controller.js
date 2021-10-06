"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskController = /** @class */ (function () {
    function TaskController() {
    }
    TaskController.GetTask = function (req, res) {
        var id = req.params.id;
    };
    TaskController.AddTask = function (req, res) {
    };
    TaskController.DeleteTask = function (req, res) {
        var id = req.params.id;
    };
    return TaskController;
}());
exports.default = TaskController;
