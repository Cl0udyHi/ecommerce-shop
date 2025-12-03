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
    id: "1",
    products: [
      {
        id: "1",
        name: "WAVIN Oversized Tee",
        price: "129.00 SAR",
        image: Hoodie1,
        colors: ["#000000", "#808080", "#FFFFFF"],
        description:
          "Experience ultimate comfort with our Oversized Tee. Crafted from premium cotton blend fabric, this tee features a relaxed fit design perfect for everyday wear. The breathable material and reinforced stitching ensure both comfort and durability. Available in three classic colors, this versatile piece can be dressed up or down for any occasion. Machine washable and designed to maintain its shape after multiple washes.",
      },
      {
        id: "2",
        name: "WAVIN Cargo Shorts",
        price: "179.00 SAR",
        image: Hoodie2,
        colors: ["#000000", "#FFFFFF"],
        description:
          "Our Cargo Shorts combine style with functionality. Made from durable ripstop fabric, these shorts feature multiple practical pockets perfect for carrying essentials. The comfortable elastic waistband with drawstring ensures a perfect fit, while the knee-length cut offers both style and mobility. Reinforced seams and high-quality YKK zippers guarantee long-lasting wear. Available in classic black and white colorways.",
      },
      {
        id: "3",
        name: "WAVIN Lightweight Shirt",
        price: "159.00 SAR",
        image: Hoodie3,
        colors: ["#000000", "#808080", "#FFFFFF", "#FF00FF"],
        description:
          "The WAVIN Lightweight Shirt is perfect for any season. Constructed with ultra-light, moisture-wicking fabric, this shirt keeps you cool and comfortable throughout the day. Features include a modern cut, subtle branded details, and UV protection properties. The wrinkle-resistant material makes it ideal for travel or daily wear. Available in four stunning colors, this shirt offers both style and practicality with its easy-care properties.",
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

export const NAVIGATION_LINKS: {
  name: string;
  href: string;
  exact?: boolean;
}[] = [
  { name: "Home", href: "/", exact: true },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
  { name: "About Us", href: "/about" },
];

export const MAX_QUANTITY = 10;
export const MIN_QUANTITY = 1;
