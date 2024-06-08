onload = () => {
    document.querySelector('#bt-1').onclick = () => digito(1); // expressão de função = onclick = function() {return digito(9)}//
    document.querySelector('#bt-2').onclick = () => digito(2);
    document.querySelector('#bt-3').onclick = () => digito(3);
    document.querySelector('#bt-4').onclick = () => digito(4);
    document.querySelector('#bt-5').onclick = () => digito(5);
    document.querySelector('#bt-6').onclick = () => digito(6);
    document.querySelector('#bt-7').onclick = () => digito(7);
    document.querySelector('#bt-8').onclick = () => digito(8);
    document.querySelector('#bt-9').onclick = () => digito(9);
    document.querySelector('#bt-0').onclick = () => digito(0);
    document.querySelector('#bt-comma').onclick = virgula;  // quando n precisa passar por parametro
    document.querySelector('#bt-AC').onclick = limpar;
    document.querySelector('#bt-divide').onclick = () => operador('/');
    document.querySelector('#bt-times').onclick = () => operador('*');
    document.querySelector('#bt-minus').onclick = () => operador('-');
    document.querySelector('#bt-plus').onclick = () => operador('+');
    document.querySelector('#bt-equals').onclick = calcula;
};
// variaveis para armazenar o valor , o operador e o estado da calculadora
let valor ='0'; // valor que será apresentador
let ehNovoNumero = true; // indica se o proximo digito será de um novo numero 
let valorAnterior = 0; // valor acumulado para o calculo 
let operacaoPendente = null; // opereção acumulada 

// atualização do visor 
const atualizaVisor = () => {
    let [parteInteira, parteDecimal] = valor.split(','); // desestruturação de vetores
    if (parteInteira.length > 10){
        document.querySelector('#display').innerText ='Erro';
        return;
    } 
    let v = '';
    cont = 0;
    // lenght tamanho da string
    
    for (let i=parteInteira.length -1 ;i>=0;i--){
        if(++cont>3){
            v = '.' + v;
            cont = 1;
        }
        v = parteInteira[i] + v;
    }         
    v= v + (parteDecimal ? ',' + parteDecimal : '');   // expressão condicional  ( condição ? if verdadeiro :  if falso )  se a parte decimal tem valor retorna se não retornA STRING VAZIA
    document.querySelector('#display').innerText = v;
};

// function digito ()  / tratamento no clique do botão digito//
const digito = (n) => {
    if (ehNovoNumero){
        valor = '' +n;
        ehNovoNumero=false;
    }
    else valor += n;
    atualizaVisor();
};


// Botão virgula/decimal //
const virgula = () => {
    if (ehNovoNumero){
        valor = '0,';
        ehNovoNumero=false;
    } else if
        (valor.indexOf(',')==-1)  // indexof verifica se há uma substring , ou seja se ja extiste nesse caso , na string caso nao retorna -1
        valor += ',';
        atualizaVisor();
};

// Botão AC / All clear//
const limpar = () => {
    ehNovoNumero=true;
    valorAnterior = 0;
    valor = '0';
    operacaoPendente = null;
    atualizaVisor();
};

// converter a string em numero real 
const valorAtual = () => parseFloat(valor.replace(',' , '.'));
// operedores 
const operador = (op) => {
    calcula();
    valorAnterior = valorAtual();
    operacaoPendente = op;
    ehNovoNumero = true;
    // acumula nova operção 
}

const calcula = () => {
    if (operacaoPendente != null) {
       let resultado;
        switch(operacaoPendente){
            case '+' : resultado = valorAnterior + valorAtual (); break;
            case '-' : resultado = valorAnterior - valorAtual (); break;
            case '*' : resultado = valorAnterior * valorAtual (); break;
            case '/' : resultado = valorAnterior / valorAtual (); break;
        }
        valor = resultado.toString().replace('.' , ',');
    } 
    // reseta quando clicar  =
    ehNovoNumero = true;
    operacaoPendente = null;
    valorAnterior=0;
    atualizaVisor();
}