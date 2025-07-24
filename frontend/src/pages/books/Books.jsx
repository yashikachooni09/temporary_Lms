import { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

import { Navbar } from '../../components/navbar/Navbar';

export const Books = () => {

  const [filters, setFilters] = useState({
    search: '',
    author: '',
    availability: '',
    year: '',
    course: '',
    semester: '',
  });

  return (
    <>
      <Navbar />
      <Container className="mt-5">
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
      </Container>
    </>
  );
};
