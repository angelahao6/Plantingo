import firstPlace from '../assets/firstPlace.svg';
import secondPlace from '../assets/secondPlace.svg';
import thirdPlace from '../assets/thirdPlace.svg';
import Rank from '../components/Rank';
import profile1 from '../assets/profile1.svg';
import profile2 from '../assets/profile2.svg';
import profile3 from '../assets/profile3.svg';
import profile4 from '../assets/profile4.svg';
import profile5 from '../assets/profile5.svg';

const data = [
    { image: profile1, name: 'Alexander', points: 980 },
    { image: profile2, name: 'Katie', points: 570 },
    { image: profile3, name: 'Victor', points: 210 },
    { image: profile4, name: 'Rose', points: 110 },
    { image: profile5, name: 'Taylor', points: 70 },
];

function Leaderboard() {
    return (
        <div style={{
            backgroundColor: "#707C4F",
            color: "#FFFDF3",
            height: "100%", 
            paddingTop: "20%", 
            textAlign: "center", 
           }}>
            <h1 style={{
                margin: "0",
                textAlign: "center",
                }}>
                Leaderboard
            </h1>
            <div style={{
                marginTop: "10%",
            }}>
                <img src={firstPlace} />
            </div>
            <div style={{
                marginTop: "-30%",
            }}>
                <img src={secondPlace} style={{ marginRight: "70px" }}/>
                <img src={thirdPlace} style={{ marginLeft: "70px" }}/>
            </div>
            <div style={{ width: "100%", backgroundColor: "rgba(187,200,144, 0.4)", height: "45vh", display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: "auto", borderRadius: '30px' }}>
                {data.map((item, index) => (
                    <div key={index} >
                        <Rank image={item.image} name={item.name} points={item.points} />
                        <div style={{ margin: '10px', height: '2px', width: '100%', backgroundColor: 'rgba(187,200,144, 0.3)' }}></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Leaderboard;