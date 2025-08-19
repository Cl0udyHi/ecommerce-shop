import Hoodie1 from "@/public/images/products/hoodie_1.png";
import Hoodie2 from "@/public/images/products/hoodie_2.png";
import Hoodie3 from "@/public/images/products/hoodie_3.png";
import { Collections, SocialMediaType, TestimonialType } from "./types";

export const socialMedia: SocialMediaType[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/cloudyhi_",
  },
  {
    name: "Twitter (X)",
    href: "https://x.com/cloudyhi_",
  },
  {
    name: "Tiktok",
    href: "/",
  },
  {
    name: "Facebook",
    href: "/",
  },
];

export const collections: Collections = [
  {
    name: "Winter Drop",
    products: [
      {
        id: 1,
        name: "WAVIN Oversized Tee",
        price: "129.00 SAR",
        image: Hoodie1,
        colors: ["black", "gray", "white"],
      },
      {
        id: 2,
        name: "WAVIN Cargo Shorts",
        price: "179.00 SAR",
        image: Hoodie2,
        colors: ["black", "white"],
      },
      {
        id: 3,
        name: "WAVIN Lightweight Shirt",
        price: "159.00 SAR",
        image: Hoodie3,
        colors: ["black", "gray", "white", "magenta"],
      },
    ],
  },
];

export const Testimonials: TestimonialType[] = [
  {
    name: "Amelia Carter",
    text: "Absolutely love shopping at WAVIN! The quality of their products is top-notch and delivery is always on time.",
    rating: 5,
  },
  {
    name: "Liam Thompson",
    text: "Great customer service! I had an issue with my order, and they resolved it within hours. Highly recommend WAVIN.",
    rating: 4.5,
  },
  {
    name: "Sophia Martinez",
    text: "The packaging was beautiful and eco-friendly. You can tell WAVIN really cares about their customers.",
    rating: 5,
  },
  {
    name: "Ethan Walker",
    text: "Good variety of products, but some items sell out quickly. Overall, very happy with my purchases.",
    rating: 4,
  },
  {
    name: "Isabella Nguyen",
    text: "This is my go-to shop for gifts. The quality, presentation, and service are unmatched.",
    rating: 5,
  },
  {
    name: "Mason Lee",
    text: "Products are as described and feel premium. Shipping could be a bit faster, but still worth it.",
    rating: 4,
  },
  {
    name: "Olivia Scott",
    text: "Love the attention to detail! My order came with a handwritten thank-you card—such a nice touch.",
    rating: 4.5,
  },
  {
    name: "Noah Kim",
    text: "The product photos match the real items perfectly. No surprises, just great quality.",
    rating: 5,
  },
  {
    name: "Ava Rodriguez",
    text: "I’ve shopped here multiple times and WAVIN never disappoints. Consistently excellent.",
    rating: 5,
  },
  {
    name: "James Patel",
    text: "Solid quality and fair pricing. Could use more size options, but overall very satisfied.",
    rating: 4,
  },
];

export const links = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/about" },
];
