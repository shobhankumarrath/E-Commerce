import { useEffect, useState } from "react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopSeller = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=5");
        const data = await response.json();

        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));

        setAuthors(authorsData);
      } catch (error) {
        console.error(`Error fetching authors: ${error}`);
      }
    };

    fetchData();
  }, []);

  const handleFollowClick = (index: number) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  };

  return (
    <div className="bg-white p-5 mx-5 mt-10 border w-full max-w-md rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-5 text-center">Top Sellers</h2>
      <ul>
        {authors.map((author, index) => (
          <li
            key={index}
            className="flex items-center justify-between mb-4 space-x-4"
          >
            <section className="flex items-center space-x-3">
              <img
                src={author.image}
                alt={author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="text-sm font-medium">{author.name}</span>
            </section>
            <button
              onClick={() => handleFollowClick(index)}
              className={`py-2 px-4 text-sm font-medium rounded-md transition ${
                author.isFollowing
                  ? "bg-red-500 text-white"
                  : "bg-black text-white"
              }`}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSeller;
