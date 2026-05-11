document.addEventListener('DOMContentLoaded', () => {
    const calculator = new ZhegalkinCalculator();
    const visualizer = new TriangleVisualizer('triangleCanvas');
    
    const varSelect = document.getElementById('varCount');
    const tableInput = document.getElementById('truthTable');
    const calculateBtn = document.getElementById('calculateBtn');
    const animateBtn = document.getElementById('animateBtn');
    const exampleBtn = document.getElementById('exampleBtn');
    const polynomialDiv = document.getElementById('polynomial');
    const coefficientsDiv = document.getElementById('coefficients');
    
    calculator.setVariablesCount(3);
    tableInput.value = "01101001";
    updateResult();
    
    varSelect.addEventListener('change', () => {
        const count = parseInt(varSelect.value);
        calculator.setVariablesCount(count);
        const size = Math.pow(2, count);
        tableInput.placeholder = 0${'0'.repeat(size-1)} - 1${'1'.repeat(size-1)};
        updateResult();
    });
    
    calculateBtn.addEventListener('click', () => {
        updateResult();
    });
    
    animateBtn.addEventListener('click', async () => {
        animateBtn.disabled = true;
        calculator.buildTriangle();
        
        for (let i = 1; i <= calculator.triangleRows.length; i++) {
            visualizer.draw(calculator.triangleRows.slice(0, i), false);
            await sleep(500);
        }
        visualizer.draw(calculator.triangleRows, true);
        
        animateBtn.disabled = false;
        visualizer.showMessage("Построение завершено!", "success");
    });
    
    exampleBtn.addEventListener('click', () => {
        const example = Parser.getExampleXor(parseInt(varSelect.value));
        tableInput.value = example;
        updateResult();
        visualizer.showMessage("Загружен пример XOR", "info");
    });
    
    function updateResult() {
        const validation = Parser.validateTable(tableInput.value, parseInt(varSelect.value));
        
        if (!validation.valid) {
            visualizer.showMessage(validation.message, "error");
            return;
        }
        
        calculator.setTruthTable(validation.table);
        const result = calculator.buildTriangle();
        
        visualizer.draw(result.rows);
        
        polynomialDiv.innerHTML = <strong>Полином:</strong> ${calculator.getPolynomial()};
        
        const coeffsHtml = calculator.coefficients.map((c, i) => 
            <span class="coeff-badge">a_${i} = ${c}</span>
        ).join('');
        coefficientsDiv.innerHTML = coeffsHtml;
    }
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});