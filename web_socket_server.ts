export function WebSocketServer(options : Deno.ServeOptions | Deno.ServeTlsOptions, handler : (webSocket : WebSocket, request? : Request) => void) {
    Deno.serve({...options, onListen({hostname, port}) {
        console.log(`Listening on ws://${hostname || 'localhost'}:${port}/ (WebSocketServer)`);
    }}, (request) => {
        if (request.headers.get("upgrade") != "websocket") {
            return new Response(null, { status: 501 });
        }
        const {socket, response} = Deno.upgradeWebSocket(request)

        handler(socket, request)

        return response
    })
}
