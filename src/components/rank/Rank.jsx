import './Rank.css';

const Rank = ({user, onResetClick}) => {
    // entries = total people detected across all of this user's photos
    const count = Number(user.entries);
    const message = count > 0
        ? `${user.name}, you've found ${count} ${count === 1 ? 'person' : 'people'} so far`
        : `Welcome, ${user.name}!`;

    return (
        <div className = "center rank">
            <div className='f3'>
                {message}
            </div>
            {/* nothing to reset until something's been counted */}
            {count > 0 && (
                <button className="rank-reset" onClick={onResetClick}>
                    Reset count
                </button>
            )}
        </div>
    )
}

export default Rank;
