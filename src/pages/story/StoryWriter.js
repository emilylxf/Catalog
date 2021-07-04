import React from 'react';
import MUIRichTextEditor from "mui-rte";
import { createMuiTheme, Theme, MuiThemeProvider } from '@material-ui/core/styles';
import "../../assets/css/StoryWriter.css";

const defaultTheme = createMuiTheme()
console.log(defaultTheme)
Object.assign(defaultTheme, {
  overrides: {
      MUIRichTextEditor: {
          root: {
            backgroundColor: "#fcde9c",
            marginLeft: "2%",
            marginRight: "2%"
        },
        container: {
            display: "flex",
            flexDirection: "column-reverse",
            height: "500px",
            
        },
        editor: {
            backgroundColor: "#fcde9c",
            padding: "20px",
            height: "500px",
            maxHeight: "500px",
            overflow: "auto"
        },
        toolbar: {
            borderTop: "1px solid gray",
            backgroundColor: "#ffa552",
            display: "flex",
            justifyContent: "space-around"
        },
        placeHolder: {
            backgroundColor: "#fcde9c",
            paddingLeft: 20,
            height: "60%",
            top: "20px"
        },
        anchorLink: {
            color: "#333333",
            textDecoration: "underline"
        }
      }
  }
})

class StoryWriter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        content: "Example content"
    };
    this.save = this.save.bind(this);
  }

  save(data) {
    console.log(data);
  };


  render() {
    return (
      <div>
        <MuiThemeProvider theme={defaultTheme}>
          <MUIRichTextEditor
            className="textEditor"
            label="Type something here..."
            onSave={this.save}
            inlineToolbar={true}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default StoryWriter;
