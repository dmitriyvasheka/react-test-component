"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsList = void 0;
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
/*export const useStyles = makeStyles((theme) => ({
  sessionNotificationContainer: {
    [theme.breakpoints.down("xs")]: {
      right: theme.spacing(7.5),
    },
  },
}))*/
var useStyles = (0, styles_1.makeStyles)(function (theme) { return ({
    test: function () { return ({
        backgroundColor: theme.palette.secondary.main,
    }); },
}); });
var NotificationsList = function (_a) {
    var styles = _a.styles;
    var classes = useStyles(styles);
    var theme = (0, core_1.useTheme)();
    /*useEffect(() => {
      if (socket) {
        //
      }
    }, [socket])*/
    return (react_1.default.createElement(core_1.Box, { display: "flex", justifyContent: "center", alignItems: "center", position: "relative", paddingX: 2 },
        "theme: ",
        theme.palette.secondary.main,
        react_1.default.createElement(core_1.Button, { className: classes.test }, "Vvvv")));
};
exports.NotificationsList = NotificationsList;
