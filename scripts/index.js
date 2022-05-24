import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io("ws://localhost:3000");

socket.on("connect", () => {
  console.log("connected");
});

socket.on("disconnect", () => {
  console.log("disconnected");
});

socket.on("message", (data) => {
  console.log(data);
});
