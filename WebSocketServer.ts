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
