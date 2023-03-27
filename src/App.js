import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: '',
      box: {}
    }
  }

  checkImage = (url) => {
    axios.get('https://api.sightengine.com/1.0/check.json', {
      params: {
        url,
        models: 'faces',
        api_user: 972725277,
        api_secret: 'yXRQkB95X8DCiN7VWFwh',
      },
    })
      .then(response => this.displayFaceBox(this.CalculateFaceLocation(response)))
      .catch(err => console.log(err));
  };

  CalculateFaceLocation = (data) => {
    const Face = data.data.faces[0];
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: Face.x1 * width,
      topRow: Face.y1 * height,
      rightCol: width - (Face.x2 * width),
      bottomRow: height - (Face.y2 * height)
    }
  }

  displayFaceBox =(box) =>{
    console.log(box);
    this.setState({box:box})
  }



  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }


  onButtonSubmit = () => {
    if (this.state.input !== "") {
      this.setState({ imageUrl: this.state.input });
      this.checkImage(this.state.input);
    }
  }




  render() {
    return (
      <div className="App">
        <ParticlesBg className="particles" type="tadpole" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm InputChange={this.onInputChange} ButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition box={this.state.box} ImageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;