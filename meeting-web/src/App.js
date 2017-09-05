import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

// Initialize contract
var ETH_CLIENT = window.ETH_CLIENT = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var meetingABI = window.meetingABI = [{"constant":false,"inputs":[{"name":"room","type":"bytes32"}],"name":"createRoom","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"removeRoom","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"room","type":"uint256"},{"name":"start","type":"uint256"},{"name":"end","type":"uint256"}],"name":"createMeeting","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"room","type":"uint256"},{"name":"start","type":"uint256"},{"name":"end","type":"uint256"}],"name":"isBooked","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getRoom","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getRooms","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"s1","type":"uint256"},{"name":"e1","type":"uint256"},{"name":"s2","type":"uint256"},{"name":"e2","type":"uint256"}],"name":"overlap","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"MeetingCreated","type":"event"},{"anonymous":false,"inputs":[],"name":"MeetingRemoved","type":"event"}];
var meetingAddress = window.meetingAddress = '0xdf12ee66375f44b5d3bbf7d74da8b651433efc1e';
const meetingContract = window.contract = ETH_CLIENT.eth.contract(meetingABI).at(meetingAddress);

class App extends Component {
  
  constructor(props) {
    super(props); 
    this.state = {
      balance: ETH_CLIENT.eth.getBalance(ETH_CLIENT.eth.coinbase),
      newRoom: "",
      rooms: meetingContract.getRooms()
    }
  }
  componentWillMount() {
     ETH_CLIENT.eth.defaultAccount = ETH_CLIENT.eth.coinbase;

		const filter = ETH_CLIENT.eth.filter({
			fromBlock: 3400,
			toBlock: 'latest',
			address: meetingAddress,
			topics: ['0x84699ecd8b98c1d4065cc7c66983c35c972dd1bbeeb58afbcf024c52bcf3ae0b']
		});
		filter.watch((error, result) => {
			this.setState({
      	balance: ETH_CLIENT.eth.getBalance(ETH_CLIENT.eth.coinbase),
				rooms: meetingContract.getRooms()
			});
		});

		const removeFilter = ETH_CLIENT.eth.filter({
			fromBlock: 3400,
			toBlock: 'latest',
			address: meetingAddress,
			topics: ['0xc787cb72dfc8a06d7be90c89c741a4b000af50352c9add929d1d67f323ffb749']
		});
		
		removeFilter.watch((error, result) => {
			this.setState({
				rooms: meetingContract.getRooms()
			});
		});

  }

  handleRoom(e) {
    this.setState({newRoom:e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
		meetingContract.createRoom(this.state.newRoom,{value:ETH_CLIENT.toWei(1,'ether')})
		this.setState({
			newRoom:""
		});
  }

  book(id,e) {
    console.log(id,'TBD');
  }

  remove(id,e) {
		meetingContract.removeRoom(id);
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Meeting Booking</h2>
          Your Balance: <b>{ETH_CLIENT.fromWei(this.state.balance,'ether').toNumber()} RB</b>
        </div>
       
        <h2>Rooms</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input onChange={this.handleRoom.bind(this)} value={this.state.newRoom}></input>
          <input type="submit" value="Create"/>
        </form>
        {this.state.rooms[1].map((item,idx)=><h3>{ETH_CLIENT.toAscii(item)} 
          <button onClick={this.book.bind(this,idx)}>Book</button>
          <button onClick={this.remove.bind(this,idx)}>X</button></h3>)} 
      </div>
    );
  }
}

export default App;
