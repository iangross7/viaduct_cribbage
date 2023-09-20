import './ScoreBoard.css'

export default function ScoreBoard(props) {
    let player = props.player;
    let score = props.score;
    let textColor = 'white';

    if (score >= 121) {
        textColor = 'red';
    }

    player = player.toUpperCase();
    return (
        <div className="score-container">
            <h2 className='score-header'>{player} SCORE</h2>
            <p className='score-val' style={{color: textColor}}>{score}</p>
        </div>
    );
}