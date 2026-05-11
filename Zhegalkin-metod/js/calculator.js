class ZhegalkinCalculator {
    constructor() {
        this.variablesCount = 3;
        this.truthTable = [];
        this.triangleRows = [];
        this.coefficients = [];
    }

    setVariablesCount(n) {
        this.variablesCount = n;
        const size = Math.pow(2, n);
        this.truthTable = new Array(size).fill(0);
        return this;
    }

    setTruthTable(values) {
        if (typeof values === 'string') {
            this.truthTable = values.split('').map(v => parseInt(v));
        } else {
            this.truthTable = [...values];
        }
        return this;
    }

    buildTriangle() {
        this.triangleRows = [];
        this.coefficients = [];
        
        let currentRow = [...this.truthTable];
        this.triangleRows.push([...currentRow]);
        this.coefficients.push(currentRow[0]);
        
        while (currentRow.length > 1) {
            let nextRow = [];
            for (let i = 0; i < currentRow.length - 1; i++) {
                nextRow.push(currentRow[i] ^ currentRow[i + 1]);
            }
            this.triangleRows.push([...nextRow]);
            this.coefficients.push(nextRow[0]);
            currentRow = nextRow;
        }
        
        return {
            rows: this.triangleRows,
            coefficients: this.coefficients
        };
    }

    getPolynomial() {
        if (this.coefficients.length === 0) {
            this.buildTriangle();
        }
        
        let terms = [];
        for (let i = 0; i < this.coefficients.length; i++) {
            if (this.coefficients[i] === 1) {
                if (i === 0) {
                    terms.push("1");
                } else {
                    const term = this._indexToTerm(i);
                    terms.push(term);
                }
            }
        }
        
        return terms.length === 0 ? "0" : terms.join(" ⊕ ");
    }
    
    _indexToTerm(index) {
        if (index === 0) return "1";
        
        let vars = [];
        let n = index - 1;
        
        for (let i = 0; i < this.variablesCount; i++) {
            if (n & (1 << i)) {
                vars.push(x${i + 1});
            }
        }
        
        return vars.join("");
    }
}