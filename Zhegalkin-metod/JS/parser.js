class Parser {
    static validateTable(input, varCount) {
        const expectedLen = Math.pow(2, varCount);
        const cleaned = input.replace(/[^01]/g, '');
        
        if (cleaned.length !== expectedLen) {
            return {
                valid: false,
                message: Для ${varCount} переменных нужно ${expectedLen} значений, получено ${cleaned.length}
            };
        }
        
        return {
            valid: true,
            table: cleaned.split('').map(v => parseInt(v))
        };
    }
    
    static getExampleXor(varCount) {
        if (varCount === 3) {
            return "01101001";
        }
        if (varCount === 4) {
            return "0110100110010110";
        }
        return "0110";
    }
}