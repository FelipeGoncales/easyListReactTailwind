function createQuery(navigate, path, args) {
    // Cria o objeto query
    const query = new URLSearchParams();

    // Parâmetros da query
    for (const [key, value] of Object.entries(args)) {
        query.set(key, String(value));
    }

    const querySearch = query.toString();

    // Navega para home
    navigate(`${path}?${querySearch}`)
}

export default createQuery;