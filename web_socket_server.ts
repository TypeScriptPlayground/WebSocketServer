export function WebSocketServer(options : Deno.ServeOptions | Deno.ServeTlsOptions, handler : (webSocket : WebSocket, request? : Request) => void) {
    Deno.serve({...options, onListen({hostname, port}) {
        console.log(`Listening on ws://${hostname}:${port}/ (WebSocketServer)`);
    }}, (request) => {
        if (request.headers.get("upgrade") != "websocket") {
            return new Response(null, { status: 501 });
        }

        // Needed because of a bug: https://github.com/denoland/deno/issues/19471
        const req = Object.assign({}, request)

        const {socket, response} = Deno.upgradeWebSocket(request)

        handler(socket, req);

        return response
    })
}
