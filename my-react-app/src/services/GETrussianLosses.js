import { useState, useEffect } from 'react';
import useHTTP from '../hooks/useHTTP';

const russianWarshipsLatestURL = 'https://russianwarship.rip/api/v2/statistics/latest';

const GETrussianLosses = () => {
    const { request, fetchStatus, setFetchStatus } = useHTTP();

    const [russianLosses, setRussianLosses] = useState();
    const [dayOfWar, setdayOfWar] = useState();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const { res } = await request({ url: russianWarshipsLatestURL });

        if (!!res) {
            setFetchStatus('confirmed');
            setRussianLosses(res.data.stats);
            setdayOfWar(res.data.day);
        }
    };

    return { russianLosses, fetchStatus, dayOfWar };
};

export default GETrussianLosses;
