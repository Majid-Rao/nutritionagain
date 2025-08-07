import Watermelon from "../assets/product1.jpg";
import Mango from "../assets/product2.jpg";
import Grape from "../assets/product2.jpg";
import Orange from "../assets/product4.jpg";
import Apple from "../assets/product5.jpg";
import Strawberries from "../assets/product6.jpg";
import Pineapple from "../assets/product7.jpg";
import Broccoli from "../assets/product8.jpg";
import Cucumber from "../assets/product9.jpg";
import Spinach from "../assets/product10.jpg";
import Cauliflower from "../assets/product11.jpg";
import Walnuts from "../assets/product12.jpg";
import Almonds from "../assets/product13.jpg";

const products = [
  {
    image: Watermelon,
    title: "Watermelon Juice",
    price: 39,
    category: "FOOD & DRINKS",
  },
  {
    image: Mango,
    title: "Mango Smoothie",
    price: 70,
    oldPrice: 85,
    discount: 17,
    category: "FOOD & DRINKS",
  },
  {
    image: Grape,
    title: "Grape Drink",
    price: 39,
    oldPrice: 55,
    discount: 29,
    category: "FOOD & DRINKS",
  },
  {
    image: Orange,
    title: "Orange Juice",
    price: 59,
    oldPrice: 35,
    discount: 20,
    category: "FOOD & DRINKS",
  },
  {
    image: Apple,
    title: "Organic Apple",
    price: 29,
    category: "FRESH FRUITS",
  },
  {
    image: Strawberries,
    title: "Strawberries",
    price: 49,
    oldPrice: 65,
    discount: 20,
    category: "FRESH FRUITS",
  },
  {
    image: Pineapple,
    title: "Pineapple",
    price: 59,
    category: "FRESH FRUITS",
  },
  {
    image: Broccoli,
    title: "Broccoli",
    price: 99,
    oldPrice: 115,
    discount: 17,
    category: "VEGETABLES",
  },
  {
    image: Cucumber,
    title: "Cucumber",
    price: 39,
    category: "VEGETABLES",
  },
  {
    image: Spinach,
    title: "Spinach",
    price: 89,
    oldPrice: 145,
    discount: 14,
    category: "VEGETABLES",
  },
  {
    image: Cauliflower,
    title: "Cauliflower",
    price: 79,
    category: "VEGETABLES",
  },
  {
    image: Walnuts,
    title: "Organic Walnuts",
    price: 39,
    oldPrice: 52,
    discount: 25,
    category: "DRIED FOODS & NUTS",
  },
  {
    image: Almonds,
    title: "Raw Almonds",
    price: 33,
    oldPrice: 59,
    status: "soldout",
    category: "DRIED FOODS & NUTS",
  },
];

export default products;
