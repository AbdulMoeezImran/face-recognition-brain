import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
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
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        password: '',
        entries: 0,
        joined: new Date()
      }
    }
  }

  loadingUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  componentDidMount() {
    fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(console.log)
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
      .then(response => {
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response=> response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user, {entries:count}))
          })
        }
        this.displayFaceBox(this.CalculateFaceLocation(response))
      })
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

  displayFaceBox = (box) => {
    this.setState({ box: box })
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

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }


  render() {
    const { isSignedIn, imageUrl, route, box, } = this.state;
    return (
      <div className="App">
        <ParticlesBg className="particles" type="tadpole" bg={true} />
        <Navigation SignedIn={isSignedIn} RouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank UserName={this.state.user.name} UserEntries={this.state.user.entries} />
            <ImageLinkForm InputChange={this.onInputChange} ButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={box} ImageUrl={imageUrl} />
          </div>
          : (
            route === 'signin'
              ? <SignIn LoadUser={this.loadingUser} RouteChange={this.onRouteChange} />
              : <Register LoadUser={this.loadingUser} RouteChange={this.onRouteChange} />
          )

        }
      </div>
    );
  }
}

export default App;