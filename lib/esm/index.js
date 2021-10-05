var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useEffect, useMemo } from "react";
import { Box, Popover, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Star } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { Notification } from "./notification";
var useStyles = makeStyles(function (theme) { return ({
    /*test: (props: { backgroundColor: string }) => ({
      backgroundColor: theme.palette.secondary.main,
    }),*/
    notificationsCount: {
        position: "absolute",
        top: 0,
        right: theme.spacing(1),
        height: theme.spacing(3),
        width: theme.spacing(3),
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        zIndex: 9999,
        borderSize: 1,
        borderRadius: "100%",
    },
    popoverPaper: {
        padding: theme.spacing(1, 2),
        "&.MuiPaper-root": {
            top: 0,
        },
    },
    counter: {
        fontSize: 12,
    },
    popoverTrigger: {
        borderSize: 1,
        borderRadius: "100%",
        backgroundColor: "#fff",
        padding: theme.spacing(2),
        "&.Mui-disabled": {
            backgroundColor: "#fff",
        },
        "&.MuiPaper-root": {
            maxHeight: "calc(30% - 32px)",
        },
    },
    inline: {
        display: "inline",
    },
}); });
export var NotificationsList = function (_a) {
    var styles = _a.styles, socket = _a.socket, userId = _a.userId, getUser = _a.getUser, onJoiningSession = _a.onJoiningSession, onJoiningLiveSession = _a.onJoiningLiveSession, getMessages = _a.getMessages;
    var classes = useStyles(styles);
    var _b = React.useState(null), anchorEl = _b[0], setAnchorEl = _b[1];
    var handlePopoverClose = function () {
        if (anchorEl)
            setAnchorEl(null);
    };
    var _c = useState([]), notifications = _c[0], setNotification = _c[1];
    var handlePopoverOpen = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var isDrawerOpened = Boolean(anchorEl);
    var userNotifications = useMemo(function () {
        return notifications.filter(function (notification) {
            return notification.from_user !== userId;
        });
    }, [notifications]);
    useEffect(function () {
        getMessages(userId).then(function (messages) {
            var notificationList = messages === null || messages === void 0 ? void 0 : messages.reverse();
            setNotification(notificationList);
        });
    }, []);
    useEffect(function () {
        if (socket) {
            socket.on("message.sent", function (data) {
                var _a;
                if (((_a = data.message) === null || _a === void 0 ? void 0 : _a.type) !== "chat") {
                    setNotification(function (prevState) {
                        console.log(prevState.length, data.message);
                        return __spreadArray([data.message], prevState, true);
                    });
                }
            });
        }
    }, [socket]);
    return (React.createElement(Box, { display: "flex", justifyContent: "center", alignItems: "center", position: "relative", paddingX: 2 },
        React.createElement(Box, { display: "flex", justifyContent: "center", alignItems: "center", className: classes.notificationsCount },
            React.createElement(Typography, { className: classes.counter }, (userNotifications === null || userNotifications === void 0 ? void 0 : userNotifications.length) || 0)),
        React.createElement(IconButton, { classes: { root: classes.popoverTrigger }, onClick: handlePopoverOpen, disabled: isDrawerOpened || !(userNotifications === null || userNotifications === void 0 ? void 0 : userNotifications.length) },
            React.createElement(Star, null)),
        React.createElement(Popover, { id: "mouse-over-popover", open: isDrawerOpened && !!(userNotifications === null || userNotifications === void 0 ? void 0 : userNotifications.length), anchorEl: anchorEl, classes: { paper: classes.popoverPaper }, anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
            }, onClose: handlePopoverClose, disableRestoreFocus: true },
            React.createElement(Box, { key: 1, display: "flex", alignItems: "center" },
                React.createElement(List, null, userNotifications.map(function (notification, index) { return (React.createElement(Notification, { key: index, notification: notification, getUser: getUser, closePopover: handlePopoverClose, onJoining: onJoiningSession, onJoiningLiveSession: onJoiningLiveSession })); }))))));
};
