import mongoose from "mongoose";
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";
import productModel from "./models/productModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ham upload anh len Cloudinary
const uploadImagesToCloudinary = async (imagePaths) => {
  const uploadedUrls = [];
  for (const imagePath of imagePaths) {
    try {
      // Tao duong dan tuyet doi den file anh
      const fullPath = path.join(__dirname, "frontend_assets", imagePath);
      if (!fs.existsSync(fullPath)) {
        console.log(`Bo qua file khong ton tai: ${imagePath}`);
        uploadedUrls.push(`/frontend_assets/${imagePath}`); // Su dung duong dan tuong doi
        continue;
      }

      console.log(`Dang upload: ${imagePath}`);
      const result = await cloudinary.uploader.upload(fullPath, {
        resource_type: "image",
      });
      uploadedUrls.push(result.secure_url);
      console.log(`Da upload: ${result.secure_url}`);
    } catch (error) {
      console.error(`Loi upload ${imagePath}:`, error.message);
      uploadedUrls.push(`/frontend_assets/${imagePath}`); // Su dung duong dan tuong doi neu upload that bai
    }
  }
  return uploadedUrls;
};

const sampleProducts = [
  {
    _id: "aaaaa",
    bestseller: true,
    category: "Nữ",
    createdAt: 1716634345448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img1.png"],
    name: "Áo Cotton Cổ Tròn Nữ",
    price: 150000,
    sizes: ["S", "M", "L"],
    subcategory: "Áo",
  },
  {
    _id: "aaaab",
    bestseller: true,
    category: "Nam",
    createdAt: 1716621345448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img2_1.png", "p_img2_2.png", "p_img2_3.png", "p_img2_4.png"],
    name: "Áo Thun Cotton Nguyên Chất Nam",
    price: 280000,
    sizes: ["M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaaac",
    bestseller: true,
    category: "Trẻ em",
    createdAt: 1716234545448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img3.png"],
    name: "Áo Cotton Cổ Tròn Bé Gái",
    price: 180000,
    sizes: ["S", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaaad",
    bestseller: true,
    category: "Nam",
    createdAt: 1716621345448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img4.png"],
    name: "Áo Thun Cotton Nguyên Chất Nam",
    price: 180000,
    sizes: ["S", "M", "XXL"],
    subcategory: "Áo",
  },
  {
    _id: "aaaae",
    bestseller: true,
    category: "Nữ",
    createdAt: 1716622345448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img5.png"],
    name: "Áo Cotton Cổ Tròn Nữ",
    price: 220000,
    sizes: ["M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaaaf",
    bestseller: true,
    category: "Trẻ em",
    createdAt: 1716623423448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img6.png"],
    name: "Áo Cotton Cổ Tròn Bé Gái",
    price: 160000,
    sizes: ["S", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaaag",
    bestseller: false,
    category: "Nam",
    createdAt: 1716621542448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img7.png"],
    name: "Quần Tây Nam Ôm Vừa Mặt Phẳng",
    price: 380000,
    sizes: ["S", "L", "XL"],
    subcategory: "Quần",
  },
  {
    _id: "aaaah",
    bestseller: false,
    category: "Nam",
    createdAt: 1716622345448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img8.png"],
    name: "Áo Thun Cotton Nguyên Chất Nam",
    price: 240000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaaai",
    bestseller: false,
    category: "Trẻ em",
    createdAt: 1716621235448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img9.png"],
    name: "Áo Cotton Cổ Tròn Bé Gái",
    price: 120000,
    sizes: ["M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaaaj",
    bestseller: false,
    category: "Nam",
    createdAt: 1716622235448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img10.png"],
    name: "Quần Tây Nam Ôm Vừa Mặt Phẳng",
    price: 320000,
    sizes: ["S", "L", "XL"],
    subcategory: "Quần",
  },
  {
    _id: "aaaak",
    bestseller: false,
    category: "Nam",
    createdAt: 1716623345448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img11.png"],
    name: "Áo Thun Cotton Nguyên Chất Nam",
    price: 200000,
    sizes: ["S", "M", "L"],
    subcategory: "Áo",
  },
  {
    _id: "aaaal",
    bestseller: false,
    category: "Nam",
    createdAt: 1716624445448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img12.png"],
    name: "Áo Thun Cotton Nguyên Chất Nam",
    price: 260000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaaam",
    bestseller: false,
    category: "Nữ",
    createdAt: 1716625545448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img13.png"],
    name: "Áo Cotton Cổ Tròn Nữ",
    price: 220000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaaan",
    bestseller: false,
    category: "Trẻ em",
    createdAt: 1716626645448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img14.png"],
    name: "Áo Thun Cotton Nguyên Chất Bé Trai",
    price: 280000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaaao",
    bestseller: false,
    category: "Nam",
    createdAt: 1716627745448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img15.png"],
    name: "Quần Tây Nam Ôm Vừa Mặt Phẳng",
    price: 360000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Quần",
  },
  {
    _id: "aaaap",
    bestseller: false,
    category: "Trẻ em",
    createdAt: 1716628845448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img16.png"],
    name: "Áo Cotton Cổ Tròn Bé Gái",
    price: 220000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaaaq",
    bestseller: false,
    category: "Nam",
    createdAt: 1716629945448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img17.png"],
    name: "Quần Tây Nam Ôm Vừa Mặt Phẳng",
    price: 400000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Quần",
  },
  {
    _id: "aaaar",
    bestseller: false,
    category: "Trẻ em",
    createdAt: 1716631045448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img18.png"],
    name: "Áo Thun Cotton Nguyên Chất Bé Trai",
    price: 320000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaaas",
    bestseller: false,
    category: "Trẻ em",
    createdAt: 1716632145448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img19.png"],
    name: "Áo Thun Cotton Nguyên Chất Bé Trai",
    price: 280000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaaat",
    bestseller: false,
    category: "Nữ",
    createdAt: 1716633245448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img20.png"],
    name: "Quần Palazzo Nữ Có Thắt Lưng",
    price: 420000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Quần",
  },
  {
    _id: "aaaau",
    bestseller: false,
    category: "Nữ",
    createdAt: 1716634345448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img21.png"],
    name: "Áo Khoác Nữ Có Khóa Phía Trước Kiểu Rộng",
    price: 550000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Đồ mùa đông",
  },
  {
    _id: "aaaav",
    bestseller: false,
    category: "Nữ",
    createdAt: 1716635445448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img22.png"],
    name: "Quần Palazzo Nữ Có Thắt Lưng",
    price: 450000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Quần",
  },
  {
    _id: "aaaaw",
    bestseller: false,
    category: "Trẻ em",
    createdAt: 1716636545448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img23.png"],
    name: "Áo Thun Cotton Nguyên Chất Bé Trai",
    price: 320000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaaax",
    bestseller: false,
    category: "Trẻ em",
    createdAt: 1716637645448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img24.png"],
    name: "Áo Thun Cotton Nguyên Chất Bé Trai",
    price: 280000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaaay",
    bestseller: false,
    category: "Trẻ em",
    createdAt: 1716638745448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img25.png"],
    name: "Áo Cotton Cổ Tròn Bé Gái",
    price: 250000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaaaz",
    bestseller: false,
    category: "Nữ",
    createdAt: 1716639845448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img26.png"],
    name: "Áo Khoác Nữ Có Khóa Phía Trước Kiểu Rộng",
    price: 600000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Đồ mùa đông",
  },
  {
    _id: "aaaba",
    bestseller: false,
    category: "Trẻ em",
    createdAt: 1716640945448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img27.png"],
    name: "Áo Cotton Cổ Tròn Bé Gái",
    price: 270000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaabb",
    bestseller: false,
    category: "Nam",
    createdAt: 1716642045448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img28.png"],
    name: "Áo Khoác Denim Nam Ôm Vừa Kiểu Rộng",
    price: 650000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Đồ mùa đông",
  },
  {
    _id: "aaabc",
    bestseller: false,
    category: "Nữ",
    createdAt: 1716643145448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img29.png"],
    name: "Áo Cotton Cổ Tròn Nữ",
    price: 320000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaabd",
    bestseller: false,
    category: "Trẻ em",
    createdAt: 1716644245448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img30.png"],
    name: "Áo Cotton Cổ Tròn Bé Gái",
    price: 290000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaabe",
    bestseller: false,
    category: "Nam",
    createdAt: 1716645345448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img31.png"],
    name: "Áo Thun Cotton Nguyên Chất Nam",
    price: 350000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaabf",
    bestseller: false,
    category: "Nam",
    createdAt: 1716646445448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img32.png"],
    name: "Áo Thun Cotton Nguyên Chất Nam",
    price: 380000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaabg",
    bestseller: false,
    category: "Trẻ em",
    createdAt: 1716647545448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img33.png"],
    name: "Áo Cotton Cổ Tròn Bé Gái",
    price: 300000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaabh",
    bestseller: false,
    category: "Nữ",
    createdAt: 1716648645448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img34.png"],
    name: "Áo Cotton Cổ Tròn Nữ",
    price: 360000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaabi",
    bestseller: false,
    category: "Nữ",
    createdAt: 1716649745448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img35.png"],
    name: "Áo Khoác Nữ Có Khóa Phía Trước Kiểu Rộng",
    price: 620000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Đồ mùa đông",
  },
  {
    _id: "aaabj",
    bestseller: false,
    category: "Nữ",
    createdAt: 1716650845448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img36.png"],
    name: "Áo Khoác Nữ Có Khóa Phía Trước Kiểu Rộng",
    price: 680000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Đồ mùa đông",
  },
  {
    _id: "aaabk",
    bestseller: false,
    category: "Nữ",
    createdAt: 1716651945448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img37.png"],
    name: "Áo Cotton Cổ Tròn Nữ",
    price: 340000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaabl",
    bestseller: false,
    category: "Nam",
    createdAt: 1716653045448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img38.png"],
    name: "Áo Thun Cotton Nguyên Chất Nam",
    price: 400000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaabm",
    bestseller: false,
    category: "Nam",
    createdAt: 1716654145448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img39.png"],
    name: "Áo Sơ Mi Cotton In Hoa Nam",
    price: 390000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaabn",
    bestseller: false,
    category: "Nam",
    createdAt: 1716655245448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img40.png"],
    name: "Áo Khoác Denim Nam Ôm Vừa Kiểu Rộng",
    price: 540000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Đồ mùa đông",
  },
  {
    _id: "aaabo",
    bestseller: false,
    category: "Nam",
    createdAt: 1716656345448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img41.png"],
    name: "Áo Thun Cotton Nguyên Chất Nam",
    price: 370000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaabp",
    bestseller: false,
    category: "Trẻ em",
    createdAt: 1716657445448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img42.png"],
    name: "Áo Thun Cotton Nguyên Chất Bé Trai",
    price: 300000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Áo",
  },
  {
    _id: "aaabq",
    bestseller: false,
    category: "Trẻ em",
    createdAt: 1716658545448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img43.png"],
    name: "Quần Tây Trẻ Em Ôm Vừa",
    price: 350000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Quần",
  },
  {
    _id: "aaabr",
    bestseller: false,
    category: "Nữ",
    createdAt: 1716659645448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img44.png"],
    name: "Áo Khoác Nữ Có Khóa Phía Trước Kiểu Rộng",
    price: 750000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Đồ mùa đông",
  },
  {
    _id: "aaabs",
    bestseller: false,
    category: "Nam",
    createdAt: 1716660745448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img45.png"],
    name: "Áo Khoác Denim Nam Ôm Vừa Kiểu Rộng",
    price: 540000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Đồ mùa đông",
  },
  {
    _id: "aaabt",
    bestseller: false,
    category: "Nam",
    createdAt: 1716661845448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img46.png"],
    name: "Áo Khoác Denim Nam Ôm Vừa Kiểu Rộng",
    price: 780000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Đồ mùa đông",
  },
  {
    _id: "aaabu",
    bestseller: false,
    category: "Trẻ em",
    createdAt: 1716662945448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img47.png"],
    name: "Quần Tây Trẻ Em Ôm Vừa",
    price: 380000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Quần",
  },
  {
    _id: "aaabv",
    bestseller: false,
    category: "Nam",
    createdAt: 1716664045448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img48.png"],
    name: "Áo Khoác Denim Nam Ôm Vừa Kiểu Rộng",
    price: 800000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Đồ mùa đông",
  },
  {
    _id: "aaabw",
    bestseller: false,
    category: "Trẻ em",
    createdAt: 1716665145448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img49.png"],
    name: "Quần Tây Trẻ Em Ôm Vừa",
    price: 400000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Quần",
  },
  {
    _id: "aaabx",
    bestseller: false,
    category: "Trẻ em",
    createdAt: 1716666245448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img50.png"],
    name: "Quần Tây Trẻ Em Ôm Vừa",
    price: 390000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Quần",
  },
  {
    _id: "aaaby",
    bestseller: false,
    category: "Nữ",
    createdAt: 1716667345448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img51.png"],
    name: "Áo Khoác Nữ Có Khóa Phía Trước Kiểu Rộng",
    price: 600000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Đồ mùa đông",
  },
  {
    _id: "aaabz",
    bestseller: false,
    category: "Nam",
    createdAt: 1716668445448,
    description:
      "Áo pullover nhẹ, thường được đan, ôm sát với cổ tròn và tay ngắn, có thể mặc làm áo lót hoặc áo ngoài.",
    images: ["p_img52.png"],
    name: "Áo Khoác Denim Nam Ôm Vừa Kiểu Rộng",
    price: 750000,
    sizes: ["S", "M", "L", "XL"],
    subcategory: "Đồ mùa đông",
  },
];

const seedDatabase = async () => {
  try {
    console.log("Ket noi voi database va Cloudinary...");
    await connectDB();
    await connectCloudinary();
    console.log("Da ket noi database va Cloudinary thanh cong!");

    // Kiem tra so luong san pham hien tai
    const existingProductsCount = await productModel.countDocuments();
    console.log(
      `So san pham hien tai trong database: ${existingProductsCount}`,
    );

    if (existingProductsCount > 0) {
      console.log("Database da co du lieu. Bo qua viec them du lieu mau.");
      return;
    }

    console.log("Bat dau upload anh va them du lieu mau...");

    // Upload anh va map du lieu tu sampleProducts sang dinh dang database
    const productsToInsert = [];
    for (const product of sampleProducts) {
      console.log(`Dang xu ly san pham: ${product.name}`);

      // Upload anh len Cloudinary
      const imageUrls = await uploadImagesToCloudinary(product.images);

      const productData = {
        bestseller: product.bestseller,
        category: product.category,
        date: product.createdAt,
        description: product.description,
        image: imageUrls,
        name: product.name,
        price: product.price,
        sizes: product.sizes,
        subCategory: product.subcategory,
      };

      productsToInsert.push(productData);
    }

    // Them du lieu vao database
    const result = await productModel.insertMany(productsToInsert);
    console.log(`Da them thanh cong ${result.length} san pham vao database!`);

    console.log("Hoan thanh seeding database!");
  } catch (error) {
    console.error("Loi khi seeding database:", error.message);
    process.exit(1);
  } finally {
    // Dong ket noi database
    await mongoose.connection.close();
    console.log("Da dong ket noi database.");
    process.exit(0);
  }
};

// Chạy script seeding
seedDatabase();
