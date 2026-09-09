import { randomUUID } from "crypto";
import type { Item, CreateItemInput, UpdateItemInput } from "./item.js";

// Data resets whenever the server restarts.
class ItemStore {
  private items: Item[] = [];

  getAll(): Item[] {
    return this.items;
  }

  getById(id: string): Item | undefined {
    return this.items.find((item) => item.id === id);
  }

  create(input: CreateItemInput): Item {
    const now = new Date().toISOString();
    const newItem: Item = {
      id: randomUUID(),
      name: input.name,
      quantity: input.quantity ?? 1,
      purchased: input.purchased ?? false,
      createdAt: now,
      updatedAt: now,
    };
    this.items.push(newItem);
    return newItem;
  }

  update(id: string, input: UpdateItemInput): Item | undefined {
    const item = this.getById(id);
    if (!item) return undefined;

    if (input.name !== undefined) item.name = input.name;
    if (input.quantity !== undefined) item.quantity = input.quantity;
    if (input.purchased !== undefined) item.purchased = input.purchased;
    item.updatedAt = new Date().toISOString();

    return item;
  }

  delete(id: string): boolean {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }
}

// Exported as a singleton so all routes share the same in-memory data
export const itemStore = new ItemStore();
