import React, {useState, useEffect, FC} from "react"
import { Box, Divider, ListItem, ListItemText } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import moment from "moment"
import { makeStyles } from "@material-ui/core/styles"
import {Notification as NotificationMessage} from "./index"
const useStyles = makeStyles(() => ({
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
}))

export enum NotificationsMessages {
  "session_invitation_notification" = "Sent you an invite to the session",
  "session_ended_notification" = "ended the session",
  "live_session_created_notification" = "created a session",
}

export interface NotificationsProps {
  notification: NotificationMessage,
  getUser: (userId: string) => Promise<any>,
  closePopover: () => void ,
  onJoining?: (
      created_by: string,
      session_id: string,
      invitation_id: string,
      status: string
  ) => Promise<void>,
  onJoiningLiveSession?: (groupId: string, roomId: string, sessionId: string) => void,
}

export const Notification: FC<NotificationsProps> = ({
  notification,
  getUser,
  closePopover,
  onJoining,
  onJoiningLiveSession,
}) => {
  const classes = useStyles()
  const [userInfo, setUserInfo] = useState<any>(null)

  const getUserInfo = async (userId: string) => {
    const user = await getUser(userId)
    setUserInfo(user)
  }

  const handleJoinInvite = (notification: NotificationMessage) => {
    onJoining && onJoining(
      notification.from_user,
      notification.payload?.session_id,
      notification.payload?.invitation_id,
      "join"
    )
    closePopover()
  }

  const handleJoinLiveSession = (notification: NotificationMessage) => {
    onJoiningLiveSession && onJoiningLiveSession(
      notification.payload?.group_id,
      notification.room_id,
      notification.payload?.session
    )
    closePopover()
  }

  useEffect(() => {
    if (notification.from_user) {
      getUserInfo(notification.from_user)
    }
  }, [notification.from_user])
  return (
    <>
      <ListItem alignItems="flex-start" className={classes.listItem}>
        <ListItemText
          primary={notification?.type?.replaceAll("_", " ")}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {userInfo?.user?.first_name} {userInfo?.user?.last_name}&nbsp;
              </Typography>
              <Box className={classes.notificationDate}>
                {moment(notification?.created_at).fromNow(true)}
              </Box>
              {notification?.type && NotificationsMessages[notification?.type] || "sent a notification"}
            </React.Fragment>
          }
          {...(notification?.type === "session_invitation_notification" && {
            onClick: () => handleJoinInvite(notification),
          })}
          {...(notification?.type === "live_session_created_notification" && {
            onClick: () => handleJoinLiveSession(notification),
          })}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
