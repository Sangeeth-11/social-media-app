const io = require("socket.io")(8800, {
    cors: {
      origin: "http://localhost:5173",
    },
  });
  
  let activeUsers = [];
  
  io.on("connection", (socket) => {

    socket.on("new-user-add", (newUserId) => {
        
      if (!activeUsers.some((user) => user.userId === newUserId )&& newUserId) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
     
      io.emit("get-users", activeUsers);
    });
  
    socket.on("disconnect", () => {
     
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      
      io.emit("get-users", activeUsers);
    });
  
    socket.on("send-message", ({receiverId,message}) => {
      console.log(receiverId);
      console.log(activeUsers);
      const user = activeUsers.find((user) => user.userId === receiverId);
      console.log("Sending from socket to :", receiverId)
      console.log("Data: ", message)
       const sId=user?.socketId
      if (sId) {
        io.to(sId).emit("receive-message", message);
        console.log(sId);
      }
    });
  });