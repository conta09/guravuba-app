"use client";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

type Product = {
  _id: string;
  name: string;
  description: string;
  image: string[];
  offerPrice: number;
};

const AllProducts = () => {
  // Temporary static product list using /public folder images
  const products: Product[] = [
    {
      _id: "1",
      name: "Orange Juice",
      description: "Freshly squeezed orange juice",
      image: ["/airbud.png"], // public/orange.jpg
      offerPrice: 5,
    },
    {
      _id: "2",
      name: "Apple",
      description: "Crisp and juicy apple",
      image: ["/headphone.png"], // public/apple.jpg
      offerPrice: 2,
    },
    {
      _id: "3",
      name: "Banana",
      description: "Sweet ripe bananas",
      image: ["/mac.png"], // public/banana.jpg
      offerPrice: 3,
    },
    {
      _id: "4",
      name: "Watermelon",
      description: "Refreshing watermelon slice",
      image: ["/playst.png"], // public/watermelon.jpg
      offerPrice: 4,
    },
     {
      _id: "5",
      name: "Watermelon",
      description: "Refreshing watermelon slice",
      image: ["/projector.png"], // public/watermelon.jpg
      offerPrice: 5,
    },
     {
      _id: "6",
      name: "Galaxy phone",
      description: "Refreshing watermelon slice",
      image: ["/s23.png"], // public/watermelon.jpg
      offerPrice: 6,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <div className="flex flex-col items-end pt-12">
          <p className="text-2xl font-medium">All products</p>
          <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
