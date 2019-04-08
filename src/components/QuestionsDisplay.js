import React from 'react'
import Questions from '../Questions.json'
import { FaTrophy, FaAngleDoubleRight, FaRepeat } from 'react-icons/lib/fa'


class QuestionsDisplay extends React.Component {
    state = {
        questions: Questions,
        currentQuestionIndex: 0,
        answerIsCorrect: null,
        chosenAnswerIndex: null,
    }


    handleChooseAnswer = (answerIndex) => {
        this.setState({
            chosenAnswerIndex: answerIndex
        })
    }

    handleCheckAnswer = () => {
        const { chosenAnswerIndex, currentQuestionIndex, questions } = this.state
        if (currentQuestionIndex === 9) {
            this.setState({
                leaderBoardState: true,
            }, () => this.props.playerHasWon())

        } else if (chosenAnswerIndex === questions[currentQuestionIndex].correctAnswerIndex) {
            this.setState({
                answerIsCorrect: true
            }, () => this.props.incrementScore())

        } else {
            this.props.playerHasLost()
        }
    }

    handleGoToNextQuestion = () => {
        const { currentQuestionIndex } = this.state

        const newQuestionIndex = currentQuestionIndex + 1
        this.setState({
            currentQuestionIndex: newQuestionIndex,
            chosenAnswerIndex: null,
            answerIsCorrect: false
        })

    }

    render() {
        const {
            currentQuestionIndex,
            chosenAnswerIndex,
            questions,
            answerIsCorrect
        } = this.state

        const {
            lostState
        } = this.props

        return (
            <div className='questions-div' style={styles.questionsDiv}>
                <div style={styles.questionDiv}>
                    {questions[currentQuestionIndex].question}
                </div>
                <div style={styles.answersDiv}>
                    {
                        questions[currentQuestionIndex].answers.map((answer, i) =>
                            <div key={answer}
                                onClick={() => !answerIsCorrect && !lostState && this.handleChooseAnswer(i)}
                                style={(chosenAnswerIndex === i && !lostState && !answerIsCorrect) ? { backgroundColor: '#2993FB', color: 'white' }
                                    : (lostState && chosenAnswerIndex === i) ? { backgroundColor: 'rgb(199, 37, 37)', color: 'white' }
                                        : (answerIsCorrect && chosenAnswerIndex === i) ? { backgroundColor: 'darkgreen', color: 'white' } : {}}
                                className='answer-div'>
                                {answer}
                            </div>
                        )
                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {!answerIsCorrect && !lostState &&
                        <button className='button' type='button'
                            style={chosenAnswerIndex === null ? styles.disabledButton : {}}
                            onClick={this.handleCheckAnswer} disabled={chosenAnswerIndex === null}>Check</button>
                    }
                    {
                        answerIsCorrect &&
                        <button className='button' type='button' onClick={this.handleGoToNextQuestion}>Next <FaAngleDoubleRight /></button>
                    }
                    {
                        lostState &&
                        <button className='button' type='button' onClick={this.props.handlePlayAgain} >Play Again <FaRepeat /></button>
                    }
                    {
                        lostState &&
                        <button className='button' type='button' onClick={this.props.handleGoToLeaderBoard}>LeaderBoard <FaTrophy /></button>
                    }
                </div>
            </div>
        )
    }
}

const styles = {
    questionsDiv: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    questionDiv: {
        backgroundColor: 'white',
        width: '100%',
        minHeight: '100px',
        padding: '40px',
        borderRadius: 3
    },
    answersDiv: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
        alignItems: 'center'
    },
    disabledButton: {
        backgroundColor: 'gray',
        color: 'white'
    }
}

export default QuestionsDisplay