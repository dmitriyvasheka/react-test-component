var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState, useEffect } from "react";
import { Box, Divider, ListItem, ListItemText } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
var useStyles = makeStyles(function () { return ({
    inline: {
        display: "inline",
    },
    listItem: {
        cursor: "pointer",
    },
    notificationDate: {
        position: "absolute",
        top: 17,
        right: 0,
    },
}); });
export var NotificationsMessages;
(function (NotificationsMessages) {
    NotificationsMessages["session_invitation_notification"] = "Sent you an invite to the session";
    NotificationsMessages["session_ended_notification"] = "ended the session";
    NotificationsMessages["live_session_created_notification"] = "created a session";
})(NotificationsMessages || (NotificationsMessages = {}));
export var Notification = function (_a) {
    var _b, _c, _d;
    var notification = _a.notification, getUser = _a.getUser, closePopover = _a.closePopover, onJoining = _a.onJoining, onJoiningLiveSession = _a.onJoiningLiveSession;
    var classes = useStyles();
    var _e = useState(null), userInfo = _e[0], setUserInfo = _e[1];
    var getUserInfo = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUser(userId)];
                case 1:
                    user = _a.sent();
                    setUserInfo(user);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleJoinInvite = function (notification) {
        var _a, _b;
        onJoining && onJoining(notification.from_user, (_a = notification.payload) === null || _a === void 0 ? void 0 : _a.session_id, (_b = notification.payload) === null || _b === void 0 ? void 0 : _b.invitation_id, "join");
        closePopover();
    };
    var handleJoinLiveSession = function (notification) {
        var _a, _b;
        onJoiningLiveSession && onJoiningLiveSession((_a = notification.payload) === null || _a === void 0 ? void 0 : _a.group_id, notification.room_id, (_b = notification.payload) === null || _b === void 0 ? void 0 : _b.session);
        closePopover();
    };
    useEffect(function () {
        if (notification.from_user) {
            getUserInfo(notification.from_user);
        }
    }, [notification.from_user]);
    return (React.createElement(React.Fragment, null,
        React.createElement(ListItem, { alignItems: "flex-start", className: classes.listItem },
            React.createElement(ListItemText, __assign({ primary: (_b = notification === null || notification === void 0 ? void 0 : notification.type) === null || _b === void 0 ? void 0 : _b.replaceAll("_", " "), secondary: React.createElement(React.Fragment, null,
                    React.createElement(Typography, { component: "span", variant: "body2", className: classes.inline, color: "textPrimary" }, (_c = userInfo === null || userInfo === void 0 ? void 0 : userInfo.user) === null || _c === void 0 ? void 0 :
                        _c.first_name,
                        " ", (_d = userInfo === null || userInfo === void 0 ? void 0 : userInfo.user) === null || _d === void 0 ? void 0 :
                        _d.last_name,
                        "\u00A0"),
                    React.createElement(Box, { className: classes.notificationDate }, moment(notification === null || notification === void 0 ? void 0 : notification.created_at).fromNow(true)),
                    (notification === null || notification === void 0 ? void 0 : notification.type) && NotificationsMessages[notification === null || notification === void 0 ? void 0 : notification.type] || "sent a notification") }, ((notification === null || notification === void 0 ? void 0 : notification.type) === "session_invitation_notification" && {
                onClick: function () { return handleJoinInvite(notification); },
            }), ((notification === null || notification === void 0 ? void 0 : notification.type) === "live_session_created_notification" && {
                onClick: function () { return handleJoinLiveSession(notification); },
            })))),
        React.createElement(Divider, { variant: "inset", component: "li" })));
};
