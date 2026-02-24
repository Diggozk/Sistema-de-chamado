const url = `http://127.0.0.1:3003/chamados`

async function carregarChamado(){

    const params = new URLSearchParams(window.location.search);
    const idChamado = params.get("id");
    const response = await fetch(`${url}/${idChamado}`);
    const chamados = await response.json();

    const chamado = chamados.find(c => c.id === idChamado);

    document.getElementById("titulo").value = chamado.title;
    document.getElementById("descricao").value = chamado.description;
}

carregarChamado();

async function editar(){
    const params = new URLSearchParams(window.location.search);
    const idchamado = params.get("id");
    const title = document.getElementById("titulo").value;
    const description = document.getElementById("descricao").value;

    await fetch(`${url}/${idchamado}`,{
        method:"PUT",
        body: JSON.stringify({
           title,
           description
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(() => {
        alert("Editado com sucesso!");
        window.location.href = 'index.html'
    })

}