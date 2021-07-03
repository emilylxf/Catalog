import React from 'react';

class StoryWriter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        content: "Example content"
    };
  }

  onChange(event){
    this.setState({
      content: event.editor.getData()
    })
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default StoryWriter;
