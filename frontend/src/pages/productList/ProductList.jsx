import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import ProductCard from '../../components/productCard/ProductCard.jsx';
import { addtostore } from '../../redux/productSlice.jsx';
import { fetchProducts } from '../../networking/api.js';
import { useCallback } from 'react';

function ProductList() {
  const LIMIT = 9;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [scrollLoading, setScrollLoading] = useState(false);

  const hasFetchedInitial = useRef(false);
  const isFetchingRef = useRef(false);


  const fetchData = useCallback(async (start) => {
    try {
      const data = await fetchProducts(start);

      const existingIds = new Set(products.map(p => p.id));
      const newProducts = data.products.filter(p => !existingIds.has(p.id));

      if (newProducts.length > 0) {
        dispatch(addtostore(newProducts));
      }

      setHasMore(start + LIMIT < data.total);
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
      setScrollLoading(false);
      isFetchingRef.current = false;
    }
  }, [dispatch, products]);

  
  useEffect(() => {
    if (hasFetchedInitial.current) return;

    hasFetchedInitial.current = true;
    setLoading(true);

    const loadInitial = async () => {
      await new Promise((res) => setTimeout(res, 1000));
      await fetchData(0);
      setSkip(LIMIT);
    };

    loadInitial();
  }, [fetchData]);


  const handleScroll = useCallback(() => {
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

    if (
      nearBottom &&
      !loading &&
      !scrollLoading &&
      hasMore &&
      !isFetchingRef.current
    ) {
      isFetchingRef.current = true;
      setScrollLoading(true);

      setTimeout(async () => {
        await fetchData(skip);
        setSkip((prev) => prev + LIMIT);
      }, 1000);
    }
  }, [loading, scrollLoading, hasMore, skip, fetchData]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Container className="mt-5">
      {loading && products.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <ClipLoader size={79} color="gold" />
        </div>
      ) : (
        <>
          <Row xs={1} sm={2} md={3} className="g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          {scrollLoading && (
            <div className="text-center my-4">
              <ClipLoader size={25} color="gold" />
            </div>
          )}

          {!hasMore && (
            <div className="text-center my-3 text-muted">
              <small>No more products to load.</small>
            </div>
          )}
        </>
      )}
    </Container>
  );
}

export default ProductList;