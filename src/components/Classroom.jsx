import { useEffect, useState } from "react";
import { Col, Button, Container, Form, Row, Pagination } from "react-bootstrap";
import Student from "./Student";

const Classroom = () => {
    // 1. Fetch Student Data    
    // State vars
    const [students, setStudents] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchMajor, setSearchMajor] = useState('');
    const [searchInterest, setSearchInterest] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/f24/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => res.json())
            .then(data => {
                setStudents(data);
            });
    }, [])

    { /* 6. Search Functionality */ }
    const filteredStudents = students.filter(student => {
        const fullName = (student.name.first + " " + student.name.last).toLowerCase()

        // always include term if not searched by its field
        const nameMatch = searchName ? fullName.includes(searchName) : true;
        const majorMatch = searchMajor ? student.major.toLowerCase().includes(searchMajor) : true;
        const interestMatch = searchInterest ? student.interests.some(interest => interest.toLowerCase().includes(searchInterest)) : true;

        return nameMatch && majorMatch && interestMatch;
    });

    {/* 8. Basic Pagination */ }
    const paginatedData = filteredStudents.slice((page - 1) * 24, page * 24);
    const totalPages = Math.ceil(filteredStudents.length / 24);
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === page}
                onClick={(() => setPage(number))}
            >
                {number}
            </Pagination.Item>
        );
    }
    <Pagination.Last />


    console.log(students);

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={searchName} onChange={(e) => setSearchName(e.target.value.trim().toLowerCase())} />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={searchMajor} onChange={(e) => setSearchMajor(e.target.value.trim().toLowerCase())} />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={searchInterest} onChange={(e) => setSearchInterest(e.target.value.trim().toLowerCase())} />
            <br />
            {/* 7. Reset Search */}
            <Button variant="neutral" onClick={() => {
                setSearchInterest('');
                setSearchMajor('');
                setSearchName('');
                setPage(1);
            }}>Reset Search</Button>
        </Form>
        <Container fluid>
            {/* 2. Display # of Students */}
            <p>There are {filteredStudents.length} student(s) matching your search.</p>
            <Row>
                { /* TODO Students go here! */}
                { /* 3. Displaying Student Names */}
                { /* 4. Formatting Student Data */}
                {paginatedData.length > 0 ? (
                    paginatedData.map(s => (<Col key={s.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                        <Student {...s} />
                    </Col>
                    ))
                ) : (<p>No students found</p>)}
            </Row>
        </Container>

        <Pagination>
            {/* 9. Next & Previous Buttons */}
            <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Pagination.Prev>
            {paginationItems}
            <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</Pagination.Next>
        </Pagination>
    </div>

}

export default Classroom;