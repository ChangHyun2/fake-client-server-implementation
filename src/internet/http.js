import network from "./network";
import { TimeoutPromise } from "../utils";

const http = async (destination, message) => {
  try {
    // network에서 receiver를 찾고
    const receiver = await TimeoutPromise((res, rej) => {
      const findedReceiver = network.find(
        (node) => node.origin === destination.origin
      );

      if (!findedReceiver) {
        rej(new Error("url is not defined"));
      }
      res(findedReceiver);
    }, 1000);

    // 전송하는 메세지가 서버가 전송하는 응답 message일 경우
    if (message.headers.server) {
      console.log("catch by client");
      return receiver.catch(message);
    }

    // 전송하는 메세지가 클라이언트가 전송하는 요청 message일 경우
    if (message.headers.host) {
      if (!receiver.routers[message.method]) {
        throw new Error(
          `${message.method} method is not possible in ${destination}`
        );
      }

      const receiverRouter = receiver.routers[message.method][destination.path];
      return receiverRouter.catch(message);
    }
  } catch (e) {
    throw new Error(e);
  }
};

export default http;
