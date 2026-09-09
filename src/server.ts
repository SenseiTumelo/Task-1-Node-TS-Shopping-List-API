import http, { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import { handleItemRoutes } from "./routes/itemRoutes.js";
import { handleError } from "./middleware/errorHandler.js";
import { sendError } from "./utils/response.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

async function requestListener(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
    const pathname = url.pathname;

    
    if (pathname === "/" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, message: "Shopping List API is running." }));
      return;
    }

    const handled = await handleItemRoutes(req, res, pathname);

    if (!handled) {
      sendError(res, 404, `Route '${req.method} ${pathname}' not found.`);
    }
  } catch (err) {
    handleError(err, res);
  }
}

const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Shopping List API listening on http://localhost:${PORT}`);
});
