/**
 * Gerencia o carregamento da imagem da comida (a palavra atual).
 */
export class FoodImage {
    constructor(baseSrc) {
        this.baseSrc = baseSrc;
        this.image = new Image();
        this.loaded = false;
        this.errored = false;
        this.image.src = `${baseSrc}ERROR.png`;
    }

    setIndex(index) {
        const newSrc = `${this.baseSrc}${index}.png`;
        if (this.image.src.endsWith(newSrc)) {
            return;
        }

        this.loaded = false;
        this.errored = false;
        this.image.src = newSrc;

        this.image.onload = () => {
            this.loaded = true;
        };

        this.image.onerror = () => {
            console.warn('Imagem não encontrada:', newSrc);
            this.errored = true;
        };
    }

    markAsPending() {
        this.loaded = false;
        this.errored = false;
    }

    draw(ctx, x, y, size) {
        if (this.loaded && !this.errored) {
            ctx.drawImage(this.image, x, y, size, size);
            return;
        }

        if (this.errored) {
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'darkred';
            ctx.fillRect(x, y, size, size);
            ctx.strokeRect(x, y, size, size);
        }
    }
}
