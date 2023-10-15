import { useState, useEffect } from 'react';
import ParticlesBg from 'particles-bg';
import { Routes, Route, useNavigate } from "react-router-dom";
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';

const initialState = {
  id: '',
  name: '',
  email: '',
  password: '',
  entries: 0,
  joined: new Date(),
};

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [isSignedIn, setisSignedIn] = useState(false);
  const [user, setUser] = useState(initialState);

  const navigate = useNavigate();
  useEffect(() => {
    navigate('/signin');
    // eslint-disable-next-line
  }, [])

  const loadingUser = (data) => {
    setUser({
      ...initialState,
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const checkImage = (url) => {
    fetch('http://localhost:3001/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: url
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              setUser(prevUser => ({
                ...prevUser,
                entries: count,
              }));
            })
            .catch(console.log);
        }
        displayFaceBox(CalculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  };

  const CalculateFaceLocation = (data) => {
    const Face = data.faces[0];
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

  const displayFaceBox = (box) => {
    setBox(box);
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onisSignedInChange = () => {
    setisSignedIn(!isSignedIn);
  }

  const resetUser = () => {
    setInput('');
    setImageUrl('');
    setBox({});
    setUser(initialState);
  };

  const onButtonSubmit = () => {
    if (input !== "") {
      setImageUrl(input);
      checkImage(input);
    }
  }

  return (
    <div className="App">
      <ParticlesBg className="particles" type="custom" bg={true} />
      <Navigation SignedIn={isSignedIn} onSignedInChange={onisSignedInChange} resetUser={resetUser} />
      <Routes>
        <Route path="/" element={
          <div>
            <Logo />
            <Rank UserName={user.name} UserEntries={user.entries} />
            <ImageLinkForm InputChange={onInputChange} ButtonSubmit={onButtonSubmit} />
            <FaceRecognition box={box} ImageUrl={imageUrl} />
          </div>
        } />
        <Route path="/signin" element={<SignIn LoadUser={loadingUser} onSignedInChange={onisSignedInChange} />} />
        <Route path="/register" element={<Register LoadUser={loadingUser} onSignedInChange={onisSignedInChange} />} />
      </Routes>
    </div>
  );
}


export default App;