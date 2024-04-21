import { firstPlace as hi } from '../assets/firstPlace.svg';

function Leaderboard() {
    return (
        <div style={{
            backgroundColor: "#707C4F",
            color: "#FFFDF3",
            height: "100vh", 
            paddingTop: "20%", 
            textAlign: "center", 
           }}>
            <h1 style={{
                margin: "0",
                textAlign: "center",
                }}>
                Leaderboard
            </h1>
            <p style={{
                fontSize: "30px",
                marginTop: "25%",
                marginBottom: 0,
            }}>
                Joyce
            </p>
            <hi />
            <div style={{
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                backgroundColor: "#DFD59E",
                margin: "0 auto",
            }}></div>
        </div>

    );
}

export default Leaderboard;