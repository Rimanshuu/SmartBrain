
const Rank = ({user, detections}) => {

    
    let totalEntryCount = user.entries + detections.length;
    return (
        <div className = "center">
            <div className='f3'>
                {/* later replace with real user */}
                {`${user?.name} your entry count is ${totalEntryCount}`} 
            </div>
        </div>
    )
}

export default Rank;