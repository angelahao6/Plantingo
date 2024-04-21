import PropTypes from 'prop-types';

function Rank({ image, name, points }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px'}}>
        <img src={image} alt={name} style={{ width: '90px', height: '90px' }} />
        <div>
          <p>{name}</p>
          <p>Points: {points}</p>
        </div>
      </div>
    );
}

Rank.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired
};
export default Rank;