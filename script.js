let input = document.getElementById('input');
let buttons = document.querySelectorAll('.button');
let expression = '';
let shouldReset = false; 

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let value = button.innerText;

        if(value === 'C') {
            expression = ''; input.innerText = ' '; shouldReset = false;
        } 
        else if(value === '⌫') {
            expression = expression.slice(0, -1); 
            input.innerText = expression || '0';
            shouldReset = false;
        }
        else if(value === '=') {
            try {
                let finalExp = expression
                    .replace(/X/g, '*') 
                    .replace(/%/g, '/100') // CONVERT % TO /100
                    .replace(/√/g, 'Math.sqrt(');
                
                let openCount = (finalExp.match(/Math.sqrt\(/g) || []).length;
                let closeCount = (finalExp.match(/\)/g) || []).length;
                finalExp += ')'.repeat(openCount - closeCount);
                
                expression = eval(finalExp);
                input.innerText = expression;
                expression = expression.toString(); 
                shouldReset = true;
            } catch {
                input.innerText = 'Error'; expression = ''; shouldReset = false;
            }
        }
        else if(value === '√') {
            if(shouldReset) { expression = ''; shouldReset = false; }
            if(expression.length > 0 && (/[0-9)]/.test(expression.slice(-1)))) {
                expression += '*';
            }
            expression += '√';
            input.innerText = expression;
        }
        else if(value === '%') {
            if(shouldReset) { expression = ''; shouldReset = false; }
            expression += '/100';
            input.innerText = expression;
        }
        else {
            if(shouldReset && (/[0-9.]/.test(value))) {
                expression = '';
                shouldReset = false;
            }
            expression += value;
            input.innerText = expression;
        }
    });
});