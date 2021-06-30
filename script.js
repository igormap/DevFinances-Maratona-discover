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
  // futuramente as transações serão armazenadas no local storage
  all: transactions,
  add(transaction) {
    Transaction.all.push(transaction)

    App.reload()
  },

  remove(index) {

  }
  
  // somar as entradas
  incomes() {
    let income = 0    
    Transaction.all.forEach(transaction => {
      if (transaction.amount > 0) {
         income += transaction.amount
      }
    })
    return income
  },

  // somar as saídas
  expenses() {
    let expense = 0    
    Transaction.all.forEach(transaction => {
      if (transaction.amount < 0) {
        expense += transaction.amount
      }
    })
    return expense
  },

  // entradas - saídas
  total() {
    return Transaction.incomes() + Transaction.expenses()
  },
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

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td> 
    `

    return html
  },

  // parte visual da parte que mostra os totais
  updateBalance() {
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
    document.getElementById('expenseDisplay').innerHTML =  Utils.formatCurrency(Transaction.expenses())
    document.getElementById('totalDisplay').innerHTML =  Utils.formatCurrency(Transaction.total())
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ''
  }
}

const Utils = {
  // formatação do amount
  formatCurrency(value) {
    // transformando o número e se negativo atribuindo sinal
    const signal = Number(value) < 0 ? "-" : ""

    // transformando tudo que não é numero em value. Retirando o sinal negativo
    value = String(value).replace(/\D/g, "")

    // transforma o número colocando as casas decimais
    value = Number(value) / 100

    // função que transforma o número para a formatação monetária do local escolhido
    value = value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL"
    })
 
    return signal + value
  }
}

// responsável por iniciar as funcionalidades 
const App = {
  // o que roda no início do app
  init() {
    Transaction.all.forEach(transaction => {
      DOM.addTransaction(transaction)
    })
    
    DOM.updateBalance()
  },
  reload() {
    // para evitar o repopulação na tela com os mesmos dados no reload limpa-se primeiro
    DOM.clearTransactions()
    // chama o inicio novamente para verificar se há mais dados
    App.init()
  },
}

App.init() 

Transaction.add({
  id: 30,
  description: 'Água',
  amount: -200,
  date: '23/01/2021'
})