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
                byte[] e1Bytes = File.Exists("../Frontend/src/assets/e1.png") ? File.ReadAllBytes("../Frontend/src/assets/e1.png") : dummyImageBytes;
                byte[] e2Bytes = File.Exists("../Frontend/src/assets/e2.png") ? File.ReadAllBytes("../Frontend/src/assets/e2.png") : dummyImageBytes;
                byte[] e3Bytes = File.Exists("../Frontend/src/assets/e3.png") ? File.ReadAllBytes("../Frontend/src/assets/e3.png") : dummyImageBytes;
                byte[] h1Bytes = File.Exists("../Frontend/src/assets/h1.png") ? File.ReadAllBytes("../Frontend/src/assets/h1.png") : dummyImageBytes;

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
                
                context.AdminImages.Add(new AdminImage { Name = "e1.png", ContentType = "image/png", ImageData = e1Bytes, UploadedAt = DateTime.UtcNow });
                context.AdminImages.Add(new AdminImage { Name = "e2.png", ContentType = "image/png", ImageData = e2Bytes, UploadedAt = DateTime.UtcNow });
                context.AdminImages.Add(new AdminImage { Name = "e3.png", ContentType = "image/png", ImageData = e3Bytes, UploadedAt = DateTime.UtcNow });
                context.AdminImages.Add(new AdminImage { Name = "h1.png", ContentType = "image/png", ImageData = h1Bytes, UploadedAt = DateTime.UtcNow });

                byte[] co1Bytes = File.Exists("../Frontend/src/assets/co1.png") ? File.ReadAllBytes("../Frontend/src/assets/co1.png") : dummyImageBytes;
                byte[] co2Bytes = File.Exists("../Frontend/src/assets/co2.png") ? File.ReadAllBytes("../Frontend/src/assets/co2.png") : dummyImageBytes;
                byte[] co3Bytes = File.Exists("../Frontend/src/assets/co3.png") ? File.ReadAllBytes("../Frontend/src/assets/co3.png") : dummyImageBytes;
                byte[] co4Bytes = File.Exists("../Frontend/src/assets/co4.png") ? File.ReadAllBytes("../Frontend/src/assets/co4.png") : dummyImageBytes;
                byte[] co5Bytes = File.Exists("../Frontend/src/assets/co5.png") ? File.ReadAllBytes("../Frontend/src/assets/co5.png") : dummyImageBytes;
                byte[] co6Bytes = File.Exists("../Frontend/src/assets/co6.png") ? File.ReadAllBytes("../Frontend/src/assets/co6.png") : dummyImageBytes;

                context.AdminImages.Add(new AdminImage { Name = "co1.png", ContentType = "image/png", ImageData = co1Bytes, UploadedAt = DateTime.UtcNow });
                context.AdminImages.Add(new AdminImage { Name = "co2.png", ContentType = "image/png", ImageData = co2Bytes, UploadedAt = DateTime.UtcNow });
                context.AdminImages.Add(new AdminImage { Name = "co3.png", ContentType = "image/png", ImageData = co3Bytes, UploadedAt = DateTime.UtcNow });
                context.AdminImages.Add(new AdminImage { Name = "co4.png", ContentType = "image/png", ImageData = co4Bytes, UploadedAt = DateTime.UtcNow });
                context.AdminImages.Add(new AdminImage { Name = "co5.png", ContentType = "image/png", ImageData = co5Bytes, UploadedAt = DateTime.UtcNow });
                context.AdminImages.Add(new AdminImage { Name = "co6.png", ContentType = "image/png", ImageData = co6Bytes, UploadedAt = DateTime.UtcNow });

                byte[] ca1Bytes = File.Exists("../Frontend/src/assets/ca1.png") ? File.ReadAllBytes("../Frontend/src/assets/ca1.png") : dummyImageBytes;
                byte[] ca2Bytes = File.Exists("../Frontend/src/assets/ca2.jpg") ? File.ReadAllBytes("../Frontend/src/assets/ca2.jpg") : dummyImageBytes;
                byte[] ca3Bytes = File.Exists("../Frontend/src/assets/ca3.png") ? File.ReadAllBytes("../Frontend/src/assets/ca3.png") : dummyImageBytes;
                byte[] ca4Bytes = File.Exists("../Frontend/src/assets/ca4.png") ? File.ReadAllBytes("../Frontend/src/assets/ca4.png") : dummyImageBytes;
                byte[] ca5Bytes = File.Exists("../Frontend/src/assets/ca5.png") ? File.ReadAllBytes("../Frontend/src/assets/ca5.png") : dummyImageBytes;
                byte[] ca6Bytes = File.Exists("../Frontend/src/assets/ca6.png") ? File.ReadAllBytes("../Frontend/src/assets/ca6.png") : dummyImageBytes;
                byte[] ca7Bytes = File.Exists("../Frontend/src/assets/ca7.png") ? File.ReadAllBytes("../Frontend/src/assets/ca7.png") : dummyImageBytes;

                context.AdminImages.Add(new AdminImage { Name = "ca1.png", ContentType = "image/png", ImageData = ca1Bytes, UploadedAt = DateTime.UtcNow });
                context.AdminImages.Add(new AdminImage { Name = "ca2.jpg", ContentType = "image/jpeg", ImageData = ca2Bytes, UploadedAt = DateTime.UtcNow });
                context.AdminImages.Add(new AdminImage { Name = "ca3.png", ContentType = "image/png", ImageData = ca3Bytes, UploadedAt = DateTime.UtcNow });
                context.AdminImages.Add(new AdminImage { Name = "ca4.png", ContentType = "image/png", ImageData = ca4Bytes, UploadedAt = DateTime.UtcNow });
                context.AdminImages.Add(new AdminImage { Name = "ca5.png", ContentType = "image/png", ImageData = ca5Bytes, UploadedAt = DateTime.UtcNow });
                context.AdminImages.Add(new AdminImage { Name = "ca6.png", ContentType = "image/png", ImageData = ca6Bytes, UploadedAt = DateTime.UtcNow });
                context.AdminImages.Add(new AdminImage { Name = "ca7.png", ContentType = "image/png", ImageData = ca7Bytes, UploadedAt = DateTime.UtcNow });

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
            int e1Id = imageIds.ElementAtOrDefault(7);
            int e2Id = imageIds.ElementAtOrDefault(8);
            int e3Id = imageIds.ElementAtOrDefault(9);
            int h1Id = imageIds.ElementAtOrDefault(10);
            int co1Id = imageIds.ElementAtOrDefault(11);
            int co2Id = imageIds.ElementAtOrDefault(12);
            int co3Id = imageIds.ElementAtOrDefault(13);
            int co4Id = imageIds.ElementAtOrDefault(14);
            int co5Id = imageIds.ElementAtOrDefault(15);
            int co6Id = imageIds.ElementAtOrDefault(16);
            int ca1Id = imageIds.ElementAtOrDefault(17);
            int ca2Id = imageIds.ElementAtOrDefault(18);
            int ca3Id = imageIds.ElementAtOrDefault(19);
            int ca4Id = imageIds.ElementAtOrDefault(20);
            int ca5Id = imageIds.ElementAtOrDefault(21);
            int ca6Id = imageIds.ElementAtOrDefault(22);
            int ca7Id = imageIds.ElementAtOrDefault(23);

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
                    new Collection { Name = "Bridal Collection", Description = "Exquisite bridal jewellery sets that make your special day unforgettable. Premium kundan", ImageId = co1Id, Badge = "Up to 25% off" },
                    new Collection { Name = "Wedding Collection", Description = "Exquisite bridal jewellery sets that make your special day unforgettable. Premium kundan", ImageId = co2Id, Badge = "Flat ₹ 500" },
                    new Collection { Name = "Traditional Collection", Description = "Exquisite bridal jewellery sets that make your special day unforgettable. Premium kundan", ImageId = co3Id, Badge = "Festival special 20% off" },
                    new Collection { Name = "Modern Collection", Description = "Exquisite bridal jewellery sets that make your special day unforgettable. Premium kundan", ImageId = co4Id, Badge = "Up to 25% off" },
                    new Collection { Name = "Party Wear Collection", Description = "Exquisite bridal jewellery sets that make your special day unforgettable. Premium kundan", ImageId = co5Id, Badge = "Up to 25% off" },
                    new Collection { Name = "Festival Collections", Description = "Exquisite bridal jewellery sets that make your special day unforgettable. Premium kundan", ImageId = co6Id, Badge = "Up to 25% off" }
                );
                context.SaveChanges();
            }

            var collections = context.Collections.ToDictionary(col => col.Name, col => col.Id);

            // 6. Seed Products if empty
            if (!context.Products.Any())
            {
                // Rings
                var ring1 = new Product { Name = "Classic Solitaire Gold Ring", Description = "A classic gold band topped with a brilliant diamond cut.", Price = 1200, Discount = 10, CategoryId = categories["Rings"], CollectionId = collections["Festival Collections"], IsFeatured = true, IsNewArrival = false, CustomBadge = "Hot Deal", ViewsCount = 450, CreatedAt = DateTime.UtcNow.AddDays(-15) };
                var ring2 = new Product { Name = "Royal Emerald Statement Ring", Description = "An ornate gold band featuring a large central emerald.", Price = 1800, Discount = 0, CategoryId = categories["Rings"], CollectionId = collections["Bridal Collection"], IsFeatured = true, IsNewArrival = true, CustomBadge = "Featured", ViewsCount = 380, CreatedAt = DateTime.UtcNow.AddDays(-10) };
                
                // Necklaces
                var neck1 = new Product { Name = "Temple Design Gold Tone Necklace Set", Description = "Detailed temple carvings with red stone drops.", Price = 3500, Discount = 15, CategoryId = categories["Necklaces"], CollectionId = collections["Bridal Collection"], IsFeatured = true, IsNewArrival = false, CustomBadge = "Featured", ViewsCount = 920, CreatedAt = DateTime.UtcNow.AddDays(-30) };
                var neck2 = new Product { Name = "Classic Kundan Choker", Description = "Elegant choker set with real kundan details and pearls.", Price = 2800, Discount = 5, CategoryId = categories["Necklaces"], CollectionId = collections["Wedding Collection"], IsFeatured = false, IsNewArrival = true, CustomBadge = "Best Seller", ViewsCount = 210, CreatedAt = DateTime.UtcNow.AddDays(-5) };
                
                // Earrings
                var ear1 = new Product { Name = "Gold Filigree Jhumka Earrings", Description = "Traditional gold filigree jhumkas with pearl beads.", Price = 950, Discount = 0, CategoryId = categories["Earrings"], CollectionId = collections["Wedding Collection"], IsFeatured = false, IsNewArrival = true, CustomBadge = "Best Seller", ViewsCount = 340, CreatedAt = DateTime.UtcNow.AddDays(-20) };
                
                // Bangles
                var bang1 = new Product { Name = "Meenakari Gold Tone Bangle Set", Description = "Beautiful meenakari detailing on pure gold plating.", Price = 1500, Discount = 25, CategoryId = categories["Bangles"], CollectionId = collections["Bridal Collection"], IsFeatured = true, IsNewArrival = false, CustomBadge = "Hot Deal", ViewsCount = 680, CreatedAt = DateTime.UtcNow.AddDays(-12) };
 
                // Anklets
                var ank1 = new Product { Name = "Silver Plated Designer Anklet Set", Description = "Dainty ghungroo beads on sterling silver plated chains.", Price = 750, Discount = 0, CategoryId = categories["Anklets"], CollectionId = collections["Festival Collections"], IsFeatured = false, IsNewArrival = true, CustomBadge = "Best Seller", ViewsCount = 120, CreatedAt = DateTime.UtcNow.AddDays(-2) };

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
                    new Banner { Name = "Guarantee Imitation Jewellery|Shine Like |Royalty,|Without the Heavy Price.|Premium imitation jewellery crafted with precision — necklaces, bridal sets, bangles and earrings, designed to elevate every occasion.|6 Month Guarantee|6 Premium Polish", ImageId = h1Id, BannerType = "Homepage Banner", LinkUrl = "#collections", CreatedAt = DateTime.UtcNow },
                    new Banner { Name = "25% OFF|Bridal Season Sale", ImageId = e1Id, BannerType = "Promotional Banner", LinkUrl = "#offers", CreatedAt = DateTime.UtcNow },
                    new Banner { Name = "20% OFF|Festive Diwali Offer", ImageId = e2Id, BannerType = "Promotional Banner", LinkUrl = "#offers", CreatedAt = DateTime.UtcNow },
                    new Banner { Name = "15% OFF|Nwe Arrival Flash Sal", ImageId = e3Id, BannerType = "Promotional Banner", LinkUrl = "#offers", CreatedAt = DateTime.UtcNow }
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

            // 10. Seed GalleryItems if empty
            if (!context.GalleryItems.Any())
            {
                context.GalleryItems.AddRange(
                    new GalleryItem { Title = "Temple Design Gold Tone Necklace", Category = "JEWELLERY", ImageId = ca1Id },
                    new GalleryItem { Title = "Anklet Set", Category = "COLLECTIONS", ImageId = ca2Id },
                    new GalleryItem { Title = "Traditional Jhumka Earrings", Category = "STORE", ImageId = ca3Id },
                    new GalleryItem { Title = "Elegant Crystal Pendant Chain", Category = "EVENTS", ImageId = ca4Id },
                    new GalleryItem { Title = "Royal Polki Bridal Complete Set", Category = "JEWELLERY", ImageId = ca5Id },
                    new GalleryItem { Title = "Temple Gold covering Necklace Set", Category = "COLLECTIONS", ImageId = ca6Id },
                    new GalleryItem { Title = "Kundan Statement Ring Set", Category = "STORE", ImageId = ca7Id }
                );
                context.SaveChanges();
            }
        }
    }
}
