class WebSocketService {
  static instance = null;

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }
  constructor() {
    this.socketRef = null;
  }

  connect(company, branch) {
    let path = `ws://127.0.0.1:8000/ws/staff/${company}${branch}/`;
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      /*this.socketNewMessage(
        JSON.stringify({
          command: "fetch_messages",
          companyId: company,
          branchId: branch,
        })
      );*/
      console.log("socket opened");
    };

    this.socketRef.onmessage = (e) => {
      //handle in coming message
      this.socketNewMessage(e.data);
    };

    this.socketRef.onerror = (e) => {
      console.log(e.message);
    };

    this.socketRef.onclose = () => {
      console.log("socket closed");
      this.connect();
    };
  }

  disconnect() {
    this.socketRef.close();
  }

  socketNewMessage(data) {
    //message received
    const parseData = JSON.parse(data);
    const command = parseData.command;
    console.log(parseData);
  }

  fetchMessages(data) {
    this.sendMessage({
      command: "fetch_messages",
      companyId: data.companyId,
      branchId: data.branchId,
    });
  }

  newChatMessage(message) {
    this.sendMessage({
      command: "new_message",
      staffId: message.staffId,
      companyId: message.companyId,
      branchId: message.branchId,
      permission: message.permission,
    });
  }

  sendMessage(data) {
    try {
      this.socketRef.send(
        JSON.stringify({
          ...data,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }

  waitForSocketConnection(callback) {
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;
    setTimeout(() => {
      if (socket.readyState === 1) {
        console.log("connection is secure");
        if (callback != null) {
          callback();
        }

        return;
      } else {
        console.log("waiting for connection...");
        recursion(callback);
      }
    }, 1);
  }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
