import React, { Component } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import "./App.css";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "./config";
const ethereum = window.ethereum;
let web3 = new Web3(window.ethereum);
const web3Modal = new Web3Modal();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      taskCount: 0,
      tasks: [],
    };
  }

  componentDidMount() {
    localStorage.removeItem("signin");
    ethereum.on("accountsChanged", (accounts) => {
      console.log("aac", accounts);
      // If user has locked/logout from MetaMask, this resets the accounts array to empty
      if (!accounts.length) {
        // logic to handle what happens once MetaMask is locked
      }
    });
    // this.callFunc();
    // if (ethereum) {
    //   ethereum.on("accountsChanged", function (accounts) {

    //   });
    // }

    //  this.loadBlockchainData();
  }

  connectToMetaMask = async () => {
    if (ethereum !== undefined) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else {
      alert("Please Install Metamask");
    }
    const accounts = await web3.eth.getAccounts();
    if (window.localStorage.getItem("signin") == null) {
      if (accounts[0].length > 0) {
        const signature = await web3.eth.personal.sign(
          `I am shekhar`,
          accounts[0],
          "" // MetaMask will ignore the password argument here
        );
        localStorage.setItem("signin", "yes");
        this.setState({ account: accounts[0] });
      }
    } else {
    }
  };

  connectToMetaMask2 = async () => {
    const accounts = await web3.eth.getAccounts();
    const signature = await web3.eth.personal.sign(
      `I am shekhar`,
      accounts[0],
      "" // MetaMask will ignore the password argument here
    );
  };
  logout = async () => {
    localStorage.removeItem("signin");
    this.setState({ account: "" });
  };

  render() {
    return (
      <div
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        {this.state.account ? <h3>Account is - {this.state.account}</h3> : null}
        <button className={"buttonreact"} onClick={this.connectToMetaMask}>
          Connect To Metamask
        </button>
        <div style={{ marginTop: 30 }}></div>
        {this.state.account ? (
          <button className={"buttonreact"} onClick={this.logout}>
            Log Out
          </button>
        ) : null}
      </div>
    );
  }
}

export default App;
