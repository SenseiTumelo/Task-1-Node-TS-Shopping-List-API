import { ServerResponse } from "http";


export function sendJson(res: ServerResponse, statusCode: number, payload: unknown): void {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

export function sendSuccess(res: ServerResponse, statusCode: number, data: unknown): void {
  sendJson(res, statusCode, { success: true, data });
}

export function sendError(res: ServerResponse, statusCode: number, message: string, details?: unknown): void {
  sendJson(res, statusCode, {
    success: false,
    error: {
      message,
      ...(details !== undefined ? { details } : {}),
    },
  });
}
