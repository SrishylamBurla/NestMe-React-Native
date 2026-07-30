import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

import { useGetMeQuery } from "../services/authApi";
import { notificationApi } from "../services/notificationApi";

const SOCKET_URL =
  __DEV__
    ? "http://192.168.0.4:3000"
    : "https://www.nestme.in";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { data } = useGetMeQuery();
  const user = data?.user;

  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {

    if (!user?._id) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    // Prevent duplicate connections
    if (socket?.connected) return;

    const socketInstance = io(SOCKET_URL, {
      transports: ["polling", "websocket"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });

    setSocket(socketInstance);
    socketInstance.on("connect", () => {
      socketInstance.emit("join", user._id);
    });
    socketInstance.on("notification", (notification) => {
  
      dispatch(
        notificationApi.util.updateQueryData(
          "getNotifications",
          undefined,
          (draft) => {
            draft.unshift(notification);
          }
        )
      );

      Toast.show({
        type: "success",
        text1: notification.title,
        text2: notification.message,
      });
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("🔴 Socket Disconnected:", reason);
    });

    socketInstance.on("connect_error", (err) => {
      console.log("❌ Socket Connect Error:", err.message);
    });

    socketInstance.io.on("reconnect_attempt", () => {
      console.log("🔄 Reconnecting...");
    });

    socketInstance.io.on("reconnect", () => {
      console.log("✅ Reconnected");
    });

    return () => {
      socketInstance.removeAllListeners();
      socketInstance.disconnect();
      setSocket(null);
    };
  }, [user?._id]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}