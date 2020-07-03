import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Logo from './Components/Logo/Logo'
import Rank from './Components/Rank/Rank'
import FaceDetector from './Components/FaceDetector/FaceDetector'
import './App.css';
import 'tachyons';
import Clarifai from 'clarifai';
import Signin from './Components/Signin/Signin'
import Register from './Components/Register/Register'

import StarfieldAnimation from 'react-starfield-animation'

const app = new Clarifai.App({
 apiKey: '139fbc37031f4eaea926407d96c22a81'
});


const parameters = {
          position: 'absolute',
          width: '100%',
          height: '100%'
        };


class App extends React.Component {
  constructor() {
    super();
    this.state= {
      userInput:'',
      imageURL:'',
      box: {},
      route: 'Signin',
      signedIn: false
    }
  }
 
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }

  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }



  onInputChange = (event) => {
    this.setState({userInput: event.target.value});
  }


  onButtonSubmit = () => {
    this.setState({imageURL: this.state.userInput})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.userInput)
    .then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));

  }


  onRouteChange = (route) => {
    if (route === 'validated'){
      this.setState({signedIn : true});
    } else {
      this.setState({signedIn : false});
    }
    this.setState({route: route});
  }


  render(){
    const { signedIn, imageURL, box,  } = this.state;
    return (
      <div className="App">

          <StarfieldAnimation className='particles' style={parameters}/>
          <Navigation signedIn={ signedIn } onRouteChange={ this.onRouteChange } />
          { this.state.route === 'validated' 
            ? <div> 
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
                <FaceDetector box={box} imageURL={imageURL} />
              </div>
            : (
                this.state.route === 'Signin'
                  ? <Signin onRouteChange={ this.onRouteChange } />
                  : <Register onRouteChange={ this.onRouteChange } />
              )
          }

      </div>
    )
 }

}
export default App;
