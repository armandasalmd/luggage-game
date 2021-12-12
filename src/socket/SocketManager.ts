import { io, Socket } from "socket.io-client";
import AuthUtils from "@utils/Auth";
import RouteUtils from "@utils/Route";
import Constants from "@utils/Constants";

class SocketManager {
  private static instance: SocketManager;
  private socket: Socket;

  private get socketOptions() {
    return {
      auth: {
        token: AuthUtils.getPlainJwtToken(),
      },
    };
  }

  private constructor() {
    this.socket = io(RouteUtils.resolveHostName(), this.socketOptions);
  }

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }

    return SocketManager.instance;
  }

  public emitEvent(eventName: string, payload: any, callback?: (result: any) => void) {
    this.socket.emit(eventName, payload, callback);
  }

  public emitEventAsync(eventName: string, payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let timer: any;

      if (Constants.env === "production") {
        timer = setTimeout(() => {
          reject();
        }, 8000);
      }

      this.socket.emit(eventName, payload, (result: any) => {
        if (timer) clearTimeout(timer);
        resolve(result);
      });
    });
  }

  public listenToEvent(eventName: string, callback: (dataFromServer: any) => void) {
    this.socket.on(eventName, callback);
  }

  public removeAllListeners() {
    this.socket.removeAllListeners();
  }
}

export default SocketManager;
