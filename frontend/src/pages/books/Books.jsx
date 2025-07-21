// import { useEffect, useRef, useState } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { useSelector, useDispatch } from 'react-redux';
// import { ClipLoader } from 'react-spinners';
// import ProductCard from '../../components/bookCard/BookCard.jsx';
// import { addtostore } from '../../redux/productSlice.jsx';
// import { fetchProducts } from '../../networking/api.js';
// import { useCallback } from 'react';

// export const Books=()=> {
//   const LIMIT = 9;
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.products);

//   const [skip, setSkip] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [hasMore, setHasMore] = useState(true);
//   const [scrollLoading, setScrollLoading] = useState(false);

//   const hasFetchedInitial = useRef(false);
//   const isFetchingRef = useRef(false);


//   const fetchData = useCallback(async (start) => {
//     try {
//       const data = await fetchProducts(start);

//       const existingIds = new Set(products.map(p => p.id));
//       const newProducts = data.products.filter(p => !existingIds.has(p.id));

//       if (newProducts.length > 0) {
//         dispatch(addtostore(newProducts));
//       }

//       setHasMore(start + LIMIT < data.total);
//     } catch (err) {
//       console.error("API error:", err);
//     } finally {
//       setLoading(false);
//       setScrollLoading(false);
//       isFetchingRef.current = false;
//     }
//   }, [dispatch, products]);

  
//   useEffect(() => {
//     if (hasFetchedInitial.current) return;

//     hasFetchedInitial.current = true;
//     setLoading(true);

//     const loadInitial = async () => {
//       await new Promise((res) => setTimeout(res, 1000));
//       await fetchData(0);
//       setSkip(LIMIT);
//     };

//     loadInitial();
//   }, [fetchData]);


//   const handleScroll = useCallback(() => {
//     const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

//     if (
//       nearBottom &&
//       !loading &&
//       !scrollLoading &&
//       hasMore &&
//       !isFetchingRef.current
//     ) {
//       isFetchingRef.current = true;
//       setScrollLoading(true);

//       setTimeout(async () => {
//         await fetchData(skip);
//         setSkip((prev) => prev + LIMIT);
//       }, 1000);
//     }
//   }, [loading, scrollLoading, hasMore, skip, fetchData]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [handleScroll]);

//   return (
//     <Container className="mt-5">
//       {loading && products.length === 0 ? (
//         <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
//           <ClipLoader size={79} color="#03045e" />
//         </div>
//       ) : (
//         <>
//           <Row xs={1} sm={2} md={3} className="g-4">
//             {products.map((product) => (
//               <Col key={product.id}>
//                 <ProductCard product={product} />
//               </Col>
//             ))}
//           </Row>

//           {scrollLoading && (
//             <div className="text-center my-4">
//               <ClipLoader size={25} color="#03045e" />
//             </div>
//           )}

//           {!hasMore && (
//             <div className="text-center my-3 text-muted">
//               <small>No more products to load.</small>
//             </div>
//           )}
//         </>
//       )}
//     </Container>
//   );
// }










import { useEffect, useRef, useState, useCallback } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import ProductCard from '../../components/bookCard/BookCard.jsx';
import { addtostore } from '../../redux/productSlice.jsx';
import { fetchProducts } from '../../networking/api.js';

import { Navbar } from '../../components/navbar/Navbar';

export const Books = () => {
  const LIMIT = 9;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    author: '',
    availability: '',
    year: '',
    course: '',
    semester: '',
  });

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

    if (nearBottom && !loading && !scrollLoading && hasMore && !isFetchingRef.current) {
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

  // Filtered Data
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title?.toLowerCase().includes(filters.search.toLowerCase());
    const matchesAuthor = filters.author === '' || product.author?.toLowerCase().includes(filters.author.toLowerCase());
    const matchesAvailability = filters.availability === '' || (filters.availability === 'available' ? product.available : !product.available);
    const matchesYear = filters.year === '' || product.year?.toString() === filters.year;
    const matchesCourse = filters.course === '' || product.course === filters.course;
    const matchesSemester = filters.semester === '' || product.semester?.toString() === filters.semester;

    return matchesSearch && matchesAuthor && matchesAvailability && matchesYear && matchesCourse && matchesSemester;
  });

  return (
    <>
    <Navbar />
    <Container className="mt-5">
      {/* === Filter Section === */}
      <div className="mb-4 p-3 border rounded shadow-sm bg-white">
        <h5 className="mb-3 text-primary">🔍 Filter Books</h5>
        <Row className="gy-2 gx-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search by Book Name"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search by Author"
              value={filters.author}
              onChange={(e) => setFilters({ ...filters, author: e.target.value })}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={filters.availability}
              onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
            >
              <option value="">All Availability</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Control
              type="number"
              placeholder="Year Published"
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            />
          </Col>
          <Col md={3}>
            <Form.Select
              value={filters.course}
              onChange={(e) => setFilters({ ...filters, course: e.target.value })}
            >
              <option value="">All Courses</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select
              value={filters.semester}
              onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
            >
              <option value="">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Text muted>Filters will apply live on scroll and search.</Form.Text>
          </Col>
        </Row>
      </div>

      {/* === Books List === */}
      {loading && products.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <ClipLoader size={79} color="#03045e" />
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center my-5 text-muted">
              <h5>No books match your filters.</h5>
            </div>
          ) : (
            <Row xs={1} sm={2} md={3} className="g-4">
              {filteredProducts.map((product) => (
                <Col key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}

          {scrollLoading && (
            <div className="text-center my-4">
              <ClipLoader size={25} color="#03045e" />
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
    </>
  );
};
