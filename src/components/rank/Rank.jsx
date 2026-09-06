
const Rank = ({user}) => {

    return (
        <div className = "center">
            <div className='f3'>
                {/* later replace with real user */}
                {`${user?.name} your entry count is ${user.entries}`} 
            </div>
        </div>
    )
}

export default Rank;