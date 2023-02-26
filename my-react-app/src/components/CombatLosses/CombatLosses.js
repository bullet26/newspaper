import './CombatLosses.scss';
import GETrussianLosses from '../../services/GETrussianLosses';

const CombatLosses = () => {
    const { russianLosses, fetchStatus, dayOfWar } = GETrussianLosses();

    console.log(fetchStatus, russianLosses, dayOfWar);
    let items;

    if (fetchStatus === 'confirmed') {
        items = Object.entries(russianLosses).map(([key, value], i) => {
            return (
                <li className={key} key={key}>
                    <span className='losses-stat-name'> {key.replace(/_/g, ' ')} -</span>
                    <span className='losses-stat-value'> {value}</span>
                </li>
            );
        });
    }

    const View = () => {
        return (
            <div className='losses-subheader'>
                <div className='losses-day'>
                    day of war: <span>{dayOfWar}</span>
                </div>
                <ul className='losses-stat'>{items}</ul>
            </div>
        );
    };

    // TODO заюзать хук и сделать как Udemy ?? или так пойдет
    return (
        <>
            {fetchStatus === 'loading' && <h1>Loading...</h1>}
            {fetchStatus === 'error' && <h1>Error...</h1>}
            {fetchStatus === 'confirmed' && <View />}
        </>
    );
};

export default CombatLosses;
