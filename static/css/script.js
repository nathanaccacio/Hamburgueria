let cart = [];
let modalQt = 1;
let modalKey = 0;

const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

// Listagem das burguers
cardapio.map((item, index)=>{
    let burguerItem = c('.models .ham-item').cloneNode(true);
    
    burguerItem.setAttribute('data-key', index);
    burguerItem.querySelector('.ham-item--img img').src = item.img;
    burguerItem.querySelector('.ham-item--preco').innerHTML = `R$ ${item.preco.toFixed(2)}`;
    burguerItem.querySelector('.ham-item--nome').innerHTML = item.nome;
    burguerItem.querySelector('.ham-item--desc').innerHTML = item.descricao;
    
    burguerItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.ham-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

        c('.burguergrande img').src = cardapio[key].img;
        c('.burguerInfo h1').innerHTML = cardapio[key].nome;
        c('.burguerInfo--desc').innerHTML = cardapio[key].descricao;
        c('.burguerInfo--atualpreco').innerHTML = `R$ ${cardapio[key].preco.toFixed(2)}`;
        c('.burguerInfo--adicional.selected').classList.remove('selected');
        cs('.burguerInfo--adicional').forEach((adicional, adicionalIndex)=>{
            if(adicionalIndex == 2) {
                adicional.classList.add('selected');
            }
            adicional.querySelector('span').innerHTML = cardapio[key].adicional[adicionalIndex];
        });

        c('.burguerInfo--qt').innerHTML = modalQt;
        

        c('.burguerjanelaarea').style.opacity = 0;
        c('.burguerjanelaarea').style.display = 'flex';
        setTimeout(()=>{
            c('.burguerjanelaarea').style.opacity = 1;
        }, 200);
    });

    c('.burguer-area').append( burguerItem );
});

// Eventos do MODAL
function closeModal() {
    c('.burguerjanelaarea').style.opacity = 0;
    setTimeout(()=>{
        c('.burguerjanelaarea').style.display = 'none';
    }, 500);
}
cs('.burguerInfo--cancelButton, .burguerInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});
c('.burguerInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1) {
        modalQt--;
        c('.burguerInfo--qt').innerHTML = modalQt;
    }
});
c('.burguerInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.burguerInfo--qt').innerHTML = modalQt;
});
cs('.burguerInfo--adicional').forEach((adicional, adicionalIndex)=>{
    adicional.addEventListener('click', (e)=>{
        c('.burguerInfo--adicional.selected').classList.remove('selected');
        adicional.classList.add('selected');
    });
});
c('.burguerInfo--addButton').addEventListener('click', ()=>{
    let adicional = parseInt(c('.burguerInfo--adicional.selected').getAttribute('data-key'));
    let identifier = cardapio[modalKey].id+'@'+adicional;
    let key = cart.findIndex((item)=>item.identifier == identifier);
    if(key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id:cardapio[modalKey].id,
            adicional,
            qt:modalQt
        });
    }
    updateCart();
    closeModal();
});

c('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0) {
        c('aside').style.left = '0';
    }
});
c('.menu-closer').addEventListener('click', ()=>{
    c('aside').style.left = '100vw';
});

function updateCart() {
    c('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) {
            let burguerItem = cardapio.find((item)=>item.id == cart[i].id);
            subtotal += burguerItem.preco * cart[i].qt;

            let cartItem = c('.models .cart--item').cloneNode(true);

            let burgueradicionalnome;
            switch(cart[i].adicional) {
                case 0:
                    burgueradicionalnome = '+ Bacon';
                    break;
                case 1:
                    burgueradicionalnome = '+ Carne';
                    break;
                case 2:
                    burgueradicionalnome = '+ Maionese';
                    break;
            }
            let burguernome = `${burguerItem.nome} (${burgueradicionalnome})`;

            cartItem.querySelector('img').src = burguerItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = burguernome;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });

            c('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}