const Modal = {
  // alternar entre active e não active para abrir/fechar o modal
  openClose() {
    document.querySelector('.modal-overlay').classList.toggle('active')
  }
}

// Lista de objetos da tabela
const transactions = [{
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    id: 2,
    description: 'Website',
    amount: 50000,
    date: '23/01/2021'
  },
  {
    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021'
  },
]

const Transaction = {
  // somar as entradas
  incomes() {},

  // somar as saídas
  expenses() {},

  // entradas - saídas
  total() {},
}

// Substituir dados HTML por dados JS
const DOM = {
  // container que conterá as entradas
  transactionsContainer: document.querySelector('#data-table tbody'),

  // responsável por adicionar transação, parâmetro a transação e a posição
  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    // adiciona o tr dentro do tbody criado dentro de JS
    DOM.transactionsContainer.appendChild(tr)
  },

  // o html interno de uma transação, substitui o dado da tabela em html
  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    // const amount = 

    const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${transaction.amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td> 
    `

    return html
  }
}

const Utils = {
  // formatação do amount
  formatCurrency(value) {
    // transformando o número e se negativo atribuindo sinal
    const signal = Number(value) < 0 ? "-" : ""

    
  }
}

transactions.forEach(function(transaction){
  DOM.addTransaction(transaction)
})

