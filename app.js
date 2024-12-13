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

function addToHistory(calculation, result) {
    const historyItem = document.createElement('li');
    historyItem.textContent = `${calculation} = ${result}`;
    historyList.appendChild(historyItem);
}

// Variables pour stocker les nombres et l'opération
let numberOne = '';
let numberTwo = '';
let operation = null;
let isRoot = false;
let rootNumber = '';
let isPercentage = false;
let expression = '';

// Fonction pour gérer les clics sur les boutons
function handleButtonClick(buttonValue) {
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
    } else if (['+', '-', '*', '/', '%', '√'].includes(buttonValue)) {
        if (buttonValue === '%') {
            isPercentage = true;
            expression += '%';
            displayInput.value = expression;
        } else if (buttonValue === '√') {
            isRoot = true;
            expression += '√';
            displayInput.value = expression;
        } else {
            if (isRoot) {
                let parts = expression.split('√');
                let numberBefore = parts[0];
                let numberAfter = parts[1];
                if (numberBefore === '') {
                    numberBefore = '1';
                }
                let result = Math.sqrt(parseFloat(numberAfter));
                let finalResult = parseFloat(numberBefore) * result;
                expression = finalResult.toString();
                isRoot = false;
            } else if (isPercentage) {
                let result = parseFloat(expression) / 100;
                expression = result.toString();
                isPercentage = false;
            }
            operation = buttonValue === '÷' ? '/' : buttonValue;
            expression += buttonValue;
            displayInput.value = expression;
        }
    } else if (buttonValue === '=') {
        let result;
        if (isRoot) {
            let parts = expression.split('√');
            let numberBefore = parts[0];
            let numberAfter = parts[1];
            if (numberBefore === '') {
                numberBefore = '1';
            }
            result = parseFloat(numberBefore) * Math.sqrt(parseFloat(numberAfter));
            displayInput.value = result.toString();
            addToHistory(expression, result.toString());
            expression = result.toString(); // Utiliser le résultat pour le prochain calcul
        } else if (isPercentage) {
            result = parseFloat(expression) / 100;
            displayInput.value = result.toString();
            addToHistory(expression, result.toString());
            expression = result.toString(); // Utiliser le résultat pour le prochain calcul
        } else {
            // Évaluer l'expression actuelle
            result = eval(expression);
            displayInput.value = result.toString();
            addToHistory(expression, result.toString());
            expression = result.toString(); // Utiliser le résultat pour le prochain calcul
        }

        // Réinitialiser les variables pour le prochain calcul
        numberOne = result.toString(); // Utiliser le résultat comme premier nombre
        numberTwo = '';
        operation = null;
        isRoot = false;
        rootNumber = '';
        isPercentage = false;
    } else {
        // Gérer les chiffres
        expression += buttonValue;
        displayInput.value = expression;
    }
}

// Ajouter un gestionnaire d'événements à chaque bouton
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', ( event) => {
        // Récupérer le texte du bouton
        let buttonValue = event.target.textContent.trim();
        handleButtonClick(buttonValue);
    });
});

// Gestionnaire d'événements pour les touches du clavier
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Mapper les touches du clavier aux boutons de la calculatrice
    const keyMap = {
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '+': '+',
        '-': '-',
        '*': '*', // Utiliser le symbole de multiplication
        '/': '/', // Utiliser le symbole de division
        'Enter': '=',
        'Backspace': 'C',
        'Escape': 'C', // Réinitialiser avec Échap
        '%': '%',
        'r': '√' // Utiliser 'r' pour la racine carrée
    };

    if (keyMap[key]) {
        // Appeler la fonction de gestion des clics de bouton
        handleButtonClick(keyMap[key]);
    }
});