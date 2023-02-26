import axios from 'axios';
import { useState } from 'react';

// TODO useCallback ??
const useHTTP = () => {
    const [fetchStatus, setFetchStatus] = useState('waiting');

    const request = async ({ url, method = 'GET', body, headers, key = null } = {}) => {
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        if (!!key) {
            axios.defaults.headers.common['Authorization'] = key;
        }

        const fetchData = () => {
            if (method === 'GET') return axios.get(url, { params: body });
            else return axios({ url, method, data: body, headers });
        };

        setFetchStatus('loading');
        try {
            const { data, status } = await fetchData();
            return { res: data, status };
        } catch ({ response }) {
            setFetchStatus('error');
            return { err: response };
        }
    };

    return { request, fetchStatus, setFetchStatus };
};

export default useHTTP;
