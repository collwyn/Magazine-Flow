import { db } from "./db";
import { magazines, displays, retailers } from "@shared/schema";

export async function autoSeedIfEmpty() {
  try {
    const existingMagazines = await db.select().from(magazines).limit(1);
    
    if (existingMagazines.length === 0) {
      console.log("Database is empty, auto-seeding...");
      
      const magazineData = [
        { title: "British Vogue", publisher: "Condé Nast", category: "Fashion", price: "12.99", stock: 450, sku: "BV-2024-11", status: "active", coverUrl: "/images/covers/vogue.jpg", description: "The UK edition of the world's most influential fashion magazine, featuring the latest in style, beauty, and culture." },
        { title: "Rolling Stone", publisher: "Penske Media", category: "Music", price: "9.99", stock: 400, sku: "RS-2025-09", status: "active", coverUrl: "/images/covers/rolling-stone-steve-lacy.jpg", description: "The definitive voice of music, pop culture, and politics since 1967." },
        { title: "Rolling Stone UK", publisher: "Penske Media", category: "Music", price: "10.99", stock: 200, sku: "RSUK-2025-04", status: "active", coverUrl: "/images/covers/rolling-stone-uk.jpg", description: "The UK edition bringing the best of music culture, emerging artists, and exclusive interviews." },
        { title: "Interview", publisher: "Interview Media", category: "Culture", price: "14.99", stock: 120, sku: "INT-2024-555", status: "active", coverUrl: "/images/covers/interview-billie.webp", description: "Andy Warhol's iconic magazine of art, music, film, and fashion." },
        { title: "032c", publisher: "032c", category: "Culture", price: "25.00", stock: 60, sku: "032C-2024-44", status: "active", coverUrl: "/images/covers/032c.jpg", description: "Berlin-based biannual magazine exploring the intersection of art, fashion, and contemporary culture." },
        { title: "Complex", publisher: "Complex Networks", category: "Culture", price: "8.99", stock: 300, sku: "CMP-2024-08", status: "active", coverUrl: "/images/covers/complex.jpg", description: "The original buyer's guide for men covering sneakers, streetwear, pop culture, and music." },
        { title: "Apartamento", publisher: "Apartamento Publishing", category: "Lifestyle", price: "18.00", stock: 45, sku: "APT-2024-33", status: "active", coverUrl: "/images/covers/apartamento.webp", description: "An everyday life interiors magazine showcasing real homes and the people who live in them." },
        { title: "Dazed", publisher: "Dazed Media", category: "Fashion", price: "11.99", stock: 180, sku: "DZD-2020-SP", status: "active", coverUrl: "/images/covers/dazed.jpg", description: "Youth culture bible covering fashion, film, music, and ideas that shape the future." },
        { title: "Women's", publisher: "Women's Magazine", category: "Fashion", price: "12.99", stock: 150, sku: "WMN-2024-15", status: "active", coverUrl: "/images/covers/womens.webp", description: "A bold fashion publication celebrating diversity, beauty, and the modern woman." },
        { title: "Cosmopolitan", publisher: "Hearst", category: "Lifestyle", price: "8.99", stock: 500, sku: "COSMO-2016-05", status: "active", coverUrl: "/images/covers/cosmopolitan.jpg", description: "The world's largest young women's magazine covering relationships, beauty, fashion, and career." },
        { title: "Homme Girls", publisher: "Homme Girls", category: "Fashion", price: "32.00", stock: 35, sku: "HG-2024-05", status: "active", coverUrl: "/images/covers/homme-girls.webp", description: "A biannual publication exploring femininity through fashion photography and personal style." },
        { title: "Neptune", publisher: "Neptune Magazine", category: "Design", price: "22.00", stock: 40, sku: "NPT-2024-08", status: "active", coverUrl: "/images/covers/neptune.webp", description: "A luxury design and interiors magazine featuring art, architecture, and collectible culture." },
        { title: "Interview Magazine", publisher: "Interview Media", category: "Culture", price: "14.99", stock: 100, sku: "INT-2023-550", status: "active", coverUrl: "/images/covers/interview-olivia.jpg", description: "Conversations at the crossroads of art, music, film, and fashion with today's most compelling figures." },
        { title: "72 Magazine", publisher: "72 Media", category: "Culture", price: "15.00", stock: 80, sku: "72M-2025-01", status: "active", coverUrl: "/images/covers/72-magazine.jpg", description: "A curated publication spotlighting influential voices across art, fashion, and entertainment." },
        { title: "The Gentlewoman", publisher: "Gert Jonkers & Jop van Bennekom", category: "Fashion", price: "16.99", stock: 55, sku: "TGW-2025-32", status: "active", coverUrl: "/images/covers/the-gentlewoman.png", description: "A biannual magazine celebrating modern women of style and purpose with intelligent fashion editorial." },
      ];

      await db.insert(magazines).values(magazineData).onConflictDoNothing();
      console.log("Inserted 15 magazines");

      const floorImage = "/images/modern_wooden_floor_magazine_display_stand.png";
      const wallImage = "/images/wall_mounted_metal_magazine_rack.png";
      const counterImage = "/images/modern_boutique_magazine_display_rack.png";

      const displayData = [
        { name: "Oak Tiered Floor Stand", type: "Floor Stand", material: "Solid Oak Wood", price: "249.99", dimensions: '60"H x 24"W x 18"D', capacity: "24 Magazine Facings", imageUrl: floorImage, description: "Elegant freestanding wooden display rack with a warm oak finish. Perfect for boutique spaces.", inStock: true },
        { name: "Industrial Metal Wall Grid", type: "Wall Mount", material: "Powder-Coated Steel", price: "89.99", dimensions: '48"H x 36"W x 2"D', capacity: "12 Magazine Facings", imageUrl: wallImage, description: "Minimalist black metal wall-mounted rack. Space-saving industrial design.", inStock: true },
        { name: "Countertop Display Stand", type: "Counter", material: "Acrylic", price: "34.99", dimensions: '12"W x 14"H x 8"D', capacity: "6 magazines", imageUrl: counterImage, description: "Clear acrylic display for checkout counters. Space-efficient and attractive.", inStock: true },
        { name: "Maple Free-standing Rack", type: "Floor Stand", material: "Maple Wood", price: "279.99", dimensions: '58"H x 28"W x 20"D', capacity: "30 Magazine Facings", imageUrl: floorImage, description: "Light maple finish floor stand with angled shelves for optimal visibility.", inStock: true },
        { name: "Vertical Wall Pocket", type: "Wall Mount", material: "Brushed Aluminum", price: "129.99", dimensions: '36"H x 12"W x 4"D', capacity: "5 Magazine Pockets", imageUrl: wallImage, description: "Sleek vertical wall mount for high-traffic areas and tight spaces.", inStock: false },
        { name: "Boutique A-Frame", type: "Floor Stand", material: "Pine & White Laminate", price: "199.99", dimensions: '50"H x 30"W x 24"D', capacity: "16 Magazine Facings", imageUrl: floorImage, description: "Contemporary A-frame design that folds flat for storage. Modern aesthetic.", inStock: true },
      ];

      await db.insert(displays).values(displayData).onConflictDoNothing();
      console.log("Inserted 6 displays");

      const retailerData = [
        { name: "The Corner Bookshop", address: "123 Main St, Brooklyn, NY 11201", contactPerson: "Sarah Johnson", email: "sarah@cornerbookshop.com", phone: "(718) 555-0100", creditLimit: "5000.00", currentBalance: "0.00", status: "active" },
        { name: "Artisan Coffee & Books", address: "456 Oak Avenue, Portland, OR 97209", contactPerson: "Michael Chen", email: "michael@artisancoffee.com", phone: "(503) 555-0200", creditLimit: "3000.00", currentBalance: "0.00", status: "active" },
        { name: "Urban Style Boutique", address: "789 Fashion Blvd, Los Angeles, CA 90028", contactPerson: "Emma Rodriguez", email: "emma@urbanstyle.com", phone: "(323) 555-0300", creditLimit: "7500.00", currentBalance: "0.00", status: "active" },
      ];

      await db.insert(retailers).values(retailerData).onConflictDoNothing();
      console.log("Inserted 3 retailers");
      
      console.log("Auto-seeding completed!");
    } else {
      console.log("Database already has data, skipping auto-seed");
    }
  } catch (error) {
    console.error("Auto-seed error:", error);
  }
}
