import React, { FC } from "react"
import { Box, Button, useTheme } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

/*export const useStyles = makeStyles((theme) => ({
  sessionNotificationContainer: {
    [theme.breakpoints.down("xs")]: {
      right: theme.spacing(7.5),
    },
  },
}))*/

const useStyles = makeStyles((theme) => ({
    test: () => ({
        backgroundColor: theme.palette.secondary.main,
    }),
}))

export interface NotificationsListProps {
    styles: any
}

export const NotificationsList: FC<NotificationsListProps> = ({ styles }) => {
    const classes = useStyles(styles)
    const theme = useTheme()
    /*useEffect(() => {
      if (socket) {
        //
      }
    }, [socket])*/
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
            paddingX={2}
        >
            theme: {theme.palette.secondary.main}
            <Button className={classes.test}>Vvvv</Button>
        </Box>
    )
}
