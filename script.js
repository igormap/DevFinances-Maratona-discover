const Modal = {
  // alternar entre active e não active para abrir/fechar o modal
  openClose() {
    document.querySelector('.modal-overlay').classList.toggle('active')
  }
}

const Transaction = {
  // Lista de objetos da tabela
  all: [
    {
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    description: 'Website',
    amount: 50000,
    date: '23/01/2021'
  },
  {
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021'
  },
],
  add(transaction) {
    Transaction.all.push(transaction)

    App.reload()
  },

  remove(index) {
    Transaction.all.splice(index, 1)

    App.reload()
  },
  
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
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    // adiciona o tr dentro do tbody criado dentro de JS
    DOM.transactionsContainer.appendChild(tr)
  },

  // o html interno de uma transação, substitui o dado da tabela em html
  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick="Transaction.remove.${index}" src="./assets/minus.svg" alt="Remover transação">
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
  formatAmount(value) {
    value = Number(value) * 100
    return value
  },

  formatDate(date) {
    const splittedDate = date.split("-")
    // ordena a data para o formato convencional
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },

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

const Form = {
  // puxa os dados do html e define-os como propriedade
  description: document.querySelector('input#description'),
  date: document.querySelector('input#amount'),
  amount: document.querySelector('input#date'),

  // pega os valores das propriedades
  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

  validateFields() {
    const { description, amount, date } = Form.getValues()

    // trim() faz uma limpeza dos espaços vazios da string
    if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
       throw new Error("Por favor, preencha todos os campos")
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues()

    amount = Utils.formatAmount(amount)
    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date
    }
  },

  clearFields() {
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },

  submit(event) {
    // inibe o comportamento padrão do formulário de enviar as infos para a url
    event.preventDefault()

    // parte de captura de erros que são lançados pelo throw
    try {
      // validar os dados
      Form.validateFields()
      // formatar os valores
      const transaction = Form.formatValues()
      // salvar os dados
      Transaction.add(transaction)
      // apagar os dados do formulários
      Form.clearFields()
      // fechar o Modal
      Modal.openClose()

    } catch (error) {
      alert(error.message)
    }

    // verificar se os campos foram preenchidos
    Form.validateFields()

    
    Form.formatData()
  },
}

// responsável por iniciar as funcionalidades 
const App = {
  // o que roda no início do app
  init() {
    Transaction.all.forEach(DOM.addTransaction)
    
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