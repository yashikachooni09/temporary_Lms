// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Carousel, Container, Row, Col, Badge, ListGroup } from 'react-bootstrap';

// import { FaStar } from 'react-icons/fa';

// import { fetchProductById } from '../../networking/api';

// import './bookDetail.css';

// export const BookDetail=() =>{
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const loadProduct = async () => {
//       try {
//         const data = await fetchProductById(id);
//         setProduct(data);
//       } catch (err) {
//         console.error("Failed to load product:", err);
//       }
//     };

//     loadProduct();
//   }, [id]);

//   if (!product) return null;

//   const actualPrice = Math.round(product.price / (1 - product.discountPercentage / 100));

//   return (
//     <div className="product-detail-wrapper">
//       <Container className="product-detail-wrapper">
//         <Row className="detail-card">
//           <Col md={6}>
//             {product.images.length > 1 ? (
//               <div className="image-container">
//                 <Carousel className='carousel-grid' controls={true} indicators={true} interval={null}>
//                   {product.images.map((img, i) => (
//                     <Carousel.Item key={i}>
//                       <img src={img} alt={`product-${i}`} className="detail-image-carousel" />
//                     </Carousel.Item>
//                   ))}
//                 </Carousel>
//               </div>
//             ) : (
//               <div className="image-container">
//                 <img src={product.thumbnail} alt="" className="detail-image-single" />
//               </div>
//             )}
//           </Col>


//           <Col md={6}>
//             <h4 className="fw-bold">{product.title}</h4>
//             <p className="text-muted">{product.brand}</p>

//             <div className="mb-2">
//               <Badge bg="success" className="me-2">Low Stock</Badge>
//               <Badge bg="info">fragrances</Badge>
//             </div>

//             <p>{product.description}</p>

//             <div className="price-block mb-3">
//               <span className="text-primary fs-4 fw-bold">₹{product.price}</span>
//               <span className="text-muted text-decoration-line-through ms-2">₹{actualPrice}</span>
//               <Badge bg="danger" className="ms-2">{product.discountPercentage.toFixed(2)}% OFF</Badge>
//             </div>

//             <ListGroup className="product-info-list">
//               <ListGroup.Item className="d-flex justify-content-between align-items-start">
//                 <div className="fw-bold">Rating:</div>
//                 <span><FaStar className="text-warning me-1" />{product.rating}</span>
//               </ListGroup.Item>

//               <ListGroup.Item className="d-flex justify-content-between align-items-start">
//                 <div className="fw-bold">Stock:</div>
//                 <span>{product.stock} items</span>
//               </ListGroup.Item>

//               <ListGroup.Item className="d-flex justify-content-between align-items-start">
//                 <div className="fw-bold">Dimensions:</div>
//                 <span>27.28W × 29.88H × 18.3D</span>
//               </ListGroup.Item>

//               <ListGroup.Item className="d-flex justify-content-between align-items-start">
//                 <div className="fw-bold">Weight:</div>
//                 <span>6 kg</span>
//               </ListGroup.Item>

//               <ListGroup.Item className="d-flex justify-content-between align-items-start">
//                 <div className="fw-bold">Shipping:</div>
//                 <span>Ships in 1 month</span>
//               </ListGroup.Item>

//               <ListGroup.Item className="d-flex justify-content-between align-items-start">
//                 <div className="fw-bold">Warranty:</div>
//                 <span>3 year warranty</span>
//               </ListGroup.Item>

//               <ListGroup.Item className="d-flex justify-content-between align-items-start">
//                 <div className="fw-bold">Return Policy:</div>
//                 <span>7 days return policy</span>
//               </ListGroup.Item>

//               <ListGroup.Item className="d-flex justify-content-between align-items-start">
//                 <div className="fw-bold">SKU:</div>
//                 <span>FRA-DOL-DOL-009</span>
//               </ListGroup.Item>

//               <ListGroup.Item className="d-flex justify-content-between align-items-start">
//                 <div className="fw-bold">Tags:</div>
//                 <span>
//                   <Badge bg="secondary" className="me-2">fragrances</Badge>
//                   <Badge bg="dark">perfumes</Badge>
//                 </span>
//               </ListGroup.Item>
//             </ListGroup>

//           </Col>
//         </Row>

//         <h5 className="mt-5 mb-3">🗣️ Customer Reviews</h5>

//         {[
//           { name: "Mateo Bennett", rating: 4, comment: "Would buy again!", email: "mateo.bennett@x.dummyjson.com" },
//           { name: "Nolan Gonzalez", rating: 4, comment: "Highly recommended!", email: "nolan.gonzalez@x.dummyjson.com" },
//           { name: "Aurora Lawson", rating: 5, comment: "Very happy with my purchase!", email: "aurora.lawson@x.dummyjson.com" }
//         ].map((review, index) => (
//           <div className="review-card" key={index}>
//             <p> <FaStar className="text-warning me-1" />{review.rating} – <strong>{review.name}</strong></p>
//             <small className="text-muted">30/04/2025 | {review.email}</small>
//             <p className="mb-1">{review.comment}</p>
//           </div>
//         ))}
//       </Container>

//     </div>
//   );
// }











import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel, Container, Row, Col, Badge, ListGroup, Button } from 'react-bootstrap';
import { FaStar, FaArrowLeft } from 'react-icons/fa';
import { fetchProductById } from '../../networking/api';
import './bookDetail.css';

