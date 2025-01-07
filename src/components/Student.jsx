const Student = (props) => {
    return <div>
        {/* TODO Student data goes here! */}
        {
        Object.keys(props).length > 0 ? <>

        {/* 5. Add Student Data */}

        {/* first and last name */}
        <h1>{props.name.first} {props.name.last}</h1>

        {/* major */}
        <p style={{fontWeight:'bold'}}>{props.major}</p>

        {/* number of credits & from WI */}
        {
            props.fromWisconsin ? <p>{props.name.first} is taking {props.numCredits} and is from Wisconsin.</p> : <p>{props.name.first} is taking {props.numCredits} and is NOT from Wisconsin.</p>
        }


        {/* interests */}
        <p style={{padding:'0'}}>They have {props.interests.length} interests including...</p>
        <ul>            
            {props.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
            ))}
        </ul>

        </> : <p>Loading...</p>}

    </div>
}

export default Student;