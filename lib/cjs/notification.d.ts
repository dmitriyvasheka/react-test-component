import { FC } from "react";
import { Notification as NotificationMessage } from "./index";
export declare enum NotificationsMessages {
    "session_invitation_notification" = "Sent you an invite to the session",
    "session_ended_notification" = "ended the session",
    "live_session_created_notification" = "created a session"
}
export interface NotificationsProps {
    notification: NotificationMessage;
    getUser: (userId: string) => Promise<any>;
    closePopover: () => void;
    onJoining?: (created_by: string, session_id: string, invitation_id: string, status: string) => Promise<void>;
    onJoiningLiveSession?: (groupId: string, roomId: string, sessionId: string) => void;
}
export declare const Notification: FC<NotificationsProps>;
