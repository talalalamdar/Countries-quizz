import React from 'react'

import { FaTrophy, FaPlay } from 'react-icons/lib/fa'


class Intro extends React.Component {
    state = {
        playerName: ''
    }

    handleSubmit = (e) => {
        const { playerName } = this.state
        e.preventDefault()
        if (playerName.length > 0) {
            this.props.onPlayerNameSubmit(playerName)
        }
    }

    render() {
        const { playerName } = this.state
        return (
            <div className='intro-div' style={styles.introFormDiv}>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='Enter your player name...'
                        value={playerName}
                        onChange={(e) => this.setState({ playerName: e.target.value })}
                        style={styles.playerNameInput} /> <br />
                </form>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button className='button' type='submit'
                        style={playerName.length < 1 ? { backgroundColor: 'gray', color: 'white', borderColor: 'gray' } : {}}
                        onClick={this.handleSubmit} disabled={playerName.length < 1}>
                        PLAY <FaPlay />
                    </button>
                    <button className='button' type='button'
                        onClick={this.props.handleGoToLeaderBoard}>
                        LeaderBoard <FaTrophy />
                    </button>
                </div>
            </div>
        )
    }
}

const styles = {
    introFormDiv: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 50,
        paddingTop: 80,
        borderRadius: 4,
        boxShadow: '0px 18px 67px - 29px rgba(0,0,0,0.75)',
    },
    playerNameInput: {
        padding: 8,
        width: '100%',
        fontSize: '22px',
        borderRadius: 3,
        border: '1px solid black'
    },
}

export default Intro