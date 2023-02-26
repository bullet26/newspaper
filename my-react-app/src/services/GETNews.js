import { useState, useEffect } from 'react';
import useHTTP from '../hooks/useHTTP';

const TOP_NEWS_BASE_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = '177f9e95c3694d95aaf3d3f378c7c813';

export const GetTopNews = () => {
    const { request, fetchStatus, setFetchStatus } = useHTTP();
    const [TOPnews, setTOPNews] = useState();

    const transformData = data => {
        return data.map(item => ({
            title: item.title,
            url: item.url,
            img: item.urlToImage,
        }));
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const { res } = await request({ url: TOP_NEWS_BASE_URL, body: { country: 'ua', pageSize: 4, category: 'general' }, key: API_KEY });

        if (!!res) {
            setFetchStatus('confirmed');
            setTOPNews(() => transformData(res.articles));
        }
    };

    return { TOPnews, fetchStatus };
};
