import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("retailer"),
  retailerId: integer("retailer_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const retailers = pgTable("retailers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  contactPerson: text("contact_person").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  creditLimit: decimal("credit_limit", { precision: 10, scale: 2 }).notNull().default("0"),
  currentBalance: decimal("current_balance", { precision: 10, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const magazines = pgTable("magazines", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  publisher: text("publisher").notNull(),
  category: text("category").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  stock: integer("stock").notNull().default(0),
  sku: text("sku").notNull().unique(),
  status: text("status").notNull().default("active"),
  coverUrl: text("cover_url"),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const displays = pgTable("displays", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  material: text("material").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  dimensions: text("dimensions").notNull(),
  capacity: text("capacity").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
  inStock: boolean("in_stock").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  orderNumber: text("order_number").notNull().unique(),
  retailerId: integer("retailer_id").notNull(),
  orderDate: timestamp("order_date").notNull().defaultNow(),
  status: text("status").notNull().default("pending"),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentStatus: text("payment_status").notNull().default("unpaid"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer("order_id").notNull(),
  magazineId: integer("magazine_id").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
});

export const retailerApplications = pgTable("retailer_applications", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  // Business Info
  legalBusinessName: text("legal_business_name").notNull(),
  dba: text("dba"),
  ein: text("ein").notNull(),
  resaleCertNumber: text("resale_cert_number"),
  ownershipStructure: text("ownership_structure").notNull(),
  storeType: text("store_type").notNull(),
  storeTypeOther: text("store_type_other"),
  numberOfLocations: integer("number_of_locations"),
  footTrafficEstimate: text("foot_traffic_estimate"),

  // Physical Address
  physicalStreet: text("physical_street").notNull(),
  physicalCity: text("physical_city").notNull(),
  physicalState: text("physical_state").notNull(),
  physicalZip: text("physical_zip").notNull(),

  // Mailing Address (optional)
  mailingStreet: text("mailing_street"),
  mailingCity: text("mailing_city"),
  mailingState: text("mailing_state"),
  mailingZip: text("mailing_zip"),

  // Contacts
  storeManagerName: text("store_manager_name"),
  storeManagerPhone: text("store_manager_phone"),
  storeManagerEmail: text("store_manager_email"),
  receivingManagerName: text("receiving_manager_name"),
  receivingManagerPhone: text("receiving_manager_phone"),
  receivingManagerEmail: text("receiving_manager_email"),
  apContactName: text("ap_contact_name"),
  apContactPhone: text("ap_contact_phone"),
  apContactEmail: text("ap_contact_email"),

  // Store Hours
  hoursMonOpen: text("hours_mon_open"),
  hoursMonClose: text("hours_mon_close"),
  hoursTueOpen: text("hours_tue_open"),
  hoursTueClose: text("hours_tue_close"),
  hoursWedOpen: text("hours_wed_open"),
  hoursWedClose: text("hours_wed_close"),
  hoursThuOpen: text("hours_thu_open"),
  hoursThuClose: text("hours_thu_close"),
  hoursFriOpen: text("hours_fri_open"),
  hoursFriClose: text("hours_fri_close"),
  hoursSatOpen: text("hours_sat_open"),
  hoursSatClose: text("hours_sat_close"),
  hoursSunOpen: text("hours_sun_open"),
  hoursSunClose: text("hours_sun_close"),

  // Receiving & Delivery
  receivingHoursWeekdayOpen: text("receiving_hours_weekday_open"),
  receivingHoursWeekdayClose: text("receiving_hours_weekday_close"),
  receivingHoursSatOpen: text("receiving_hours_sat_open"),
  receivingHoursSatClose: text("receiving_hours_sat_close"),
  receivingHoursSunOpen: text("receiving_hours_sun_open"),
  receivingHoursSunClose: text("receiving_hours_sun_close"),
  deliveryAccess: text("delivery_access").array(),
  deliveryRestrictions: text("delivery_restrictions"),
  deliverySignee: text("delivery_signee"),
  existingRoute: boolean("existing_route"),
  existingRouteDetails: text("existing_route_details"),

  // Service Preferences
  deliveryFrequency: text("delivery_frequency"),
  needsMerchandising: boolean("needs_merchandising").default(false),
  needsRackSetup: boolean("needs_rack_setup").default(false),
  needsFixtures: boolean("needs_fixtures").default(false),
  interestedInResaleProgram: text("interested_in_resale_program"),

  // Catalog Interests
  magazineCategoryInterests: text("magazine_category_interests").array(),
  howHeardAboutUs: text("how_heard_about_us"),
  preferredContactMethod: text("preferred_contact_method"),

  // Metadata
  status: text("status").notNull().default("pending"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users, {
  username: z.string().min(3),
  email: z.string().email(),
}).omit({
  id: true,
  createdAt: true,
});

export const insertRetailerSchema = createInsertSchema(retailers, {
  email: z.string().email(),
}).omit({
  id: true,
  createdAt: true,
});

export const insertMagazineSchema = createInsertSchema(magazines, {
  price: z.string(),
}).omit({
  id: true,
  createdAt: true,
});

export const insertDisplaySchema = createInsertSchema(displays, {
  price: z.string(),
}).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders, {
  totalAmount: z.string(),
}).omit({
  id: true,
  createdAt: true,
  orderDate: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItems, {
  unitPrice: z.string(),
}).omit({
  id: true,
});

export const insertRetailerApplicationSchema = createInsertSchema(retailerApplications).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertRetailer = z.infer<typeof insertRetailerSchema>;
export type Retailer = typeof retailers.$inferSelect;

export type InsertMagazine = z.infer<typeof insertMagazineSchema>;
export type Magazine = typeof magazines.$inferSelect;

export type InsertDisplay = z.infer<typeof insertDisplaySchema>;
export type Display = typeof displays.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

export type InsertRetailerApplication = z.infer<typeof insertRetailerApplicationSchema>;
export type RetailerApplication = typeof retailerApplications.$inferSelect;
