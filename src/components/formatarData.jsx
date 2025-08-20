// Função para formatar a data
function formatarData(data) {
    if (!data) return ""; // segurança

    // Separa data em dia, mes e ano
    const [ano, mes, dia] = data.split('-');

    // Lista de meses com sua devida formatação
    const meses = ["jan", "fev", "mar", "abr", "mai", "jun",
        "jul", "ago", "set", "out", "nov", "dez"];

    // Retorna a data formatada
    return `${dia}/${meses[parseInt(mes, 10) - 1]}`
}

export default formatarData;