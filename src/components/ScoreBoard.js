import './ScoreBoard.css'

export default function ScoreBoard(props) {
    let player = props.player;
    player = player.toUpperCase();
    return (
        <div className="score-container">
            <h2 className='score-header'>{player} SCORE</h2>
            <p className='score-val'>{props.score}</p>
        </div>
    );
}