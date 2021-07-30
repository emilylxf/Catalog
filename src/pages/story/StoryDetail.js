import React from 'react';
import axios from 'axios'
import {
    Row, 
    Col
  } from 'react-bootstrap';
import { withOktaAuth } from '@okta/okta-react';
import '../../assets/css/StoryDetail.css'
import 'bootstrap'

export default withOktaAuth( class StoryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: this.props.routerProps.match.params.article_id,
      dataFetched: false
    };
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:5000/story?article_id="+this.state.articleId, 
      {headers: { Authorization: `Bearer ${this.props.oktaAuth.authStateManager._authState.idToken.value}` }})
      .then(
        function (response) {
            this.setState({
              articleDetail: response.data[0],
              dataFetched: true
            })
          }.bind(this)
      ).catch(function (error) {
        console.log(error);
      });
  }


  render() {
    if (!this.state.dataFetched) return null;
    return (
      <div>
        <section className="post-content-section">
            <div className="container">

                <Row>
                    <Col lg={12} md={12} sm={12} className="post-title-block">
                    
                        <h1 className="text-center">{this.state.articleDetail.article_title}</h1>
                        <ul className="list-inline text-center">
                            <li>Author | Not in DB</li>
                            <li>Post Time | {this.state.articleDetail.post_time}</li>
                            <li>Last Updated Time | {this.state.articleDetail.last_updated_time}</li>
                        </ul>
                    </Col>
                    <Col lg={9} md={9} sm={12}>

                    <p>Leaving this part empty for future markdown display</p>

                    </Col>
                    <Col lg={3} md={3} sm={12}>
                        <div className="well">
                            <h2>Utility box</h2>
                            <p>BlaBla</p>
                        </div>
                        <div className="well">
                            <h2>About Author</h2>
                            <img src="" className="img-rounded" />
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
                        </div>
                    </Col>
                </Row>
            </div> 
        </section>
      </div>
    );
  }
})