export const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product:", err);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) return null;

  const actualPrice = Math.round(product.price / (1 - product.discountPercentage / 100));

  return (
    <div className="product-detail-wrapper">
      <Container>
        {/* === Back Button === */}
        <Button variant="outline-primary" onClick={() => navigate(-1)} className="mb-4">
          <FaArrowLeft className="me-2" />
          Back
        </Button>

        {/* === Product Detail === */}
        <Row className="detail-card">
          <Col md={6}>
            {product.images.length > 1 ? (
              <div className="image-container">
                <Carousel className='carousel-grid' controls={true} indicators={true} interval={null}>
                  {product.images.map((img, i) => (
                    <Carousel.Item key={i}>
                      <img src={img} alt={`product-${i}`} className="detail-image-carousel" />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            ) : (
              <div className="image-container">
                <img src={product.thumbnail} alt="" className="detail-image-single" />
              </div>
            )}
          </Col>

          <Col md={6}>
            <h4 className="fw-bold">{product.title}</h4>
            <p className="text-muted">{product.brand}</p>

            <div className="mb-2">
              <Badge bg="success" className="me-2">Low Stock</Badge>
              <Badge bg="info">fragrances</Badge>
            </div>

            <p>{product.description}</p>

            <div className="price-block mb-3">
              <span className="text-primary fs-4 fw-bold">₹{product.price}</span>
              <span className="text-muted text-decoration-line-through ms-2">₹{actualPrice}</span>
              <Badge bg="danger" className="ms-2">{product.discountPercentage.toFixed(2)}% OFF</Badge>
            </div>

            <ListGroup className="product-info-list">
              <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div className="fw-bold">Rating:</div>
                <span><FaStar className="text-warning me-1" />{product.rating}</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div className="fw-bold">Stock:</div>
                <span>{product.stock} items</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div className="fw-bold">Dimensions:</div>
                <span>27.28W × 29.88H × 18.3D</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div className="fw-bold">Weight:</div>
                <span>6 kg</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div className="fw-bold">Shipping:</div>
                <span>Ships in 1 month</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div className="fw-bold">Warranty:</div>
                <span>3 year warranty</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div className="fw-bold">Return Policy:</div>
                <span>7 days return policy</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div className="fw-bold">SKU:</div>
                <span>FRA-DOL-DOL-009</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div className="fw-bold">Tags:</div>
                <span>
                  <Badge bg="secondary" className="me-2">fragrances</Badge>
                  <Badge bg="dark">perfumes</Badge>
                </span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        {/* === Reviews Section === */}
        <h5 className="mt-5 mb-3">🗣️ Customer Reviews</h5>
        {[
          { name: "Mateo Bennett", rating: 4, comment: "Would buy again!", email: "mateo.bennett@x.dummyjson.com" },
          { name: "Nolan Gonzalez", rating: 4, comment: "Highly recommended!", email: "nolan.gonzalez@x.dummyjson.com" },
          { name: "Aurora Lawson", rating: 5, comment: "Very happy with my purchase!", email: "aurora.lawson@x.dummyjson.com" }
        ].map((review, index) => (
          <div className="review-card" key={index}>
            <p><FaStar className="text-warning me-1" />{review.rating} – <strong>{review.name}</strong></p>
            <small className="text-muted">30/04/2025 | {review.email}</small>
            <p className="mb-1">{review.comment}</p>
          </div>
        ))}
      </Container>
    </div>
  );
};
