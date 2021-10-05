"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsList = void 0;
var react_1 = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var icons_1 = require("@material-ui/icons");
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var notification_1 = require("./notification");
var useStyles = (0, styles_1.makeStyles)(function (theme) { return ({
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
var NotificationsList = function (_a) {
    var styles = _a.styles, socket = _a.socket, userId = _a.userId, getUser = _a.getUser, onJoiningSession = _a.onJoiningSession, onJoiningLiveSession = _a.onJoiningLiveSession, getMessages = _a.getMessages;
    var classes = useStyles(styles);
    var _b = react_1.default.useState(null), anchorEl = _b[0], setAnchorEl = _b[1];
    var handlePopoverClose = function () {
        if (anchorEl)
            setAnchorEl(null);
    };
    var _c = (0, react_1.useState)([]), notifications = _c[0], setNotification = _c[1];
    var handlePopoverOpen = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var isDrawerOpened = Boolean(anchorEl);
    var userNotifications = (0, react_1.useMemo)(function () {
        return notifications.filter(function (notification) {
            return notification.from_user !== userId;
        });
    }, [notifications]);
    (0, react_1.useEffect)(function () {
        getMessages(userId).then(function (messages) {
            var notificationList = messages === null || messages === void 0 ? void 0 : messages.reverse();
            setNotification(notificationList);
        });
    }, []);
    (0, react_1.useEffect)(function () {
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
    return (react_1.default.createElement(core_1.Box, { display: "flex", justifyContent: "center", alignItems: "center", position: "relative", paddingX: 2 },
        react_1.default.createElement(core_1.Box, { display: "flex", justifyContent: "center", alignItems: "center", className: classes.notificationsCount },
            react_1.default.createElement(Typography_1.default, { className: classes.counter }, (userNotifications === null || userNotifications === void 0 ? void 0 : userNotifications.length) || 0)),
        react_1.default.createElement(IconButton_1.default, { classes: { root: classes.popoverTrigger }, onClick: handlePopoverOpen, disabled: isDrawerOpened || !(userNotifications === null || userNotifications === void 0 ? void 0 : userNotifications.length) },
            react_1.default.createElement(icons_1.Star, null)),
        react_1.default.createElement(core_1.Popover, { id: "mouse-over-popover", open: isDrawerOpened && !!(userNotifications === null || userNotifications === void 0 ? void 0 : userNotifications.length), anchorEl: anchorEl, classes: { paper: classes.popoverPaper }, anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
            }, onClose: handlePopoverClose, disableRestoreFocus: true },
            react_1.default.createElement(core_1.Box, { key: 1, display: "flex", alignItems: "center" },
                react_1.default.createElement(core_1.List, null, userNotifications.map(function (notification, index) { return (react_1.default.createElement(notification_1.Notification, { key: index, notification: notification, getUser: getUser, closePopover: handlePopoverClose, onJoining: onJoiningSession, onJoiningLiveSession: onJoiningLiveSession })); }))))));
};
exports.NotificationsList = NotificationsList;
