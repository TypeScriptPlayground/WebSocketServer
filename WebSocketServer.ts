export function WebSocketServer(options : Deno.ServeOptions | Deno.ServeTlsOptions, handler : (webSocket : WebSocket) => void) {
    Deno.serve({...options, onListen({hostname, port}) {
        console.log(`Listening on ws://${hostname}:${port}/ (WebSocketServer)`);
    }}, (request) => {
        if (request.headers.get("upgrade") != "websocket") {
            return new Response(null, { status: 501 });
        }
        const {socket, response} = Deno.upgradeWebSocket(request)

        handler(socket)

        return response
    })
}

// WebSocketServer({port: 8081}, (webSocket) => {
//     webSocket.addEventListener('open', () => {
//         console.log('WebSocket open!');
//         webSocket.send('Ping from Server!');
//     })
//     webSocket.addEventListener('message', (event) => {
//         console.log(event);
//     })
// })

// export class WebSocketServer {
//     public CLOSED : number
//     public CLOSING : number
//     public CONNECTING : number
//     public OPEN : number

//     public binaryType : BinaryType
//     public bufferedAmount : number
//     public extensions : string
//     public protocol : string
//     public readyState : number
//     public url : string

//     public onclose : ((this: WebSocket, ev: CloseEvent) => any) | null
//     public onerror : ((this: WebSocket, ev: Event | ErrorEvent) => any) | null
//     public onmessage : ((this: WebSocket, ev: MessageEvent<any>) => any) | null
//     public onopen : ((this: WebSocket, ev: Event) => any) | null

//     addEventListener<K extends keyof WebSocketEventMap>(
//         type : K | string,
//         listener : (this : WebSocket, ev : WebSocketEventMap[K]) => any | EventListenerOrEventListenerObject,
//         options? : boolean | AddEventListenerOptions,
//     ) : void {};
//     removeEventListener<K extends keyof WebSocketEventMap>(
//         type : K | string,
//         listener : (this: WebSocket, ev : WebSocketEventMap[K]) => any | EventListenerOrEventListenerObject,
//         options? : boolean | EventListenerOptions,
//     ) : void {};
//     dispatchEvent(event : Event) : boolean {};

//     send(data : string | ArrayBufferLike | Blob | ArrayBufferView) : void {};
//     close(code? : number, reason? : string) : void {};
// }
