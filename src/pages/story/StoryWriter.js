import React from 'react';

import "../../assets/css/StoryWriter.css";
import { Form, Container, Row, Col} from 'react-bootstrap';
import { Remarkable } from 'remarkable';
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
    this.hljs = require('highlight.js') // https://highlightjs.org/
    this.md = new Remarkable('full', {
      html:         true,        // Enable HTML tags in source
      xhtmlOut:     false,        // Use '/' to close single tags (<br />)
      breaks:       true,        // Convert '\n' in paragraphs into <br>
      langPrefix:   'language-',  // CSS language prefix for fenced blocks
      linkify:      true,         // autoconvert URL-like texts to links
      linkTarget:   '',           // set target to open link in
    
      // Enable some language-neutral replacements + quotes beautification
      typographer:  false,
    
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes: '“”‘’',
    });
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
          <button onClick={this.handleChangeView}>Toggle</button>
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
              value = {this.state.content_text}
              markdownClass={this.markdownClass} 
              view={this.state.view} 
              renderHTML={text => mdParser.render(text)} 
              onChange={this.handleEditorChange} 
              />
            )}
            {!this.state.showMd && (
              <div dangerouslySetInnerHTML={{__html: this.md.render(this.state.content_text)}} />
              // <ReactMarkdown remarkPlugins={[this.gfm]}>{this.state.content_text}</ReactMarkdown>
            )}
            
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default StoryWriter;
