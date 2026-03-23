import React, { Component } from "react";
import "./App.css";

class QuoteBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tweetURI = `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.props.currQuote.quote)}`;
    return (
      <div id="quote-box" className="card" style={{ color: this.props.bgClr }}>
        <div className="card-body px-5 py-5 d-flex flex-column justify-content-center">
          <div
            id="quote-text"
            className="quote-zone text-center"
            style={{ opacity: this.props.quoteOpacity }}
          >
            <i className="fa fa-quote-left"></i>
            <span id="text" className="ms-2">
              {this.props.currQuote.quote}
            </span>
          </div>
          <div
            id="quote-author"
            className="quote-zone align-self-end my-3 mx-2"
            style={{ opacity: this.props.quoteOpacity }}
          >
            <span>--</span>
            <span id="author" className="card-text">
              {this.props.currQuote.author}
            </span>
          </div>
          <div className="buttons-container d-flex justify-content-between px-2 mt-3">
            <a
              href={tweetURI}
              target="_blank"
              id="tweet-quote"
              className="card-link btn btn-primary"
              style={{ backgroundColor: this.props.bgClr }}
            >
              <i className="fa fa-twitter fs-5"></i>
            </a>
            <button
              id="new-quote"
              className="btn btn-primary px-3 py-2"
              onClick={this.props.onChangeQuote}
              style={{ backgroundColor: this.props.bgClr }}
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgcolor: "#1d1d1d",
      currQuote: {},
      quoteOpacity: 0,
    };
    this.changeQuote = this.changeQuote.bind(this);
    this.colors = [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857",
    ];
    this.URL =
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
    this.quote = [];
  }

  getRandomIndex(length) {
    return Math.floor(Math.random() * length);
  }

  changeQuote() {
    console.log("hi");
    this.setState({
      ...this.state,
      bgcolor: this.colors[this.getRandomIndex(this.colors.length)],
      quoteOpacity: 0,
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        ...this.state,
        currQuote: this.quotes[this.getRandomIndex(this.quotes.length)],
        quoteOpacity: 1,
      });
    }, 500);
  }

  componentDidMount() {
    fetch(this.URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Some error occured!");
        }
        return res.json();
      })
      .then((data) => {
        this.quotes = data.quotes;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.setState((state) => {
            return {
              ...state,
              bgcolor: this.colors[this.getRandomIndex(this.colors.length)],
              currQuote: this.quotes[this.getRandomIndex(this.quotes.length)],
              quoteOpacity: 1,
            };
          });
        }, 500);
      })
      .catch((err) => console.log("err -->", err.message));
  }

  render() {
    return (
      <div
        className="wrapper vh-100 vw-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: this.state.bgcolor,
          color: this.state.bgcolor,
        }}
      >
        <QuoteBox
          currQuote={this.state.currQuote}
          onChangeQuote={this.changeQuote}
          bgClr={this.state.bgcolor}
          quoteOpacity={this.state.quoteOpacity}
        />
      </div>
    );
  }
}
