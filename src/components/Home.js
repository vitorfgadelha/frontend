import React, { Component } from "react";
import { Col, Container, Input, Row, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import ParticipantList from "./ParticipantList";
import NewParticipantModal from "./NewParticipantModal";
import Paginator from "./Paginator";
import ReactPaginate from 'react-paginate';

import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  state = {
    participants: [],
    currentPage: 0,
    pagination: true,
    startIndex : 0,
    endIndex : 4
  };

  count = {
    delivered: 0,
    not_delivered: 0,
  };
  
  componentDidMount() {
    this.resetState();
    axios.get(API_URL + 'count_delivered/').then(res => {
      this.count.delivered = res.data
  })
    axios.get(API_URL + 'count_not_delivered/').then(res => {
    this.count.not_delivered = res.data
  })
}

  getParticipants = () => {
    axios.get(API_URL).then(res =>this.setState({ participants: res.data.results }));
    };

  resetState = () => {
    this.getParticipants();
  };

  onChange(e) {
    axios.get(API_URL + '?search=' + e.target.value).then(res => this.setState({ participants: res.data.results }));
  }

  handleUpdate(pageNumber) {
    axios.get(API_URL + `?page=${pageNumber}`).then(res =>this.setState({ participants: res.data.results }));
  }

  handleClick(event, index) {
    event.preventDefault();
    this.setState({
      currentPage: index
    });
    let pageNumber = index + 1
    this.handleUpdate(pageNumber)
  }

  render() {
    const { currentPage } = this.state;
    this.pageSize = 3;
    this.pagesCount = Math.ceil(3500 / 100);
    return (
      <Container style={{ marginTop: "20px" }}>
        <div className="d-flex justify-content-center">
          {this.state.pagination && (
            <Pagination size="sm">
              <PaginationItem disabled={currentPage <= 0}>
                <PaginationLink
                  className="prev-next-buttons"
                  onClick={(e) => this.handleClick(e, currentPage - 1)}
                  href="#"
                >
                  Previous
                </PaginationLink>
              </PaginationItem>
              {[...Array(this.pagesCount)].map((currentPageno, i) => (
                <PaginationItem active={i === currentPage} key={i}>
                  <PaginationLink
                    className="page-numbers"
                    onClick={(e) => this.handleClick(e, i)}
                    href="#"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                <PaginationLink
                  className="prev-next-buttons"
                  onClick={(e) => this.handleClick(e, currentPage + 1)}
                  href="#"
                >
                  Next
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          )}
        </div>
        <Row>
          <Col>
        <Input align="center"
                placeholder="Pesquisar Nome ou CPF"
                style={{ width:"500px"}}
                value={this.state.amount}
                onChange={(value) => this.onChange(value)}
                ></Input>
          </Col>
          <Col>
          <div>Kits Entregues: {this.count.delivered}</div>
          </Col>
          <Col>
          <div>Kits a entregar: {this.count.not_delivered}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <ParticipantList
              participants={this.state.participants}
              resetState={this.resetState}
              handleScroll={this.handleScroll}>
            </ParticipantList>
          </Col>
        </Row>
        <Row>
          <Col>
            <NewParticipantModal create={true} resetState={this.resetState}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;