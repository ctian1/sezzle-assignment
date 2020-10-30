import React from 'react';
import './App.css';
import Calculator from './app/components/Calculator';
import { Socket, Event, SocketContext } from 'react-socket-io';

const uri = 'wss://chris-sezzle-assignment.herokuapp.com';
const options = { transports: ['polling', 'websocket'] };


class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    Calculator.contextType = SocketContext;
    
    return (
      <Socket uri={uri} options={options}> 
        <div className="App">
          <Calculator />
        </div>
      </Socket>
    );
  }
}


export default App;
