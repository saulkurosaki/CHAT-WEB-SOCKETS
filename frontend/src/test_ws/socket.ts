import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object

export const socket = io('http://localhost:3000', {
    auth: {
        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDQxYWY0ZWM4OTJlNzNiMjYwOWY5NyIsImlhdCI6MTcyODMyMjI5MiwiZXhwIjoxNzI4MzI5NDkyfQ.z0I4HeXIkmBrM6QDUzko9ppnAlKTezkiU-K7IDA7PMc"
    },
});


export interface IMessage {
    chatRoom: string;
    content: string;
}

export function sendMessageWS(msg: IMessage) {
    socket.emit("test", JSON.stringify(msg))
}
