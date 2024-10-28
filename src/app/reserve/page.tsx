export default function Reserve() {
    return (
        <>
            <div className="top-section">
                <h1>Reserve a Master</h1>
                <p>To schedule a session, please use the form below.</p>
                <p>For other inquires, <a>click here.</a></p>
                <form>
                    <div>
                        <label>FIRST NAME</label>
                        <input type="text"></input>
                    </div>
                    <div>
                        <label>LAST NAME</label>
                        <input type="text"></input>
                    </div>
                    <div>
                        <label>CONTACT E-EMAIL</label>
                        <input type="text"></input>
                    </div>
                    <div>
                        <label>OTHER INPUT</label>
                        <input type="text"></input>
                    </div>
                    <div>
                        <label>SESSION TYPE</label>
                        <select></select>
                    </div>

                    <button>Send Reservation</button>
                </form>
            </div>
        </>
    )
}