
import { IncomingMessage, ServerResponse } from "http";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";
import { ApiError } from "../utils/ApiError.js";


const ITEMS_ROOT = /^\/items\/?$/;
const ITEM_BY_ID = /^\/items\/([^/]+)\/?$/;


export async function handleItemRoutes(
  req: IncomingMessage,
  res: ServerResponse,
  pathname: string
): Promise<boolean> {
  const method = req.method ?? "GET";


  if (ITEMS_ROOT.test(pathname)) {
    if (method === "GET") {
      getAllItems(req, res);
      return true;
    }
    if (method === "POST") {
      await createItem(req, res);
      return true;
    }
    throw ApiError.badRequest(`Method '${method}' not allowed on /items.`);
  }


  const match = pathname.match(ITEM_BY_ID);
  if (match) {
    const id = decodeURIComponent(match[1]);

    if (method === "GET") {
      getItemById(req, res, id);
      return true;
    }
    if (method === "PUT") {
      await updateItem(req, res, id);
      return true;
    }
    if (method === "DELETE") {
      deleteItem(req, res, id);
      return true;
    }
    throw ApiError.badRequest(`Method '${method}' not allowed on /items/:id.`);
  }

  return false;
}
