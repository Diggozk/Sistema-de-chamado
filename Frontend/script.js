//função faz a requisão na API e traz os dados pedidos
const url = `http://127.0.0.1:3003/chamados`


async function registrar(){
    let titulo = document.getElementById("titulo").value
    let descricao = document.getElementById("descricao").value

    if(titulo === "" || descricao === ""){
        alert("Preencha todos os campos para registrar seu chamado")
        return
    }
    else{
        await fetch(url,{
        method: 'POST',
        body: JSON.stringify({
            title: `${titulo}`,
            description: `${descricao}`
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(Response => Response.json())
    }
}

function mostrarchamados(){
            fetch(`${url}/`, {
                    method: "GET"
            })
            .then(Response => Response.json())
            .then(chamados => {
                const list = chamados.map(chamados => {
                    return `<div>
                                <li id=listadechamados>

                                <strong data-id="${chamados.id}">${chamados.title}</strong><br>
                                ${chamados.description}<br>
                                <button onclick = "deletarchamado(this)">Excluir</button>
                                
                                <a href="editarchamado.html?id=${chamados.id}"> 
                                    <button>Editar</button> 
                                </a>

                            </li>
                        </div>
                    `;
                }).join("")

                document.getElementById("MostrarChamados").innerHTML = list
            })
            .catch(error => {
                console.error("Erro ao buscar chamados:", error)
            })
        }

async function deletarchamado(button){
    const li = button.closest("li");
    const strong = li.querySelector("strong");
    const idchamado = strong.dataset.id;

    let resposta = confirm("Deseja realmente excluir?")

    if(resposta){
        alert("Chamado excluido")
            await fetch(`${url}/${idchamado}`,{
                method: "DELETE"
            })
            .then(() => {
                li.remove();
                mostrarchamados()
            });   
    }else{
        alert("Ação cancelada")
    }
    
}
