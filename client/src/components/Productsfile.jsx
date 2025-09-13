import React, { useState } from "react";
import ProductCard from "../layouts/ProductCard";
import products from "../data/productData";

const categories = [
  "Fertility Programs",
  "Reversal Programs",
];

const Productsfile = () => {
  const [selectedCategory, setSelectedCategory] = useState("Fertility Programs");

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <section className="bg-gray-50 pb-10 px-5 lg:px-14 mt-10 dark:mt-0 dark:pt-5 dark:bg-gray-900 dark:text-white duration-200">
      <div className="flex justify-center ">
      <h2 className="sm:text-3xl md:text-4xl text-xl font-bold text-center text-gray-800 mb-10 dark:text-white">
        Our Programs
      </h2></div>

      <div className="flex flex-wrap justify-center mb-6 space-x-4 text-sm font-medium text-ternary">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`pb-1 border-b-2 ${
              selectedCategory === cat
                ? "border-ternary"
                : "border-transparent"
            } hover:border-secondary transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default Productsfile;
