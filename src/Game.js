import React, { Component } from "react";
import axios from 'axios';
import Card from './Card'

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
    this.getACard = this.getACard.bind(this);
  }
  
  async componentDidMount() {
    let response = await axios.get(
      'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      let deck_id = response.data.deck_id;
      this.setState({ deck_id });
  }

  async getACard() {
    let response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1`);
    console.log(response.data);
    this.setState(st => ({
      cards: [...st.cards, response.data.cards[0].image]
    }));

  }

  render() {
    return (
      <div>
        {this.state.cards.length < 52 ? <button onClick={this.getACard}>Give me a new card!</button> : null}
        {this.state.cards.map((card) => (<Card card={card} />))}
      </div>
    );
  }
}


export default Game;
