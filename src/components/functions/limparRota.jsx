// Função para limpar a url e retirar os parâmetros
function limparRota(listaArgs, navigate, route, searchParams) {
    // Cria um novo parâmetro
    const newParams = new URLSearchParams(searchParams);

    // Remove os argumentos antigos
    for (let arg of listaArgs) {
        newParams.delete(arg);
    }

    // Cria uma nova URL
    const newSearch = newParams.toString();
    const newURL = route.pathname + (newSearch ? `?${newSearch}` : '');

    // Altera a URL para evitar que a mensagem seja exibida novamente
    return navigate(newURL, { replace: true });
}

export default limparRota;