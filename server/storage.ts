import { 
  type User, type InsertUser,
  type Retailer, type InsertRetailer,
  type Magazine, type InsertMagazine,
  type Display, type InsertDisplay,
  type Order, type InsertOrder,
  type OrderItem, type InsertOrderItem,
  type RetailerApplication, type InsertRetailerApplication,
  users, retailers, magazines, displays, orders, orderItems, retailerApplications
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Retailers
  getRetailers(): Promise<Retailer[]>;
  getRetailer(id: number): Promise<Retailer | undefined>;
  createRetailer(retailer: InsertRetailer): Promise<Retailer>;
  updateRetailer(id: number, retailer: Partial<InsertRetailer>): Promise<Retailer | undefined>;

  // Magazines
  getMagazines(): Promise<Magazine[]>;
  getMagazine(id: number): Promise<Magazine | undefined>;
  createMagazine(magazine: InsertMagazine): Promise<Magazine>;
  updateMagazine(id: number, magazine: Partial<InsertMagazine>): Promise<Magazine | undefined>;

  // Displays
  getDisplays(): Promise<Display[]>;
  getDisplay(id: number): Promise<Display | undefined>;
  createDisplay(display: InsertDisplay): Promise<Display>;
  updateDisplay(id: number, display: Partial<InsertDisplay>): Promise<Display | undefined>;

  // Orders
  getOrders(): Promise<Order[]>;
  getOrdersByRetailer(retailerId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order | undefined>;

  // Order Items
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;

  // Retailer Applications
  getRetailerApplications(): Promise<RetailerApplication[]>;
  getRetailerApplication(id: number): Promise<RetailerApplication | undefined>;
  createRetailerApplication(data: InsertRetailerApplication): Promise<RetailerApplication>;
  updateRetailerApplication(id: number, data: Partial<Pick<RetailerApplication, "status" | "adminNotes">>): Promise<RetailerApplication | undefined>;
}

export class PostgresStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Retailers
  async getRetailers(): Promise<Retailer[]> {
    return db.select().from(retailers);
  }

  async getRetailer(id: number): Promise<Retailer | undefined> {
    const result = await db.select().from(retailers).where(eq(retailers.id, id));
    return result[0];
  }

  async createRetailer(insertRetailer: InsertRetailer): Promise<Retailer> {
    const result = await db.insert(retailers).values(insertRetailer).returning();
    return result[0];
  }

  async updateRetailer(id: number, retailer: Partial<InsertRetailer>): Promise<Retailer | undefined> {
    const result = await db.update(retailers).set(retailer).where(eq(retailers.id, id)).returning();
    return result[0];
  }

  // Magazines
  async getMagazines(): Promise<Magazine[]> {
    return db.select().from(magazines);
  }

  async getMagazine(id: number): Promise<Magazine | undefined> {
    const result = await db.select().from(magazines).where(eq(magazines.id, id));
    return result[0];
  }

  async createMagazine(insertMagazine: InsertMagazine): Promise<Magazine> {
    const result = await db.insert(magazines).values(insertMagazine).returning();
    return result[0];
  }

  async updateMagazine(id: number, magazine: Partial<InsertMagazine>): Promise<Magazine | undefined> {
    const result = await db.update(magazines).set(magazine).where(eq(magazines.id, id)).returning();
    return result[0];
  }

  // Displays
  async getDisplays(): Promise<Display[]> {
    return db.select().from(displays);
  }

  async getDisplay(id: number): Promise<Display | undefined> {
    const result = await db.select().from(displays).where(eq(displays.id, id));
    return result[0];
  }

  async createDisplay(insertDisplay: InsertDisplay): Promise<Display> {
    const result = await db.insert(displays).values(insertDisplay).returning();
    return result[0];
  }

  async updateDisplay(id: number, display: Partial<InsertDisplay>): Promise<Display | undefined> {
    const result = await db.update(displays).set(display).where(eq(displays.id, id)).returning();
    return result[0];
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    return db.select().from(orders);
  }

  async getOrdersByRetailer(retailerId: number): Promise<Order[]> {
    return db.select().from(orders).where(eq(orders.retailerId, retailerId));
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id));
    return result[0];
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const result = await db.insert(orders).values(insertOrder).returning();
    return result[0];
  }

  async updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order | undefined> {
    const result = await db.update(orders).set(order).where(eq(orders.id, id)).returning();
    return result[0];
  }

  // Order Items
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }

  async createOrderItem(item: InsertOrderItem): Promise<OrderItem> {
    const result = await db.insert(orderItems).values(item).returning();
    return result[0];
  }

  // Retailer Applications
  async getRetailerApplications(): Promise<RetailerApplication[]> {
    return db.select().from(retailerApplications);
  }

  async getRetailerApplication(id: number): Promise<RetailerApplication | undefined> {
    const result = await db.select().from(retailerApplications).where(eq(retailerApplications.id, id));
    return result[0];
  }

  async createRetailerApplication(data: InsertRetailerApplication): Promise<RetailerApplication> {
    const result = await db.insert(retailerApplications).values(data).returning();
    return result[0];
  }

  async updateRetailerApplication(id: number, data: Partial<Pick<RetailerApplication, "status" | "adminNotes">>): Promise<RetailerApplication | undefined> {
    const result = await db.update(retailerApplications).set(data).where(eq(retailerApplications.id, id)).returning();
    return result[0];
  }
}

export const storage = new PostgresStorage();
