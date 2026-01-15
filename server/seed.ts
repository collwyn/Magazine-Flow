import { db } from "./db";
import { magazines, displays, retailers } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Seed magazines
  const magazineData = [
    {
      title: "Vogue",
      publisher: "Condé Nast",
      category: "Fashion",
      price: "6.99",
      stock: 100,
      sku: "MAG-VOGUE-001",
      status: "active",
      coverUrl: "https://images.unsplash.com/photo-1600431521340-491eca880813?w=400&h=600&fit=crop",
      description: "The world's leading fashion magazine featuring haute couture, beauty, and lifestyle.",
    },
    {
      title: "National Geographic",
      publisher: "National Geographic Society",
      category: "Science & Nature",
      price: "7.99",
      stock: 75,
      sku: "MAG-NATGEO-001",
      status: "active",
      coverUrl: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400&h=600&fit=crop",
      description: "Explore the world through stunning photography and groundbreaking science.",
    },
    {
      title: "Wired",
      publisher: "Condé Nast",
      category: "Technology",
      price: "5.99",
      stock: 90,
      sku: "MAG-WIRED-001",
      status: "active",
      coverUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=600&fit=crop",
      description: "The definitive guide to technology, business, and innovation.",
    },
    {
      title: "The New Yorker",
      publisher: "Condé Nast",
      category: "Culture & Arts",
      price: "8.99",
      stock: 60,
      sku: "MAG-NEWYORKER-001",
      status: "active",
      coverUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=600&fit=crop",
      description: "A weekly magazine featuring journalism, commentary, criticism, essays, fiction, and poetry.",
    },
    {
      title: "Forbes",
      publisher: "Forbes Media",
      category: "Business & Finance",
      price: "6.99",
      stock: 80,
      sku: "MAG-FORBES-001",
      status: "active",
      coverUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=600&fit=crop",
      description: "Business news, financial insights, and profiles of the world's most successful entrepreneurs.",
    },
    {
      title: "Time",
      publisher: "Time USA",
      category: "News & Politics",
      price: "5.99",
      stock: 95,
      sku: "MAG-TIME-001",
      status: "active",
      coverUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=600&fit=crop",
      description: "Breaking news and analysis on politics, world events, and current affairs.",
    },
    {
      title: "Bon Appétit",
      publisher: "Condé Nast",
      category: "Food & Cooking",
      price: "6.99",
      stock: 70,
      sku: "MAG-BONAPPETIT-001",
      status: "active",
      coverUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=600&fit=crop",
      description: "Recipes, cooking tips, and food culture from around the world.",
    },
    {
      title: "Architectural Digest",
      publisher: "Condé Nast",
      category: "Home & Design",
      price: "7.99",
      stock: 55,
      sku: "MAG-ARCHDIGEST-001",
      status: "active",
      coverUrl: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&h=600&fit=crop",
      description: "Interior design, architecture, and luxury living inspiration.",
    },
  ];

  console.log("Inserting magazines...");
  await db.insert(magazines).values(magazineData).onConflictDoNothing();

  // Seed displays - using local generated images for magazine display racks
  const floorImage = "/attached_assets/generated_images/modern_wooden_floor_magazine_display_stand.png";
  const wallImage = "/attached_assets/generated_images/wall_mounted_metal_magazine_rack.png";
  const counterImage = "/attached_assets/generated_images/modern_boutique_magazine_display_rack.png";

  const displayData = [
    {
      name: "Wall-Mount Magazine Rack",
      type: "Wall Mount",
      material: "Metal",
      price: "89.99",
      dimensions: '24"W x 36"H x 4"D',
      capacity: "12 magazines",
      imageUrl: wallImage,
      description: "Sleek wall-mounted display perfect for retail spaces. Features 6 tiered pockets for maximum visibility.",
      inStock: true,
    },
    {
      name: "Rotating Floor Display",
      type: "Floor Stand",
      material: "Metal & Wood",
      price: "249.99",
      dimensions: '18"W x 60"H x 18"D',
      capacity: "24 magazines",
      imageUrl: floorImage,
      description: "Four-sided rotating display with oak finish. Ideal for high-traffic areas.",
      inStock: true,
    },
    {
      name: "Countertop Display Stand",
      type: "Counter",
      material: "Acrylic",
      price: "34.99",
      dimensions: '12"W x 14"H x 8"D',
      capacity: "6 magazines",
      imageUrl: counterImage,
      description: "Clear acrylic display for checkout counters. Space-efficient and attractive.",
      inStock: true,
    },
    {
      name: "Wooden Magazine Holder",
      type: "Floor Stand",
      material: "Bamboo",
      price: "129.99",
      dimensions: '16"W x 48"H x 12"D',
      capacity: "15 magazines",
      imageUrl: floorImage,
      description: "Eco-friendly bamboo display with modern minimalist design.",
      inStock: true,
    },
    {
      name: "Wire Grid Display Panel",
      type: "Wall Mount",
      material: "Wire",
      price: "59.99",
      dimensions: '24"W x 48"H x 2"D',
      capacity: "18 magazines",
      imageUrl: wallImage,
      description: "Versatile wire grid system with adjustable hooks. Easy to customize.",
      inStock: false,
    },
    {
      name: "Premium Leather Magazine Rack",
      type: "Floor Stand",
      material: "Leather & Metal",
      price: "189.99",
      dimensions: '14"W x 18"H x 10"D',
      capacity: "8 magazines",
      imageUrl: floorImage,
      description: "Luxury leather-wrapped display for upscale boutiques and cafes.",
      inStock: true,
    },
  ];

  console.log("Inserting displays...");
  await db.insert(displays).values(displayData).onConflictDoNothing();

  // Seed sample retailers
  const retailerData = [
    {
      name: "The Corner Bookshop",
      address: "123 Main St, Brooklyn, NY 11201",
      contactPerson: "Sarah Johnson",
      email: "sarah@cornerbookshop.com",
      phone: "(718) 555-0100",
      creditLimit: "5000.00",
      currentBalance: "0.00",
      status: "active",
    },
    {
      name: "Artisan Coffee & Books",
      address: "456 Oak Avenue, Portland, OR 97209",
      contactPerson: "Michael Chen",
      email: "michael@artisancoffee.com",
      phone: "(503) 555-0200",
      creditLimit: "3000.00",
      currentBalance: "0.00",
      status: "active",
    },
    {
      name: "Urban Style Boutique",
      address: "789 Fashion Blvd, Los Angeles, CA 90028",
      contactPerson: "Emma Rodriguez",
      email: "emma@urbanstyle.com",
      phone: "(323) 555-0300",
      creditLimit: "7500.00",
      currentBalance: "0.00",
      status: "active",
    },
  ];

  console.log("Inserting retailers...");
  await db.insert(retailers).values(retailerData).onConflictDoNothing();

  console.log("Database seeded successfully!");
}

seed().catch(console.error);
