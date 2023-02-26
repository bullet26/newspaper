const setContent = (process, Component) => {
    switch (process) {
        case 'loading':
            return <h1>Loading...</h1>;
        case 'confirmed':
            return <Component />;
        case 'error':
            return <h1>Error...</h1>;
        default:
            throw new Error('Unexpected process state');
    }
};

export default setContent;
