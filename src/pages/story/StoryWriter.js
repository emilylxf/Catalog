import React from 'react';

import "../../assets/css/StoryWriter.css";
import { Form, Container, Row, Col} from 'react-bootstrap'
import MarkdownIt from 'markdown-it';
import MdEditor, { Plugins } from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

MdEditor.use(Plugins.AutoResize, {
  min: 500,
  max: 800
});
MdEditor.use(Plugins.TabInsert, {
  tabMapValue: 1,
});

// Initialize a markdown parser
const mdParser = new MarkdownIt({

});

class StoryWriter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        menu: true,
        md: true,
        html: false
      },
      showMd: true,
      content_html: '',
      content_text: ''
    }
    this.markdownClass = 'writer-panel'
    this.handleChangeView = this.handleChangeView.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleChangeView() {
    this.setState({
      showMd: !this.state.showMd
    })
  }

  handleEditorChange({ html, text }) {
    this.setState({
      content_html: html,
      content_text: text
    })
  }
  
  render() {
    return (
      <div>
        <div>
          <button onClick={this.handleChangeView}></button>
        </div>
        <Form>
          <Container>
            <Row className="modal_item">
              <Col>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  value={this.state.title}
                  placeholder="Title"
                  onChange={this.handleInputChange}
                ></Form.Control>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className="modal_item">
              <Col>
                <Form.Label>Transfer From</Form.Label>
                <Form.Control
                  name="transfer_from"
                  type="text"
                  value={this.state.transfer_from}
                  placeholder="N/A"
                  onChange={this.handleInputChange}
                ></Form.Control>
              </Col>
              <Col>
                <Form.Label>Transfer To</Form.Label>
                <Form.Control
                  name="transfer_to"
                  type="text"
                  value={this.state.transfer_to}
                  placeholder="N/A"
                  onChange={this.handleInputChange}
                ></Form.Control>
              </Col>
            </Row>
          </Container>
          <Form.Group className="form_group modal_item">
            <Form.Label>Message</Form.Label>
            {this.state.showMd && (
              <MdEditor 
              style = {{ marginLeft: '5rem', marginRight: '5rem' }}
              markdownClass={this.markdownClass} 
              view={this.state.view} 
              renderHTML={text => mdParser.render(text)} 
              onChange={this.handleEditorChange} 
              />
            )}
            {!this.state.showMd && (
              <div dangerouslySetInnerHTML={{__html: this.state.content_html}} />
            )}
            
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default StoryWriter;
