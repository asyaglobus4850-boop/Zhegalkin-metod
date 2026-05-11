class TriangleVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.cellW = 55;
        this.cellH = 40;
        this.paddingX = 25;
        this.paddingY = 20;
    }

    draw(rows, highlightCoeff = true) {
        if (!rows || rows.length === 0) return;
        
        const maxWidth = rows[0].length * this.cellW + this.paddingX + rows.length * (this.cellW / 2);
        const height = rows.length * this.cellH + 50;
        
        this.canvas.width = Math.max(700, maxWidth);
        this.canvas.height = Math.max(300, height);
        
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let row = 0; row < rows.length; row++) {
            const cells = rows[row];
            const startX = this.paddingX + row * (this.cellW / 2);
            const y = this.paddingY + row * this.cellH;
            
            for (let col = 0; col < cells.length; col++) {
                const x = startX + col * this.cellW;
                const value = cells[col];
                
                let bgColor = value === 1 ? "#4caf50" : "#f8f9fa";
                if (highlightCoeff && col === 0) {
                    bgColor = "#2196f3";
                }
                
                this.ctx.fillStyle = bgColor;
                this.ctx.fillRect(x, y, this.cellW - 2, this.cellH - 2);
                
                this.ctx.strokeStyle = "#ccc";
                this.ctx.strokeRect(x, y, this.cellW - 2, this.cellH - 2);
                
                this.ctx.fillStyle = "#333";
                this.ctx.font = "bold 18px monospace";
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "middle";
                this.ctx.fillText(value, x + (this.cellW - 2) / 2, y + (this.cellH - 2) / 2);
            }
        }
        
        for (let i = 0; i < rows.length; i++) {
            const x = this.paddingX + i * (this.cellW / 2) - 30;
            const y = this.paddingY + i * this.cellH + this.cellH / 2;
            this.ctx.fillStyle = "#2196f3";
            this.ctx.font = "italic 14px Arial";
            this.ctx.textAlign = "right";
            this.ctx.fillText(a_${i} =, x, y);
        }
    }
    
    showMessage(text, type = "info") {
        const msg = document.createElement('div');
        msg.textContent = text;
        const bgColor = type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db';
        msg.style.cssText = 
            position: fixed; bottom: 20px; right: 20px;
            background: ${bgColor}; color: white; padding: 12px 20px;
            border-radius: 8px; z-index: 1000; animation: fadeOut 2s forwards;
        ;
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 2000);
    }
}