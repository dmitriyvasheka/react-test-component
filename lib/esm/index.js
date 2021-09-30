import React from "react";
import { Box, Button, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
/*export const useStyles = makeStyles((theme) => ({
  sessionNotificationContainer: {
    [theme.breakpoints.down("xs")]: {
      right: theme.spacing(7.5),
    },
  },
}))*/
var useStyles = makeStyles(function (theme) { return ({
    test: function () { return ({
        backgroundColor: theme.palette.secondary.main,
    }); },
}); });
export var NotificationsList = function (_a) {
    var styles = _a.styles;
    var classes = useStyles(styles);
    var theme = useTheme();
    /*useEffect(() => {
      if (socket) {
        //
      }
    }, [socket])*/
    return (React.createElement(Box, { display: "flex", justifyContent: "center", alignItems: "center", position: "relative", paddingX: 2 },
        "theme: ",
        theme.palette.secondary.main,
        React.createElement(Button, { className: classes.test }, "Vvvv")));
};
