import React from 'react';
import axios from 'axios'
import {
  Card, 
  ListGroup, 
  ListGroupItem, 
  Dropdown,
  Button,
  Row,
  Col
  } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useOktaAuth, withOktaAuth } from '@okta/okta-react';
import '../../assets/css/StoryList.css'

function AuthListener() {
  const { authState } = useOktaAuth();
  return authState
}

export default withOktaAuth( class StoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderList: [],
      colNum: 3         //number of columns a row could contain cards
    };
    this.updateRenderList = this.updateRenderList.bind(this);
    this.state.test = ''
    
    var preRenderList = []
    axios.get("http://127.0.0.1:5000/story", 
      {headers: { Authorization: `Bearer ${this.props.authState.accessToken.accessToken}` }})
      .then(
        function (response) {
          preRenderList = response.data
          var mappingList = []
          var i = 0
          //Generate mapping list for later article card mapping
          while (i < preRenderList.length) {
            var innerList = []
            for (var j = 0; j < 3; j++) {
              if (i+j < preRenderList.length) {
                innerList.push(preRenderList[i+j])
              }
            }
            mappingList.push(innerList)
            i += 3
          }
          var tempList = (
            <div>
              {
                mappingList.map( function(innerList, rowNum) {
                  return (
                    <Row key={rowNum}>
                      {
                        innerList.map( function(article, colNum) {
                          return (
                            <Col key={colNum}>
                              <Card className="storyCard">
                                <Card.Body>
                                  <Card.Title>{article.article_title} ({article.article_id})</Card.Title>
                                  <Card.Text>
                                    {article.article_content}
                                  </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                  <ListGroupItem>like: {article.like_count} | view: {article.view_count}</ListGroupItem>
                                  <ListGroupItem>From: {article.school_from.name} | To: {article.school_to.name}</ListGroupItem>
                                  <ListGroupItem>Major: {article.major.name}</ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                  <Card.Link href="#">Enter</Card.Link>
                                  <Card.Link href="#">Report</Card.Link>
                                </Card.Body>
                              </Card>
                            </Col>
                          )
                        })
                      }
                    </Row>
                  )
                })
              }
            </div>
          )
          this.state.renderList = tempList
          this.forceUpdate()
        }.bind(this)
      ).catch(function (error) {
        console.log(error);
      });

  }

  updateRenderList(event) {
    var url = ''
    if (event == 'all' || event.target.id == 'all') {
      url = "http://127.0.0.1:5000/story"
    } else {
      url = "http://127.0.0.1:5000/story?user_id="+event.target.id
    }
    const config = {
      headers: { Authorization: `Bearer ${this.props.authState.accessToken.accessToken}` }
    };
    axios.get(url, config)
      .then(
        function (response) {
          this.setState({
            preRenderList: response.data
          })
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
        //Perform action based on error
      });

    var mappingList = []
    var i = 0
    var preRenderList = []
    //Generate mapping list for later article card mapping
    while (i < preRenderList.length) {
      var innerList = []
      for (var j = 0; j < 3; j++) {
        if (i+j < preRenderList.length) {
          innerList.push(preRenderList[i+j])
        }
      }
      mappingList.push(innerList)
      i += 3
    }
    var tempList = (
      <div>
        {
          mappingList.map( function(innerList, rowNum) {
            return (
              <Row key={rowNum}>
                {
                  innerList.map( function(article, colNum) {
                    return (
                      <Col key={colNum}>
                        <Card className="storyCard">
                          <Card.Body>
                            <Card.Title>{article.article_title} ({article.article_id})</Card.Title>
                            <Card.Text>
                              {article.article_content}
                            </Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroupItem>like: {article.like_count} | view: {article.view_count}</ListGroupItem>
                            <ListGroupItem>From: {article.school_from.name} | To: {article.school_to.name}</ListGroupItem>
                            <ListGroupItem>Major: {article.major.name}</ListGroupItem>
                          </ListGroup>
                          <Card.Body>
                            <Card.Link href="#">Enter</Card.Link>
                            <Card.Link href="#">Report</Card.Link>
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                  })
                }
              </Row>
            )
          })
        }
      </div>
    )
    this.setState({
      renderList: tempList
    })
  }


  render() {
    return (
      <div>
        <div>
          <Link to="/story/new">
            <Button variant="primary">Write</Button>
          </Link>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Example filter
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={this.updateRenderList} id="1">user_id=1</Dropdown.Item>
              <Dropdown.Item onClick={this.updateRenderList} id="2">user_id=3</Dropdown.Item>
              <Dropdown.Item onClick={this.updateRenderList} id="all">display all</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="storyList">
          {this.state.renderList}
        </div>
      </div>
    );
  }
})
