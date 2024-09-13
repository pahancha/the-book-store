import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { addToCart, fetchBooks, removeFromCart } from "../features/bookSlice";
import { AppDispatch } from "../state/store";
const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { books, cart, status, error } = useSelector(
    (state: RootState) => state.book
  );

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchBooks(searchTerm));
    }
  }, [searchTerm, dispatch]);

  const handleAddtToCart = (book: any) => {
    dispatch(addToCart(book));
  };

  const handleRemoveCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="landing-page">
      <h1>Book Store</h1>
      <input
        type="text"
        placeholder="Search for books here."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <h2>Books</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            {book.volumeInfo.title}
            <button onClick={() => handleAddtToCart(book)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <h2>Cart</h2>
      <ul>
        {cart.map((book, index) => (
          <li key={index}>
            {book.volumeInfo.title}
            <button onClick={() => handleRemoveCart(book.id)}>
              Remove from cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LandingPage;
