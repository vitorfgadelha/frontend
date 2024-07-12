import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Input,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import ParticipantList from "./ParticipantList";
import NewParticipantModal from "./NewParticipantModal";
import { Button } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

const Home = () => {
  const [participants, setParticipants] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pagination, setPagination] = useState(true);
  const [count, setCount] = useState({ delivered: 0, not_delivered: 0 });
  const [pageIds, setPageIds] = useState({ first_id: null, last_id: null });

  let pagesCount = Math.ceil(3700 / 100);

  useEffect(() => {
    resetState();
    axios.get(API_URL + "count_delivered/").then((res) => {
      setCount((prevState) => ({ ...prevState, delivered: res.data.count }));
    });
    axios.get(API_URL + "count_not_delivered/").then((res) => {
      setCount((prevState) => ({
        ...prevState,
        not_delivered: res.data.count,
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getParticipants = () => {
    axios.get(API_URL).then((res) => {
      setParticipants(res.data.results);
      setPageIds({ first_id: res.data.first_id, last_id: res.data.last_id });
    });
  };

  const resetState = () => {
    getParticipants();
  };

  const onChange = (e) => {
    axios
      .get(API_URL + "?search=" + e.target.value)
      .then((res) => setParticipants(res.data.results));
  };

  const handleUpdate = (pageNumber) => {
    axios.get(API_URL + `?page=${pageNumber}`).then((res) => {
      setParticipants(res.data.results);
      setPageIds({ first_id: res.data.first_id, last_id: res.data.last_id });
    });
  };

  const toggle = () => {
    axios.get(API_URL + "generate_report/").then(() => {
      alert("Relatório Gerado");
    });
  };

  const handleClick = (event, index) => {
    event.preventDefault();
    setCurrentPage(index);
    let pageNumber = index + 1;
    handleUpdate(pageNumber);
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <div className="d-flex justify-content-center">
        {pagination && (
          <Pagination size="lg">
            <PaginationLink
              className="prev-next-buttons"
              onClick={(e) => handleClick(e, 0)}
              first
              href="#"
            ></PaginationLink>
            <PaginationItem disabled={currentPage <= 0}>
              <PaginationLink
                className="prev-next-buttons"
                onClick={(e) => handleClick(e, currentPage - 1)}
                previous
                href="#"
              ></PaginationLink>
            </PaginationItem>
            <PaginationItem disabled>
              <PaginationLink>
                {pageIds.first_id} - {pageIds.last_id}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={currentPage >= pagesCount - 1}>
              <PaginationLink
                className="prev-next-buttons"
                onClick={(e) => handleClick(e, currentPage + 1)}
                next
                href="#"
              ></PaginationLink>
            </PaginationItem>
            <PaginationLink
              className="prev-next-buttons"
              onClick={(e) => handleClick(e, pagesCount - 1)}
              last
              href="#"
            ></PaginationLink>
          </Pagination>
        )}
      </div>
      <Row>
        <Col>
          <Input
            align="center"
            placeholder="Pesquisar Nome ou CPF"
            style={{ width: "500px" }}
            value={participants.amount}
            onChange={(value) => onChange(value)}
          ></Input>
        </Col>
        <Col>
          <div>Kits Entregues: {count.delivered}</div>
        </Col>
        <Col>
          <div>Kits a entregar: {count.not_delivered}</div>
        </Col>
      </Row>
      <Row style={{ width: "auto" }}>
        <Col>
          <ParticipantList
            participants={participants}
            resetState={resetState}
          ></ParticipantList>
        </Col>
      </Row>
      <Row>
        <Col>
          <NewParticipantModal create={true} resetState={resetState} />
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button
            color="primary"
            className="float-right"
            onClick={toggle}
            style={{ minWidth: "200px" }}
          >
            Gerar Relatório
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
