import { Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { addToCart, removeFromCart } from '../../redux/cartSlice.jsx';

import './bookCard.css';

function BookCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isInCart = useSelector((state) => state.cart.items.includes(product.id));
  const originalPrice = Math.round(product.price / (1 - product.discountPercentage / 100));

  const handleImageLoad = (e) => {
    e.target.classList.add('loaded');
  };

  return (
    <Card className="product-card">
      <Card.Img
        variant="top"
        src={product.thumbnail}
        className="card-img-top"
        onClick={() => navigate(`/book-details/${product.id}`)}
        onLoad={handleImageLoad}
        style={{
          height: '180px',
          objectFit: 'contain',
          
        }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Text className="product-title">
          {`${product.title} | ${
            product.description.length > 50
              ? product.description.slice(0,50) + '...'
              : product.description
          }`}
        </Card.Text>

        <Card.Text className="rating-line">
          <FaStar /> {product.rating.toFixed(1)}
        </Card.Text>

        <Card.Text className="price-line">
          <span className="actual-price">₹{product.price}</span>
          <span className="mrp">₹{originalPrice}</span>
          <span className="discount">({product.discountPercentage.toFixed(2)}% off)</span>
        </Card.Text>

        <Card.Text className="shipping-info">
          FREE {product.shippingInformation}
        </Card.Text>

        <div className="mt-auto">
          <Button
            className={`w-100 ${isInCart ? 'remove-btn' : 'add-btn'}`}
            onClick={() =>
              isInCart
                ? dispatch(removeFromCart(product.id))
                : dispatch(addToCart(product.id))
            }
          >
            {isInCart ? 'Remove from cart' : 'Add to cart'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BookCard;