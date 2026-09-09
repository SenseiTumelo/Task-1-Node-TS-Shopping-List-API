import { ApiError } from "./ApiError.js";
import type { CreateItemInput, UpdateItemInput } from "../models/item.js";


export function validateCreateInput(body: any): CreateItemInput {
  if (typeof body !== "object" || body === null) {
    throw ApiError.badRequest("Request body must be a JSON object.");
  }

  const { name, quantity, purchased } = body;

  if (typeof name !== "string" || name.trim().length === 0) {
    throw ApiError.badRequest("'name' is required and must be a non-empty string.");
  }

  if (quantity !== undefined && (typeof quantity !== "number" || quantity <= 0)) {
    throw ApiError.badRequest("'quantity' must be a positive number.");
  }

  if (purchased !== undefined && typeof purchased !== "boolean") {
    throw ApiError.badRequest("'purchased' must be a boolean.");
  }

  const result: CreateItemInput = {
    name: name.trim(),
  };

  if (quantity !== undefined) {
    result.quantity = quantity;
  }

  if (purchased !== undefined) {
    result.purchased = purchased;
  }

  return result;
}


export function validateUpdateInput(body: any): UpdateItemInput {
  if (typeof body !== "object" || body === null) {
    throw ApiError.badRequest("Request body must be a JSON object.");
  }

  const { name, quantity, purchased } = body;

  if (name === undefined && quantity === undefined && purchased === undefined) {
    throw ApiError.badRequest("At least one of 'name', 'quantity', or 'purchased' must be provided.");
  }

  if (name !== undefined && (typeof name !== "string" || name.trim().length === 0)) {
    throw ApiError.badRequest("'name' must be a non-empty string.");
  }

  if (quantity !== undefined && (typeof quantity !== "number" || quantity <= 0)) {
    throw ApiError.badRequest("'quantity' must be a positive number.");
  }

  if (purchased !== undefined && typeof purchased !== "boolean") {
    throw ApiError.badRequest("'purchased' must be a boolean.");
  }

  const result: UpdateItemInput = {};

  if (name !== undefined) {
    result.name = name.trim();
  }

  if (quantity !== undefined) {
    result.quantity = quantity;
  }

  if (purchased !== undefined) {
    result.purchased = purchased;
  }

  return result;
}
