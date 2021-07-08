import React, { useEffect, useState } from 'react';
import axios from 'axios'

import "../../assets/css/StoryWriter.css";
import { useOktaAuth } from '@okta/okta-react';
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

const StoryWriter = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [view, setView] = useState({
    menu: true,
    md: true,
    html: false
  });
  const [showMd, setShowMd] = useState(true);
  const [contentHtml, setContentHtml] = useState('');
  const [contentText, setContentText] = useState('');
  const [title, setTitle] = useState('');
  const [transferFrom, setTransferFrom] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const md = new Remarkable('full', {
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

  function handleChangeView() {
    setShowMd(!showMd)
  }

  function handleInputChange() {
    
  }

  function handleEditorChange({ html, text }) {
    setContentHtml(html)
    setContentText(text)
  }

  function handleArticleSubmit() {
    const config = {
      headers: { Authorization: `Bearer ${authState.idToken.idToken}` }
    };
    if (!localStorage.getItem("user_id")) {
      axios
      .get("http://127.0.0.1:5000/user", config)
      .then(
        function (response) {
          //Perform action based on response
          localStorage.setItem("user_id", response.data)
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
        //Perform action based on error
      });
    }
    const body = {
      article_content: contentText,
      article_title: "test_article"
    }
    axios
      .post("http://127.0.0.1:5000/story?user_id="+localStorage.getItem("user_id"),
      body,
      config
      ).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  
  
  return (
    <div>
      <div>
        <button onClick={handleChangeView}>Toggle</button>
      </div>
      <div>
        <button onClick={handleArticleSubmit}>Submit</button>
      </div>
      <Form>
        <Container>
          <Row className="modal_item">
            <Col>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                value={title}
                placeholder="Title"
                onChange={handleInputChange}
              ></Form.Control>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="modal_item">
            <Col>
              <Form.Label>Transfer From</Form.Label>
              <Form.Control
                name="transferFrom"
                type="text"
                value={transferFrom}
                placeholder="N/A"
                onChange={handleInputChange}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label>Transfer To</Form.Label>
              <Form.Control
                name="transferTo"
                type="text"
                value={transferTo}
                placeholder="N/A"
                onChange={handleInputChange}
              ></Form.Control>
            </Col>
          </Row>
        </Container>
        <Form.Group className="form_group modal_item">
          <Form.Label>Message</Form.Label>
          {showMd && (
            <MdEditor 
            style = {{ marginLeft: '5rem', marginRight: '5rem' }}
            value = {contentText}
            view={view} 
            renderHTML={text => mdParser.render(text)} 
            onChange={handleEditorChange} 
            />
          )}
          {!showMd && (
            <div dangerouslySetInnerHTML={{__html: md.render(contentText)}} />
          )}
          
        </Form.Group>
      </Form>
    </div>
  );
}

export default StoryWriter;
