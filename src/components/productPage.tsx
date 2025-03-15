import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

const productPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error(`Error fetching product data: ${error} `);
        });
    }
  }, [id]);

  if (!product) {
    return <h1 className="text-center text-xl font-semibold">Loading...</h1>;
  }

  return (
    <div className="p-4 w-full max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-black text-white rounded-md w-full sm:w-auto"
      >
        Back
      </button>
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full h-auto mb-4 rounded-lg shadow-md"
      />
      <h1 className="text-xl sm:text-2xl mb-2 font-bold text-center sm:text-left">
        {product.title}
      </h1>
      <p className="mb-4 text-gray-700 text-sm sm:text-base text-center sm:text-left">
        {product.description}
      </p>
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
        <p className="text-lg font-semibold">Price: ${product.price}</p>
        <p className="text-lg font-semibold">Rating: {product.rating}</p>
      </div>
    </div>
  );
};

export default productPage;
