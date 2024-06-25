const form = document.querySelector('form')

form.addEventListener('submit',function(ev){
    ev.preventDefault()

    let name = document.querySelector("input[name='nome").value
    let endereco = document.querySelector("input[name='endereco']").value

    alert("Pedido realizado" + "\nNome do cliente: " + name + "\nEndereço do cliente: " + endereco)


})