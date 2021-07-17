import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import * as data from './../images.json';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  ngOnInit(): void {
    this.playerCards.push(
      this.cards[Math.floor(Math.random() * 52)],
      this.cards[Math.floor(Math.random() * 52)]
    ),
      this.opponentCards.push(
        this.cards[Math.floor(Math.random() * 52)],
        this.cards[Math.floor(Math.random() * 52)]
      );
    this.playerCards.map((elem) => (this.playersHand += elem.value));
    this.opponentCards.map((elem) => (this.opponentsHand += elem.value));
  }

  cards: any = (data as any).default;
  playersHand = 0;
  opponentsHand = 0;
  playerCards = [];
  opponentCards = [];
  end = false;
  win = false;
  playerMoney = 100000;
  betedMoney = 0;

  onClick() {
    this.playersHand = 0;
    this.playerCards.push(this.cards[Math.floor(Math.random() * 52)]);
    this.playerCards.map((elem) => (this.playersHand += elem.value));
  }

  addBet() {
    if (this.playerMoney - 100 >= this.betedMoney && this.end === false) {
      this.betedMoney += 100;
    }
  }

  addBetOneK() {
    if (this.playerMoney - 1000 >= this.betedMoney && this.end === false) {
      this.betedMoney += 1000;
    }
  }

  addBetTenK() {
    if (this.playerMoney - 10000 >= this.betedMoney && this.end === false) {
      this.betedMoney += 10000;
    }
  }

  resetBetMoney() {
    this.betedMoney = 0;
  }

  decreeseBet() {
    if (this.betedMoney >= 100 && this.end === false) {
      this.betedMoney -= 100;
    }
  }

  onReset() {
    this.playersHand = 0;
    this.opponentsHand = 0;
    this.playerCards = [];
    this.opponentCards = [];
    this.playerCards.push(
      this.cards[Math.floor(Math.random() * 52)],
      this.cards[Math.floor(Math.random() * 52)]
    );
    this.opponentCards.push(
      this.cards[Math.floor(Math.random() * 52)],
      this.cards[Math.floor(Math.random() * 52)]
    );
    this.playerCards.map((elem) => (this.playersHand += elem.value));
    this.opponentCards.map((elem) => (this.opponentsHand += elem.value));
    if (this.end && this.win) {
      this.playerMoney += this.betedMoney;
    } else {
      this.playerMoney -= this.betedMoney;
    }
    this.win = false;
    this.end = false;
    this.betedMoney = 0;
  }

  onStay() {
    while (this.opponentsHand <= this.playersHand && this.end == false) {
      this.opponentsHand = 0;
      this.opponentCards.push(this.cards[Math.floor(Math.random() * 52)]);
      this.opponentCards.map((elem) => (this.opponentsHand += elem.value));
    }
  }

  status() {
    if (this.opponentsHand >= 22) {
      this.end = true;
      this.win = true;
      return '<div>Player WIN!!!</div>';
    } else if (this.opponentsHand == 21) {
      this.end = true;
      return '<div>BlackJack for Dealer</div>';
    }
    return '';
  }

  lookHand() {
    if (this.playersHand >= 22) {
      this.end = true;
      return '<div>You Loose!!!</div>';
    } else if (this.playersHand == 21) {
      this.end = true;
      this.win = true;
      return '<div>BlackJack for Player</div>';
    }
    return '';
  }
}
