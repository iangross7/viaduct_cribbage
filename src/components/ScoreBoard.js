import './ScoreBoard.css'

export default function ScoreBoard(props) {
    return (
        <div className="score-container">
            <p className='score-header'>{props.player}'s Score</p>
            <p className='score-val'>{props.score}</p>
        </div>
    );
}