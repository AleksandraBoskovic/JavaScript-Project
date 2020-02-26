import React, {Component} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        let res = await axios.post('/players');
        res.data.sort((left, right) => {
            if(left['num_move'] < right['num_move']) return 1;
            if(left['num_move'] > right['num_move']) return -1;
            return 0;
        });
        this.setState({
            data: res.data
        })
    }

    render() {
    return (
        <div className="App">
          <table>
              <tbody>
              <tr><th>Ime</th><th>Prezime</th><th>Broj poteza</th><th>Vreme</th></tr>
              {this.state.data.map((e, i) => {
                  return(
                      <tr key={i}><td>{e['fname']}</td><td>{e['lname']}</td><td>{e['moves_number']}</td><td>{e['time']}</td></tr>
                  )
              })}
              </tbody>
          </table>
        </div>
    );

  }
}

export default App;
