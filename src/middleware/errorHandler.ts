import { ServerResponse } from "http";
import { ApiError } from "../utils/ApiError.js";
import { sendError } from "../utils/response.js";


export function handleError(err: unknown, res: ServerResponse): void {
  if (err instanceof ApiError) {
    sendError(res, err.statusCode, err.message);
    return;
  }

  console.error("Unexpected error:", err);
  sendError(res, 500, "Internal server error.");
}
