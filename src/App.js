import React, { Component } from 'react';

import Intro from './components/Intro.js'
import LeaderBoard from './components/LeaderBoard.js'
import QuestionsDisplay from './components/QuestionsDisplay'
import './index.css'

class App extends Component {
  state = {
    playerName: '',
    showIntro: true,
    displayQuestions: false,
    wonState: false,
    lostState: false,
    leaderBoardState: false,
    score: 0,
  }

  playerNameSubmitted = (name) => {
    this.setState({
      playerName: name,
      showIntro: false,
      displayQuestions: true
    })
  }


  handleGoToLeaderBoard = () => {
    this.setState({
      leaderBoardState: true,
      displayQuestions: false,
      showIntro: false
    })
  }

  handlePlayAgain = () => {
    this.setState({
      playerName: '',
      showIntro: true,
      displayQuestions: false,
      wonState: false,
      lostState: false,
      leaderBoardState: false,
      score: 0,
    })
  }

  handlePlayerHasLost = () => {
    this.setState({
      lostState: true
    })
  }

  handlePlayerHasWon = () => {
    this.setState({
      wonState: true,
      displayQuestions: false,
      score: this.state.score + 150,
      leaderBoardState: true
    })
  }

  handleIncrementScore = () => {
    this.setState({
      score: this.state.score + 150,
    })
  }

  render() {
    const { showIntro,
      playerName,
      wonState,
      leaderBoardState,
      score,
      lostState,
      displayQuestions,
    } = this.state

    return (
      <div className="App">
        <div className='main'>
          <div className='filter-div'>
            {playerName &&
              <div style={styles.playerDetailsDiv}>
                <div style={{ display: 'block', fontSize: '35px' }}>
                  {playerName}
                </div>
                <div style={{ display: 'block' }}>
                  {score}
                </div>
              </div>}
            {
              showIntro &&
              <Intro onPlayerNameSubmit={this.playerNameSubmitted}
                handleGoToLeaderBoard={this.handleGoToLeaderBoard} />
            }
            {
              displayQuestions &&
              <QuestionsDisplay wonState={wonState}
                lostState={lostState}
                playerHasLost={this.handlePlayerHasLost}
                playerHasWon={this.handlePlayerHasWon}
                handleGoToLeaderBoard={this.handleGoToLeaderBoard}
                handlePlayAgain={this.handlePlayAgain}
                incrementScore={this.handleIncrementScore} />
            }
            {
              leaderBoardState &&
              <LeaderBoard wonState={wonState}
                lostState={lostState}
                score={score}
                playerName={playerName}
                handlePlayAgain={this.handlePlayAgain} />
            }
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  playerDetailsDiv: {
    color: 'white',
    textAlign: 'left',
    minWidth: '10%',
    position: 'fixed',
    top: 20,
    left: 20,
    padding: 20,
    backgroundColor: 'rgba(0,0,0, .5)',
    borderRadius: 4
  }
}

export default App;
