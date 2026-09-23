import propTypes from 'prop-types';
import './Spinner.css';
function Spinner({message=' Loading', size='meduim', className=''}) {
    return(
        <div className={`spinner-container spinner-${size} ${className}`}
        role="status"
        aria-live="polite"
        aria-label={message}
        >
        <div className="spinner-dots">
        <div className="spinner-dots"></div>
        <div className="spinner-dots"></div>
        <div className="spinner-dots"></div>
        </div>
        {message && (<p className ="spinner-message">{message}</p>)}
        </div>
    );
};
Spinner.propTypes={
    message:propTypes.string,
    size: propTypes.oneOf(['small','meduim','large']),
    className:propTypes.string,
}
export default Spinner;
