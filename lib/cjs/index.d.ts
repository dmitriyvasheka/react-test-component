import { FC } from "react";
export interface Notification {
    from_user: string;
    payload: Record<string, any>;
    room_id: string;
    type?: string;
    created_at: string;
}
export interface NotificationsListProps {
    styles: any;
    socket: any;
    getUser: (userId: string) => Promise<any>;
    onJoiningSession?: (created_by: string, session_id: string, invitation_id: string, status: string) => Promise<void>;
    onJoiningLiveSession?: (groupId: string, roomId: string, sessionId: string) => void;
    userId: string;
    getMessages: (roomId: string) => Promise<Notification[]>;
}
export declare const NotificationsList: FC<NotificationsListProps>;
