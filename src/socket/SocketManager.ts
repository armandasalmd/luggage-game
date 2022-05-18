import { io, Socket } from "socket.io-client";
import AuthUtils from "@utils/Auth";
import RouteUtils from "@utils/Route";
import Constants from "@utils/Constants";
import { ISuccessResult } from "@engine/interfaces/server";
import message from "@components/atoms/Message/Message";

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

  public emitEventAsync<T>(eventName: string, payload: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
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

  public async emitEventHandleErrorAsync(eventName: string, payload: any): Promise<ISuccessResult> {
    const result = await this.emitEventAsync<ISuccessResult>(eventName, payload);

    if (result.success !== true && result.message) {
      message.error(result.message);
    }

    return result;
  }

  public listenToEvent(eventName: string, callback: (dataFromServer: any) => void) {
    this.socket.on(eventName, callback);

    return () => this.socket.removeListener(eventName);
  }

  public removeAllListeners() {
    this.socket.removeAllListeners();
  }

  public removeListener(eventName: string) {
    this.socket.removeListener(eventName);
  }
}

export default SocketManager;
