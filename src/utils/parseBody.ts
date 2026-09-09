import { IncomingMessage } from "http";
import { ApiError } from "./ApiError.js";

// Reads and parses a JSON body from an incoming request.
// Rejects with a 400 ApiError if the body is not valid JSON.
export function parseJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;
    });

    req.on("end", () => {
      if (!raw.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(ApiError.badRequest("Invalid JSON in request body."));
      }
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
}
