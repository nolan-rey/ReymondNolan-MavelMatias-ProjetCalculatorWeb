// Références
const sidebar = document.getElementById('history-sidebar');
const toggleHistory = document.getElementById('toggle-history');
const closeHistory = document.getElementById('close-history');
const historyList = document.getElementById('history-list');
const displayInput = document.getElementById('display');

// Bouton pour afficher la barre latérale
toggleHistory.addEventListener('click', () => {
    sidebar.classList.add('active');
});

// Bouton pour fermer la barre latérale
closeHistory.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Variables pour stocker les nombres et l'opération
let numberOne = '';
let numberTwo = '';
let operation = null;
let isRoot = false;
let rootNumber = '';
let isPercentage = false;
let expression = '';

// Ajouter un gestionnaire d'événements à chaque bouton
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Récupérer le texte du bouton
        let buttonValue = event.target.textContent.trim();

        // Gérer les opérations
        if (buttonValue === 'C') {
            displayInput.value = '0';
            numberOne = '';
            numberTwo = '';
            operation = null;
            isRoot = false;
            rootNumber = '';
            isPercentage = false;
            expression = '';
        } else if (['+', '-', '*', '/'].includes(buttonValue)) {
            operation = buttonValue === '÷' ? '/' : buttonValue;
            expression += buttonValue;
            displayInput.value = expression;
        } else if (buttonValue === '√') {
            isRoot = true;
            rootNumber = expression;
            expression += '√';
            displayInput.value = expression;
        } else if (buttonValue === '%') {
            isPercentage = true;
            let result = parseFloat(expression) / 100;
            displayInput.value = result.toString();
            expression = result.toString();
            numberOne = '';
            numberTwo = '';
            operation = null;
            isRoot = false;
            rootNumber = '';
            isPercentage = false;
        } else if (buttonValue === '=') {
            if (isRoot) {
                let result = Math.sqrt(parseFloat(expression.replace('√', '')));
                let finalResult = parseFloat(rootNumber) * result;
                displayInput.value = finalResult.toString();
                numberOne = '';
                numberTwo = '';
                operation = null;
                isRoot = false;
                rootNumber = '';
                expression = '';
            } else {
                let result;
                switch (operation) {
                    case '+':
                        result = eval(expression);
                        break;
                    case '-':
                        result = eval(expression);
                        break;
                    case '*':
                        result = eval(expression);
                        break;
                    case '/':
                        result = eval(expression);
                        break;
                }
                displayInput.value = result.toString();
                numberOne = '';
                numberTwo = '';
                operation = null;
                expression = '';
            }
        } else {
            // Gérer les chiffres
            expression += buttonValue;
            displayInput.value = expression;
        }
    });
});