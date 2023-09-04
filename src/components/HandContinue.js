import './HandContinue.css'

export default function HandContinue(props) {
    return (
        <button 
            className='hand-button'
            onClick = {props.onClick}
            >Continue</button>
    );
}