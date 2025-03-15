import { Link } from "react-router-dom";
import React from "react";

interface bookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

const bookCard: React.FC<bookCardProps> = ({ id, title, image, price }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white flex flex-col items-center text-center sm:text-left">
      <Link to={`/product/${id}`} className="w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-40 sm:h-32 object-cover mb-2 rounded-md"
        />
        <h2 className="font-bold text-sm sm:text-base md:text-lg truncate w-full">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-700">${price}</p>
      </Link>
    </div>
  );
};

export default bookCard;
