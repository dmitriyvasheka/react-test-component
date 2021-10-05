import React, { FC, useState, useEffect, useMemo } from "react"
import { Box, Popover, List } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { Star } from "@material-ui/icons"
import IconButton from "@material-ui/core/IconButton"
import { Notification } from "./notification"

const useStyles = makeStyles((theme) => ({
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
}))
export interface Notification {
    from_user: string
    payload: Record<string, any>
    room_id: string
    type?: string
    created_at: string
}
export interface NotificationsListProps {
    styles: any
    socket: any
    getUser: (userId: string) => Promise<any>
    onJoiningSession?: (
        created_by: string,
        session_id: string,
        invitation_id: string,
        status: string
    ) => Promise<void>
    onJoiningLiveSession?: (groupId: string, roomId: string, sessionId: string) => void
    userId: string
    getMessages: (roomId: string) => Promise<Notification[]>
}

export const NotificationsList: FC<NotificationsListProps> = ({
        styles,
        socket,
        userId,
        getUser,
        onJoiningSession,
        onJoiningLiveSession,
        getMessages,
    }) => {
    const classes = useStyles(styles)
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
    const handlePopoverClose = () => {
        if (anchorEl) setAnchorEl(null)
    }
    const [notifications, setNotification] = useState<Notification[]>([])
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const isDrawerOpened = Boolean(anchorEl)
    const userNotifications = useMemo(() => {
        return notifications.filter((notification: Notification) => {
            return notification.from_user !== userId
        })
    }, [notifications])
    useEffect(() => {
        getMessages(userId).then((messages) => {
            const notificationList = messages?.reverse()
            setNotification(notificationList)
        })
    }, [])
    useEffect(() => {
        if (socket) {
            socket.on("message.sent", (data: { message: Notification }) => {
                if (data.message?.type !== "chat") {
                    setNotification((prevState) => {
                        console.log(prevState.length, data.message)
                        return [data.message, ...prevState]
                    })
                }
            })
        }
    }, [socket])
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
            paddingX={2}
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                className={classes.notificationsCount}
            >
                <Typography className={classes.counter}>{userNotifications?.length || 0}</Typography>
            </Box>
            <IconButton
                classes={{ root: classes.popoverTrigger }}
                onClick={handlePopoverOpen}
                disabled={isDrawerOpened || !userNotifications?.length}
            >
                {/*htmlColor={groupNotifications?.length ? theme.palette.primary.main : "#d9d9d9"}*/}
                <Star />
            </IconButton>
            <Popover
                id="mouse-over-popover"
                open={isDrawerOpened && !!userNotifications?.length}
                anchorEl={anchorEl}
                classes={{ paper: classes.popoverPaper }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Box key={1} display="flex" alignItems="center">
                    <List>
                        {userNotifications.map((notification: Notification, index) => (
                            <Notification
                                key={index}
                                notification={notification}
                                getUser={getUser}
                                closePopover={handlePopoverClose}
                                onJoining={onJoiningSession}
                                onJoiningLiveSession={onJoiningLiveSession}
                            />
                        ))}
                    </List>
                </Box>
            </Popover>
        </Box>
    )
}
