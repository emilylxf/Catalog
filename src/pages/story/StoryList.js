import React from 'react';
import {
  Card, 
  ListGroup, 
  ListGroupItem, 
  Dropdown,
  Button
  } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../../assets/css/StoryList.css'

const example_articles = [
  {
    article_id: 100,
    user_account_id: 1,
    article_content: "123123123",
    article_title: "EXAMPLE1",
    like_count: 20,
    view_count: 50,
    click_count: 50,
    post_time: new Date().toISOString(),
    last_update_time: new Date().toISOString(),
    school_from: "DeAnza",
    school_to: "NYU",
    major: "Chinese",
    graduate_year: 2021,
    degree_type: "本科",
    is_spam: false,
    is_approval: true
  },
  {
    article_id: 101,
    user_account_id: 3,
    article_content: "blablablablablabla",
    article_title: "EXAMPLE2",
    like_count: 60,
    view_count: 150,
    click_count: 150,
    post_time: new Date().toISOString(),
    last_update_time: new Date().toISOString(),
    school_from: "Foothill",
    school_to: "UCB",
    major: "Rocket Science",
    graduate_year: 2021,
    degree_type: "本科",
    is_spam: false,
    is_approval: true
  },
  {
    article_id: 102,
    user_account_id: 2,
    article_content: "testtesttesttesttesttest",
    article_title: "EXAMPLE3",
    like_count: 26,
    view_count: 150,
    click_count: 650,
    post_time: new Date().toISOString(),
    last_update_time: new Date().toISOString(),
    school_from: "DeAnza",
    school_to: "UCLA",
    major: "MATH",
    graduate_year: 2020,
    degree_type: "本科",
    is_spam: false,
    is_approval: true
  }
]
var demo_filter = {1: [0,1], 2: [1,2], 3: [0,1,2]}
class StoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderList: []
    };
    this.updateRenderList = this.updateRenderList.bind(this);
  }

  updateRenderList(event) {
    var tempList = []
    if (Number.isInteger(event)) {
      var filter_key = event
    } else {
      var filter_key = parseInt(event.target.id)
    }
    for (var i of demo_filter[filter_key]) {
      tempList.push(
        <Card className="storyCard">
          <Card.Body>
            <Card.Title>{example_articles[i].article_title}</Card.Title>
            <Card.Text>
              {example_articles[i].article_content}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>like: {example_articles[i].like_count} | view: {example_articles[i].view_count}</ListGroupItem>
            <ListGroupItem>From: {example_articles[i].school_from} | To: {example_articles[i].school_to}</ListGroupItem>
            <ListGroupItem>Major: {example_articles[i].major}</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Enter</Card.Link>
            <Card.Link href="#">Report</Card.Link>
          </Card.Body>
        </Card>
      )
    }
    this.setState({
      renderList: tempList
    })
  }

  componentDidMount() {
    this.updateRenderList(3);
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
              <Dropdown.Item onClick={this.updateRenderList} id="1">display 1,2</Dropdown.Item>
              <Dropdown.Item onClick={this.updateRenderList} id="2">display 2,3</Dropdown.Item>
              <Dropdown.Item onClick={this.updateRenderList} id="3">display all</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="storyList">
          {this.state.renderList}
        </div>
      </div>
    );
  }
}

export default StoryList;
