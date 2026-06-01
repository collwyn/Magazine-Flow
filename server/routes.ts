import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMagazineSchema, insertDisplaySchema, insertRetailerSchema, insertRetailerApplicationSchema } from "@shared/schema";
import { autoSeedIfEmpty } from "./autoSeed";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Auto-seed the database if empty (works in both dev and production)
  await autoSeedIfEmpty();
  
  // Magazines API
  app.get("/api/magazines", async (req, res) => {
    try {
      const magazines = await storage.getMagazines();
      res.json(magazines);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch magazines" });
    }
  });

  app.get("/api/magazines/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const magazine = await storage.getMagazine(id);
      if (!magazine) {
        return res.status(404).json({ error: "Magazine not found" });
      }
      res.json(magazine);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch magazine" });
    }
  });

  app.post("/api/magazines", async (req, res) => {
    try {
      const validatedData = insertMagazineSchema.parse(req.body);
      const magazine = await storage.createMagazine(validatedData);
      res.status(201).json(magazine);
    } catch (error) {
      res.status(400).json({ error: "Invalid magazine data" });
    }
  });

  app.patch("/api/magazines/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const magazine = await storage.updateMagazine(id, req.body);
      if (!magazine) {
        return res.status(404).json({ error: "Magazine not found" });
      }
      res.json(magazine);
    } catch (error) {
      console.error("Error updating magazine:", error);
      res.status(500).json({ error: "Failed to update magazine", details: error instanceof Error ? error.message : String(error) });
    }
  });

  // Displays API
  app.get("/api/displays", async (req, res) => {
    try {
      const displays = await storage.getDisplays();
      res.json(displays);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch displays" });
    }
  });

  app.get("/api/displays/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const display = await storage.getDisplay(id);
      if (!display) {
        return res.status(404).json({ error: "Display not found" });
      }
      res.json(display);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch display" });
    }
  });

  app.post("/api/displays", async (req, res) => {
    try {
      const validatedData = insertDisplaySchema.parse(req.body);
      const display = await storage.createDisplay(validatedData);
      res.status(201).json(display);
    } catch (error) {
      res.status(400).json({ error: "Invalid display data" });
    }
  });

  app.patch("/api/displays/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const display = await storage.updateDisplay(id, req.body);
      if (!display) {
        return res.status(404).json({ error: "Display not found" });
      }
      res.json(display);
    } catch (error) {
      res.status(500).json({ error: "Failed to update display" });
    }
  });

  // Retailers API
  app.get("/api/retailers", async (req, res) => {
    try {
      const retailers = await storage.getRetailers();
      res.json(retailers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch retailers" });
    }
  });

  app.get("/api/retailers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const retailer = await storage.getRetailer(id);
      if (!retailer) {
        return res.status(404).json({ error: "Retailer not found" });
      }
      res.json(retailer);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch retailer" });
    }
  });

  app.post("/api/retailers", async (req, res) => {
    try {
      const validatedData = insertRetailerSchema.parse(req.body);
      const retailer = await storage.createRetailer(validatedData);
      res.status(201).json(retailer);
    } catch (error) {
      res.status(400).json({ error: "Invalid retailer data" });
    }
  });

  app.patch("/api/retailers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const retailer = await storage.updateRetailer(id, req.body);
      if (!retailer) {
        return res.status(404).json({ error: "Retailer not found" });
      }
      res.json(retailer);
    } catch (error) {
      res.status(500).json({ error: "Failed to update retailer" });
    }
  });

  // Orders API
  app.get("/api/orders", async (req, res) => {
    try {
      const retailerId = req.query.retailerId ? parseInt(req.query.retailerId as string) : undefined;
      const orders = retailerId 
        ? await storage.getOrdersByRetailer(retailerId)
        : await storage.getOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const order = await storage.getOrder(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      const items = await storage.getOrderItems(id);
      res.json({ ...order, items });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  // Retailer Applications API
  const ADMIN_KEY = "iconic-admin";

  app.post("/api/applications", async (req, res) => {
    try {
      const parsed = insertRetailerApplicationSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid application data", details: parsed.error.flatten() });
      }
      const application = await storage.createRetailerApplication(parsed.data);
      res.status(201).json(application);
    } catch (error) {
      res.status(500).json({ error: "Failed to submit application" });
    }
  });

  app.get("/api/applications", async (req, res) => {
    if (req.query.adminKey !== ADMIN_KEY) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const applications = await storage.getRetailerApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  app.get("/api/applications/:id", async (req, res) => {
    if (req.query.adminKey !== ADMIN_KEY) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const id = parseInt(req.params.id);
      const application = await storage.getRetailerApplication(id);
      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch application" });
    }
  });

  app.patch("/api/applications/:id", async (req, res) => {
    if (req.query.adminKey !== ADMIN_KEY) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const id = parseInt(req.params.id);
      const { status, adminNotes } = req.body;
      const updated = await storage.updateRetailerApplication(id, { status, adminNotes });
      if (!updated) {
        return res.status(404).json({ error: "Application not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update application" });
    }
  });

  return httpServer;
}
