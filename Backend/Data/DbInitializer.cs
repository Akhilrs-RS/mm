using System;
using System.Linq;
using System.IO;
using Backend.Models;

namespace Backend.Data
{
    public static class DbInitializer
    {
        public static void Seed(AppDbContext context)
        {
            // 1. Recreate database (drop if exists and create)
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            // Helper 1x1 png pixel byte array to use as dummy image data
            byte[] dummyImageBytes = new byte[] {
                0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
                0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4,
                0x89, 0x00, 0x00, 0x00, 0x0D, 0x49, 0x44, 0x41, 0x54, 0x78, 0xDA, 0x63, 0x60, 0x18, 0x61, 0x00,
                0x00, 0x30, 0x58, 0x00, 0x0D, 0x24, 0xB5, 0x1E, 0x3D, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E,
                0x44, 0xAE, 0x42, 0x60, 0x82
            };

            // 2. Seed Admin Users if empty
            if (!context.AdminUsers.Any())
            {
                context.AdminUsers.Add(new AdminUser
                {
                    Username = "admin",
                    Email = "heyob93432@noproposal.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                    CreatedAt = DateTime.UtcNow
                });
                context.SaveChanges();
            }

            // 3. Seed Images if empty
            if (!context.AdminImages.Any())
            {
                string[] imageNames = { "ring_preview.png", "necklace_preview.png", "earring_preview.png", "bangle_preview.png", "anklet_preview.png", "banner1.png", "banner2.png" };
                foreach (var name in imageNames)
                {
                    context.AdminImages.Add(new AdminImage
                    {
                        Name = name,
                        ContentType = "image/png",
                        ImageData = dummyImageBytes,
                        UploadedAt = DateTime.UtcNow
                    });
                }
                context.SaveChanges();
            }

            // Capture seeded image IDs
            var imageIds = context.AdminImages.Select(img => img.Id).ToList();
            int ringImageId = imageIds.ElementAtOrDefault(0);
            int necklaceImageId = imageIds.ElementAtOrDefault(1);
            int earringImageId = imageIds.ElementAtOrDefault(2);
            int bangleImageId = imageIds.ElementAtOrDefault(3);
            int ankletImageId = imageIds.ElementAtOrDefault(4);
            int banner1ImageId = imageIds.ElementAtOrDefault(5);
            int banner2ImageId = imageIds.ElementAtOrDefault(6);

            // 4. Seed Categories if empty
            if (!context.Categories.Any())
            {
                context.Categories.AddRange(
                    new Category { Name = "Rings", Description = "Premium gold and diamond statement rings." },
                    new Category { Name = "Necklaces", Description = "Exquisite chokers, necklaces and bridal sets." },
                    new Category { Name = "Earrings", Description = "Traditional jhumkas and modern diamond studs." },
                    new Category { Name = "Bangles", Description = "Traditional and meenakari gold bangles." },
                    new Category { Name = "Anklets", Description = "Designer silver and gold tone anklets." }
                );
                context.SaveChanges();
            }

            var categories = context.Categories.ToDictionary(c => c.Name, c => c.Id);

            // 5. Seed Collections if empty
            if (!context.Collections.Any())
            {
                context.Collections.AddRange(
                    new Collection { Name = "Bridal Collection", Description = "Exquisite bridal jewelry sets for your special day.", ImageId = necklaceImageId, Badge = "Up to 25% off" },
                    new Collection { Name = "Wedding Collection", Description = "Fine traditional gold ornaments for wedding guests.", ImageId = bangleImageId, Badge = "New Season" },
                    new Collection { Name = "Festival Collection", Description = "Celebrate festive occasions with sparkling designs.", ImageId = ringImageId, Badge = "Special Edition" }
                );
                context.SaveChanges();
            }

            var collections = context.Collections.ToDictionary(col => col.Name, col => col.Id);

            // 6. Seed Products if empty
            if (!context.Products.Any())
            {
                // Rings
                var ring1 = new Product { Name = "Classic Solitaire Gold Ring", Description = "A classic gold band topped with a brilliant diamond cut.", Price = 1200, Discount = 10, CategoryId = categories["Rings"], CollectionId = collections["Festival Collection"], IsFeatured = true, ViewsCount = 450, CreatedAt = DateTime.UtcNow.AddDays(-15) };
                var ring2 = new Product { Name = "Royal Emerald Statement Ring", Description = "An ornate gold band featuring a large central emerald.", Price = 1800, Discount = 0, CategoryId = categories["Rings"], CollectionId = collections["Bridal Collection"], IsFeatured = true, ViewsCount = 380, CreatedAt = DateTime.UtcNow.AddDays(-10) };
                
                // Necklaces
                var neck1 = new Product { Name = "Temple Design Gold Tone Necklace Set", Description = "Detailed temple carvings with red stone drops.", Price = 3500, Discount = 15, CategoryId = categories["Necklaces"], CollectionId = collections["Bridal Collection"], IsFeatured = true, ViewsCount = 920, CreatedAt = DateTime.UtcNow.AddDays(-30) };
                var neck2 = new Product { Name = "Classic Kundan Choker", Description = "Elegant choker set with real kundan details and pearls.", Price = 2800, Discount = 5, CategoryId = categories["Necklaces"], CollectionId = collections["Wedding Collection"], IsFeatured = false, ViewsCount = 210, CreatedAt = DateTime.UtcNow.AddDays(-5) };
                
                // Earrings
                var ear1 = new Product { Name = "Gold Filigree Jhumka Earrings", Description = "Traditional gold filigree jhumkas with pearl beads.", Price = 950, Discount = 0, CategoryId = categories["Earrings"], CollectionId = collections["Wedding Collection"], IsFeatured = false, ViewsCount = 340, CreatedAt = DateTime.UtcNow.AddDays(-20) };
                
                // Bangles
                var bang1 = new Product { Name = "Meenakari Gold Tone Bangle Set", Description = "Beautiful meenakari detailing on pure gold plating.", Price = 1500, Discount = 25, CategoryId = categories["Bangles"], CollectionId = collections["Bridal Collection"], IsFeatured = true, ViewsCount = 680, CreatedAt = DateTime.UtcNow.AddDays(-12) };

                // Anklets
                var ank1 = new Product { Name = "Silver Plated Designer Anklet Set", Description = "Dainty ghungroo beads on sterling silver plated chains.", Price = 750, Discount = 0, CategoryId = categories["Anklets"], CollectionId = collections["Festival Collection"], IsFeatured = false, ViewsCount = 120, CreatedAt = DateTime.UtcNow.AddDays(-2) };

                context.Products.AddRange(ring1, ring2, neck1, neck2, ear1, bang1, ank1);
                context.SaveChanges();

                // Map product images
                context.ProductImages.AddRange(
                    new ProductImage { ProductId = ring1.Id, ImageId = ringImageId },
                    new ProductImage { ProductId = ring2.Id, ImageId = ringImageId },
                    new ProductImage { ProductId = neck1.Id, ImageId = necklaceImageId },
                    new ProductImage { ProductId = neck2.Id, ImageId = necklaceImageId },
                    new ProductImage { ProductId = ear1.Id, ImageId = earringImageId },
                    new ProductImage { ProductId = bang1.Id, ImageId = bangleImageId },
                    new ProductImage { ProductId = ank1.Id, ImageId = ankletImageId }
                );
                context.SaveChanges();
            }

            // 7. Seed Offers if empty
            if (!context.Offers.Any())
            {
                var offer1 = new Offer { Name = "Bridal Season Sale", DiscountPercent = 25, StartDate = DateTime.UtcNow.AddDays(-5), EndDate = DateTime.UtcNow.AddDays(30) };
                var offer2 = new Offer { Name = "Festive Diwali Offer", DiscountPercent = 15, StartDate = DateTime.UtcNow.AddDays(-2), EndDate = DateTime.UtcNow.AddDays(15) };
                var offer3 = new Offer { Name = "New Arrival Flash Discount", DiscountPercent = 10, StartDate = DateTime.UtcNow.AddDays(10), EndDate = DateTime.UtcNow.AddDays(12) }; // Future scheduled offer

                context.Offers.AddRange(offer1, offer2, offer3);
                context.SaveChanges();

                // Link applicable products to offer1 (Temple Necklace and Bangles)
                var p1 = context.Products.FirstOrDefault(p => p.Name.Contains("Temple"));
                var p2 = context.Products.FirstOrDefault(p => p.Name.Contains("Bangle"));
                if (p1 != null) context.OfferProducts.Add(new OfferProduct { OfferId = offer1.Id, ProductId = p1.Id });
                if (p2 != null) context.OfferProducts.Add(new OfferProduct { OfferId = offer1.Id, ProductId = p2.Id });

                // Link applicable products to offer2 (Solitaire Gold Ring)
                var p3 = context.Products.FirstOrDefault(p => p.Name.Contains("Solitaire"));
                if (p3 != null) context.OfferProducts.Add(new OfferProduct { OfferId = offer2.Id, ProductId = p3.Id });

                context.SaveChanges();
            }

            // 8. Seed Banners if empty
            if (!context.Banners.Any())
            {
                context.Banners.AddRange(
                    new Banner { Name = "Luxury Collection Showcase", ImageId = banner1ImageId, BannerType = "Homepage Banner", LinkUrl = "#collections", CreatedAt = DateTime.UtcNow },
                    new Banner { Name = "Bridal Extravaganza Promo", ImageId = banner2ImageId, BannerType = "Promotional Banner", LinkUrl = "#offers", CreatedAt = DateTime.UtcNow }
                );
                context.SaveChanges();
            }

            // 9. Seed Inquiries if empty
            if (!context.Inquiries.Any())
            {
                context.Inquiries.AddRange(
                    new Inquiry { CustomerName = "Priya Sharma", Email = "priya@gmail.com", Phone = "+91 98111 22233", Message = "Hi, I am interested in purchasing the Temple Design Gold Tone Necklace. Can I customize the length of the chain?", CreatedAt = DateTime.UtcNow.AddHours(-3) },
                    new Inquiry { CustomerName = "Amit Patel", Email = "amit.patel@yahoo.com", Phone = "+91 98222 33344", Message = "Hello, do you offer cash on delivery inside Mumbai? Also, what is the shipping time for wedding bangles?", CreatedAt = DateTime.UtcNow.AddDays(-1) },
                    new Inquiry { CustomerName = "Ananya Roy", Email = "ananya.r@hotmail.com", Phone = "+91 98333 44455", Message = "Is the Classic Solitaire Gold Ring available in Rose Gold color plating?", CreatedAt = DateTime.UtcNow.AddDays(-2) }
                );
                context.SaveChanges();
            }
        }
    }
}
