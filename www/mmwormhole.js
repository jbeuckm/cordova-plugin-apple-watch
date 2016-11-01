
var exec = require("cordova/exec");

module.exports = {
    init:function (onSuccess, onError, appGroupId) {
        exec(onSuccess, onError, "CordovaMMWormhole", "init", [{"appGroupId": appGroupId}])
    },
    registerNotifications:function (onSuccess, onError) {
        exec(onSuccess, onError, "CordovaMMWormhole", "registerNotifications", []);
    },
    sendMessage:function (message, queueName, onSuccess, onError) {
        if (typeof(message) === "object") {
            message = JSON.stringify(message);
        }
        exec(onSuccess, onError, "CordovaMMWormhole", "sendMessage", [{"queueName": queueName, "message": message }]);
    },
    sendNotification:function (onSuccess, onError, payload) {
        exec(onSuccess, onError, "CordovaMMWormhole", "sendNotification", [payload]);
    },
    sendUserDefaults:function (onSuccess, onError, obj, appGroupId) {
        var key = Object.keys(obj)[0];
        var payload = {
            "key": key,
            "value": obj[key],
            "appGroupId": appGroupId
        };
        exec(onSuccess, onError, "CordovaMMWormhole", "sendUserDefaults", [payload]);
    },
    getUserDefaults:function (onSuccess, onError, key, appGroupId) {
        var payload = {
            "key": key,
            "appGroupId": appGroupId
        };
        exec(onSuccess, onError, "CordovaMMWormhole", "getUserDefaults", [payload]);
    },
    addListener:function (queueName, onMessage) {
        var wrappedOnMessage = function (message) {
            try {
                message = JSON.parse(message);
            }
            catch (e) {
                // TODO:
            }
            onMessage(message);
        };
        exec(wrappedOnMessage, null, "CordovaMMWormhole", "addListener", [{"queueName": queueName }]);
    },
    removeListener:function (queueName, onSuccess, onError) {
        exec(onSuccess, onError, "CordovaMMWormhole", "removeListener", [{"queueName": queueName}]);
    },
    purgeQueue:function (queueName, onSuccess, onError) {
        exec(onSuccess, onError, "CordovaMMWormhole", "purgeQueue", [{"queueName": queueName}]);
    },
    purgeAllQueues:function (onSuccess, onError) {
        exec(onSuccess, onError, "CordovaMMWormhole", "purgeAllQueues", []);
    }
};
