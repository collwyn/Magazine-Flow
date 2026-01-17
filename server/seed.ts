import { db } from "./db";
import { magazines, displays, retailers } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Seed all 40 magazines from mockData
  const magazineData = [
    { title: "Vogue", publisher: "Condé Nast", category: "Fashion", price: "12.99", stock: 450, sku: "VOG-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=600", description: "The leading fashion magazine covering style, beauty, and culture." },
    { title: "National Geographic", publisher: "Disney", category: "Science", price: "9.99", stock: 120, sku: "NG-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=600", description: "Exploring the world, science, and nature." },
    { title: "Time", publisher: "Time USA", category: "News", price: "7.99", stock: 800, sku: "TIME-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600", description: "Breaking news, analysis, and opinion." },
    { title: "Architectural Digest", publisher: "Condé Nast", category: "Design", price: "14.99", stock: 30, sku: "AD-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600", description: "The international design authority." },
    { title: "The New Yorker", publisher: "Condé Nast", category: "Culture", price: "8.99", stock: 200, sku: "NY-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1555449380-492987ebdb83?auto=format&fit=crop&q=80&w=600", description: "Commentary on politics and culture." },
    { title: "Wired", publisher: "Condé Nast", category: "Technology", price: "6.99", stock: 150, sku: "WRD-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600", description: "Emerging technologies and their impact." },
    { title: "Kinfolk", publisher: "Kinfolk", category: "Lifestyle", price: "18.00", stock: 40, sku: "KNF-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600", description: "Slow living, design, and culture." },
    { title: "Cereal", publisher: "Cereal", category: "Travel", price: "20.00", stock: 25, sku: "CRL-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1493723843689-d6021ea62299?auto=format&fit=crop&q=80&w=600", description: "Travel and style magazine." },
    { title: "Monocle", publisher: "Monocle", category: "Business", price: "15.00", stock: 60, sku: "MNC-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600", description: "Global affairs, business, culture, and design." },
    { title: "Drift", publisher: "Drift", category: "Food", price: "24.00", stock: 15, sku: "DRF-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600", description: "Coffee culture around the world." },
    { title: "Hypebeast", publisher: "Hypebeast", category: "Fashion", price: "12.00", stock: 100, sku: "HYP-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600", description: "Streetwear and contemporary fashion." },
    { title: "GQ", publisher: "Condé Nast", category: "Men's Lifestyle", price: "8.99", stock: 300, sku: "GQ-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600", description: "Men's style and culture." },
    { title: "Vanity Fair", publisher: "Condé Nast", category: "Culture", price: "9.99", stock: 250, sku: "VF-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600", description: "Pop culture, fashion, and politics." },
    { title: "Esquire", publisher: "Hearst", category: "Men's Lifestyle", price: "7.99", stock: 220, sku: "ESQ-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=600", description: "Style, politics, and culture for men." },
    { title: "Elle", publisher: "Hearst", category: "Fashion", price: "8.99", stock: 350, sku: "ELLE-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1485230946086-1d99d50b286c?auto=format&fit=crop&q=80&w=600", description: "Fashion, beauty, and lifestyle." },
    { title: "Harper's Bazaar", publisher: "Hearst", category: "Fashion", price: "9.99", stock: 180, sku: "HB-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600", description: "Sophisticated fashion and style." },
    { title: "Rolling Stone", publisher: "Penske", category: "Music", price: "9.99", stock: 400, sku: "RS-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=600", description: "Music, pop culture, and politics." },
    { title: "Billboard", publisher: "Penske", category: "Music", price: "10.99", stock: 150, sku: "BB-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=600", description: "Music industry news and charts." },
    { title: "Forbes", publisher: "Whale Media", category: "Business", price: "12.99", stock: 200, sku: "FBS-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=600", description: "Business, investing, and wealth." },
    { title: "Bloomberg Businessweek", publisher: "Bloomberg", category: "Business", price: "9.99", stock: 180, sku: "BBW-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600", description: "Global business and market news." },
    { title: "The Economist", publisher: "The Economist Group", category: "Business", price: "14.99", stock: 300, sku: "ECO-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=600", description: "International news and business analysis." },
    { title: "Scientific American", publisher: "Springer Nature", category: "Science", price: "10.99", stock: 100, sku: "SA-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600", description: "Science news and research." },
    { title: "Popular Science", publisher: "Recurrent", category: "Science", price: "8.99", stock: 120, sku: "PS-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1581093458891-2f30890918b6?auto=format&fit=crop&q=80&w=600", description: "Science and technology news." },
    { title: "Dwell", publisher: "Dwell Life", category: "Design", price: "14.99", stock: 80, sku: "DWL-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600", description: "Modern architecture and design." },
    { title: "Wallpaper*", publisher: "Future", category: "Design", price: "16.99", stock: 60, sku: "WPR-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600", description: "Design, architecture, and lifestyle." },
    { title: "Bon Appétit", publisher: "Condé Nast", category: "Food", price: "8.99", stock: 250, sku: "BA-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600", description: "Food, recipes, and restaurant reviews." },
    { title: "Food & Wine", publisher: "Dotdash Meredith", category: "Food", price: "9.99", stock: 220, sku: "FW-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600", description: "Recipes, wine, and travel." },
    { title: "Travel + Leisure", publisher: "Dotdash Meredith", category: "Travel", price: "9.99", stock: 180, sku: "TL-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600", description: "Travel guides and tips." },
    { title: "Condé Nast Traveler", publisher: "Condé Nast", category: "Travel", price: "10.99", stock: 150, sku: "CNT-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600", description: "Luxury travel and lifestyle." },
    { title: "Sports Illustrated", publisher: "Minute Media", category: "Sports", price: "8.99", stock: 300, sku: "SI-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=600", description: "Sports news and analysis." },
    { title: "ESPN The Magazine", publisher: "Hearst", category: "Sports", price: "7.99", stock: 200, sku: "ESPN-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1587329310686-94757394aa60?auto=format&fit=crop&q=80&w=600", description: "Sports coverage and commentary." },
    { title: "Runners World", publisher: "Hearst", category: "Sports", price: "8.99", stock: 150, sku: "RW-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=600", description: "Running tips and gear reviews." },
    { title: "Golf Digest", publisher: "Warner Bros. Discovery", category: "Sports", price: "9.99", stock: 120, sku: "GD-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=600", description: "Golf instruction and news." },
    { title: "Car and Driver", publisher: "Hearst", category: "Automotive", price: "7.99", stock: 180, sku: "CD-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600", description: "Automotive reviews and news." },
    { title: "MotorTrend", publisher: "Warner Bros. Discovery", category: "Automotive", price: "8.99", stock: 150, sku: "MT-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=600", description: "Car news and road tests." },
    { title: "PC Gamer", publisher: "Future", category: "Gaming", price: "11.99", stock: 200, sku: "PCG-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=600", description: "PC gaming news and reviews." },
    { title: "Game Informer", publisher: "GameStop", category: "Gaming", price: "8.99", stock: 250, sku: "GI-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=600", description: "Video game news and reviews." },
    { title: "Edge", publisher: "Future", category: "Gaming", price: "14.99", stock: 80, sku: "EDG-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600", description: "Video game culture and industry." },
    { title: "Variety", publisher: "Penske", category: "Entertainment", price: "12.99", stock: 100, sku: "VAR-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&q=80&w=600", description: "Entertainment industry news." },
    { title: "The Hollywood Reporter", publisher: "Penske", category: "Entertainment", price: "12.99", stock: 90, sku: "THR-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=600", description: "Film and TV industry news." },
  ];

  console.log("Inserting magazines...");
  await db.insert(magazines).values(magazineData).onConflictDoNothing();

  // Display images - using locally generated magazine display rack images
  const floorImage = "/attached_assets/generated_images/modern_wooden_floor_magazine_display_stand.png";
  const wallImage = "/attached_assets/generated_images/wall_mounted_metal_magazine_rack.png";
  const counterImage = "/attached_assets/generated_images/modern_boutique_magazine_display_rack.png";

  const displayData = [
    {
      name: "Oak Tiered Floor Stand",
      type: "Floor Stand",
      material: "Solid Oak Wood",
      price: "249.99",
      dimensions: '60"H x 24"W x 18"D',
      capacity: "24 Magazine Facings",
      imageUrl: floorImage,
      description: "Elegant freestanding wooden display rack with a warm oak finish. Perfect for boutique spaces.",
      inStock: true,
    },
    {
      name: "Industrial Metal Wall Grid",
      type: "Wall Mount",
      material: "Powder-Coated Steel",
      price: "89.99",
      dimensions: '48"H x 36"W x 2"D',
      capacity: "12 Magazine Facings",
      imageUrl: wallImage,
      description: "Minimalist black metal wall-mounted rack. Space-saving industrial design.",
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
      name: "Maple Free-standing Rack",
      type: "Floor Stand",
      material: "Maple Wood",
      price: "279.99",
      dimensions: '58"H x 28"W x 20"D',
      capacity: "30 Magazine Facings",
      imageUrl: floorImage,
      description: "Light maple finish floor stand with angled shelves for optimal visibility.",
      inStock: true,
    },
    {
      name: "Vertical Wall Pocket",
      type: "Wall Mount",
      material: "Brushed Aluminum",
      price: "129.99",
      dimensions: '36"H x 12"W x 4"D',
      capacity: "5 Magazine Pockets",
      imageUrl: wallImage,
      description: "Sleek vertical wall mount for high-traffic areas and tight spaces.",
      inStock: false,
    },
    {
      name: "Boutique A-Frame",
      type: "Floor Stand",
      material: "Pine & White Laminate",
      price: "199.99",
      dimensions: '50"H x 30"W x 24"D',
      capacity: "16 Magazine Facings",
      imageUrl: floorImage,
      description: "Contemporary A-frame design that folds flat for storage. Modern aesthetic.",
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

  console.log("Seeding completed!");
}

seed()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
