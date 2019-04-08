import React from 'react'

import { Modal } from 'react-bootstrap'
import { FaTrophy, FaRecycle, FaRepeat } from 'react-icons/lib/fa'

class LeaderBoard extends React.Component {

    state = {
        scores: [],
        resetModal: false
    }

    componentDidMount() {
        let savedScores = JSON.parse(window.localStorage.getItem('quizScores'))
        this.setState({
            scores: savedScores && savedScores.length > 0 ? savedScores : []
        }, () => {
            if (this.props.wonState === true || this.props.lostState === true) {
                this.addToBoard()
            }
        })

    }


    addToBoard() {
        const { scores } = this.state

        let savedScores = JSON.parse(window.localStorage.getItem('quizScores'))
        if (savedScores && savedScores.length) {
            this.setState({
                scores: savedScores
            })
        }

        const score = {
            playerName: this.props.playerName,
            score: this.props.score
        }
        this.setState({
            scores: [...scores, score]
        }, () => {
            window.localStorage.setItem('quizScores', JSON.stringify(this.state.scores))
        })
    }

    showResetModal = () => {
        this.setState({
            resetModal: true
        })
    }

    handleClose = () => {
        this.setState({
            resetModal: false
        })
    }

    handleReset = () => {
        let savedScores = JSON.parse(window.localStorage.getItem('quizScores'))
        if (savedScores && savedScores.length) {
            window.localStorage.removeItem('quizScores')
            this.setState({
                resetModal: false,
                scores: []
            })
        }

    }


    render() {
        const { scores } = this.state
        return (
            <div className='leader-board-div' style={styles.scoresDiv}>
                {this.props.wonState ? 'Congrats, YOU WON!!' : this.props.lostState ? 'Better luck next time' : ''}
                <h3 style={{ color: 'darkblue' }}>LeaderBoard <FaTrophy size={50} /></h3><br />
                <div className='leader-board-table'>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={styles.tableCell}>#</th>
                                <th style={styles.tableCell}>Player Name</th>
                                <th style={styles.tableCell}>Score</th>
                            </tr>
                        </thead>
                        <tbody className='leader-board-table'>
                            {scores && scores.length > 0 ? scores.sort((x, y) => y.score - x.score).map((score, i) =>
                                (
                                    <tr key={score.playerName + i}>
                                        <td style={styles.tableCell}>{i + 1}</td>
                                        <td style={styles.tableCell}>{score.playerName}</td>
                                        <td style={styles.tableCell}>  {score.score}</td>
                                    </tr>
                                )
                            ) : <tr><td>The list is empty</td></tr>}

                        </tbody>
                    </table>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button className='button' type='button' onClick={this.props.handlePlayAgain} >
                        {
                            this.props.wonState || this.props.lostState ?
                                <div> Play Again <FaRepeat /></div> :
                                'GIVE IT A TRY'
                        }
                    </button>
                    <button className='reset-button' type='button' onClick={this.showResetModal} >Reset <FaRecycle /></button>
                </div>
                <Modal
                    size="lg"
                    centered
                    show={this.state.resetModal}
                    onHide={this.handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title >
                            Reset LeaderBoard
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Are you sure you want to reset the LeaderBoard?
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='button' type='button' onClick={this.handleClose} >Close</button>
                        <button className='reset-button' type='button' onClick={this.handleReset} >Reset</button>
                    </Modal.Footer>
                </Modal>


            </div>
        )
    }
}

const styles = {
    scoresDiv: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30,
        borderRadius: '4px',
        boxShadow: '0px 18px 67px - 29px rgba(0,0,0,0.75)',
    },
    tableCell: {
        textAlign: 'center'
    }
}

export default LeaderBoard