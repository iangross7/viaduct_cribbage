import './ScoreBoard.css'

export default function ScoreBoard(props) {
    return (
        <div className="score-container">
            {props.player}'s Score: {props.score}
        </div>
    );
}