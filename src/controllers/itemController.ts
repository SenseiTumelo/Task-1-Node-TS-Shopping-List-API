import { IncomingMessage, ServerResponse } from "http";
import { itemStore } from "../models/itemStore.js";
import { sendSuccess } from "../utils/response";
import { ApiError } from "../utils/ApiError";
import { validateCreateInput, validateUpdateInput } from "../utils/validate";
import { parseJsonBody } from "../utils/parseBody";

// GET /items
export function getAllItems(_req: IncomingMessage, res: ServerResponse): void {
  const items = itemStore.getAll();
  sendSuccess(res, 200, items);
}

// GET /items/:id
export function getItemById(_req: IncomingMessage, res: ServerResponse, id: string): void {
  const item = itemStore.getById(id);
  if (!item) {
    throw ApiError.notFound(`Item with id '${id}' not found.`);
  }
  sendSuccess(res, 200, item);
}

// POST /items
export async function createItem(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const body = await parseJsonBody(req);
  const input = validateCreateInput(body);
  const newItem = itemStore.create(input);
  sendSuccess(res, 201, newItem);
}

// PUT /items/:id
export async function updateItem(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
  const body = await parseJsonBody(req);
  const input = validateUpdateInput(body);

  const updated = itemStore.update(id, input);
  if (!updated) {
    throw ApiError.notFound(`Item with id '${id}' not found.`);
  }
  sendSuccess(res, 200, updated);
}

// DELETE /items/:id
export function deleteItem(_req: IncomingMessage, res: ServerResponse, id: string): void {
  const deleted = itemStore.delete(id);
  if (!deleted) {
    throw ApiError.notFound(`Item with id '${id}' not found.`);
  }
  res.writeHead(204);
  res.end();
}
