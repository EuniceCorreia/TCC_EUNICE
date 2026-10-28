/**
 * Responsável por desenhar a cobra no canvas
 */
export class SnakeRenderer {
    constructor(ctx, gridSize) {
        this.ctx = ctx;
        this.gridSize = gridSize;

        this.palette = {
            bodyLight: '#57d17e',
            bodyDark: '#1e9a4c',
            belly: '#eafce9',
            outline: '#1e9a4c',
            tongue: '#ff6a4d',
            eyeShine: '#ffffff',
            pupil: '#0f2b1e',
        };
    }

    draw(snakeBody) {
        if (!snakeBody || snakeBody.length === 0) return;

        const centers = this.#toCenters(snakeBody);
        const bodyWidth = this.gridSize * 0.86;
        const segments = this.#splitOnWrap(centers);

        segments.forEach((segment) => {
            this.#drawShadow(segment, bodyWidth);
            this.#drawBodyRibbon(segment, bodyWidth);
            this.#drawBellyStripe(segment, bodyWidth);
            this.#drawScales(segment, bodyWidth);
        });

        this.#drawHead(segments[0], bodyWidth);
    }

    // --- Preparação -----------------------------------------------------

    #toCenters(snakeBody) {
        const r = this.gridSize / 2;
        return snakeBody.map((part) => ({ x: part.x + r, y: part.y + r }));
    }

    #splitOnWrap(centers) {
        const maxGap = this.gridSize * 1.5;
        const segments = [];
        let current = [centers[0]];

        for (let i = 1; i < centers.length; i++) {
            const prev = centers[i - 1];
            const curr = centers[i];
            const gap = Math.hypot(curr.x - prev.x, curr.y - prev.y);

            if (gap > maxGap) {
                segments.push(current);
                current = [curr];
            } else {
                current.push(curr);
            }
        }

        segments.push(current);
        return segments;
    }

    #tracePath(ctx, centers) {
        if (centers.length === 1) {
            ctx.moveTo(centers[0].x, centers[0].y);
            ctx.lineTo(centers[0].x + 0.01, centers[0].y);
            return;
        }

        ctx.moveTo(centers[0].x, centers[0].y);

        for (let i = 0; i < centers.length - 1; i++) {
            const current = centers[i];
            const next = centers[i + 1];
            const midX = (current.x + next.x) / 2;
            const midY = (current.y + next.y) / 2;

            if (i === 0) {
                ctx.lineTo(midX, midY);
            } else {
                ctx.quadraticCurveTo(current.x, current.y, midX, midY);
            }
        }

        const last = centers[centers.length - 1];
        ctx.lineTo(last.x, last.y);
    }

    // --- Camadas do corpo -------------------------------------------------

    #drawShadow(centers, bodyWidth) {
        const { ctx, gridSize } = this;
        ctx.save();
        ctx.translate(0, gridSize * 0.08);
        ctx.beginPath();
        this.#tracePath(ctx, centers);
        ctx.strokeStyle = 'rgba(6, 20, 13, 0.22)';
        ctx.lineWidth = bodyWidth * 1.02;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        ctx.restore();
    }

    #drawBodyRibbon(centers, bodyWidth) {
        const { ctx } = this;
        const gradient = this.#makeBodyGradient(centers);

        ctx.beginPath();
        this.#tracePath(ctx, centers);
        ctx.strokeStyle = this.palette.outline;
        ctx.lineWidth = bodyWidth + 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        ctx.beginPath();
        this.#tracePath(ctx, centers);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = bodyWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    }

    #makeBodyGradient(centers) {
        const { ctx } = this;
        const first = centers[0];
        const last = centers[centers.length - 1];
        const gradient = ctx.createLinearGradient(first.x, first.y, last.x, last.y);
        gradient.addColorStop(0, this.palette.bodyLight);
        gradient.addColorStop(1, this.palette.bodyDark);
        return gradient;
    }

    #drawBellyStripe(centers, bodyWidth) {
        const { ctx } = this;
        ctx.beginPath();
        this.#tracePath(ctx, centers);
        ctx.strokeStyle = this.palette.belly;
        ctx.lineWidth = bodyWidth * 0.34;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 0.85;
        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    #drawScales(centers, bodyWidth) {
        if (centers.length < 3) return;

        const { ctx, gridSize } = this;
        const scaleGap = gridSize * 0.62;
        const scaleSize = bodyWidth * 0.16;

        ctx.strokeStyle = 'rgba(15, 43, 30, 0.28)';
        ctx.lineWidth = Math.max(1.5, gridSize * 0.035);
        ctx.lineCap = 'round';

        let distanceSinceLastScale = scaleGap * 0.5;

        for (let i = 1; i < centers.length - 1; i++) {
            const prev = centers[i - 1];
            const curr = centers[i];
            const segmentLength = Math.hypot(curr.x - prev.x, curr.y - prev.y);
            distanceSinceLastScale += segmentLength;

            if (distanceSinceLastScale < scaleGap) continue;
            distanceSinceLastScale = 0;

            const dx = curr.x - prev.x;
            const dy = curr.y - prev.y;
            const len = Math.hypot(dx, dy) || 1;
            const normalX = -dy / len;
            const normalY = dx / len;

            const leftX = curr.x + normalX * scaleSize;
            const leftY = curr.y + normalY * scaleSize;
            const rightX = curr.x - normalX * scaleSize;
            const rightY = curr.y - normalY * scaleSize;
            const tipX = curr.x + (dx / len) * scaleSize;
            const tipY = curr.y + (dy / len) * scaleSize;

            ctx.beginPath();
            ctx.moveTo(leftX, leftY);
            ctx.lineTo(tipX, tipY);
            ctx.lineTo(rightX, rightY);
            ctx.stroke();
        }
    }

    // --- Cabeça -----------------------------------------------------------

    #drawHead(centers, bodyWidth) {
        if (centers.length < 2) {
            this.#drawHeadAt(centers[0], { x: 1, y: 0 }, bodyWidth);
            return;
        }

        const head = centers[0];
        const neck = centers[1];
        const dx = head.x - neck.x;
        const dy = head.y - neck.y;
        const len = Math.hypot(dx, dy) || 1;

        this.#drawHeadAt(head, { x: dx / len, y: dy / len }, bodyWidth);
    }

    #drawHeadAt(center, direction, bodyWidth) {
        const { ctx, gridSize, palette } = this;
        const headRadius = bodyWidth * 0.62;
        const angle = Math.atan2(direction.y, direction.x);

        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.moveTo(headRadius * 1.15, 0);
        ctx.quadraticCurveTo(headRadius * 1.05, headRadius * 0.95, 0, headRadius * 0.92);
        ctx.quadraticCurveTo(-headRadius * 0.85, headRadius * 0.85, -headRadius * 0.95, 0);
        ctx.quadraticCurveTo(-headRadius * 0.85, -headRadius * 0.85, 0, -headRadius * 0.92);
        ctx.quadraticCurveTo(headRadius * 1.05, -headRadius * 0.95, headRadius * 1.15, 0);
        ctx.closePath();

        const gradient = ctx.createRadialGradient(
            headRadius * 0.2, -headRadius * 0.3, headRadius * 0.1,
            0, 0, headRadius * 1.3
        );
        gradient.addColorStop(0, palette.bodyLight);
        gradient.addColorStop(1, palette.bodyDark);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = palette.outline;
        ctx.lineWidth = Math.max(1.5, gridSize * 0.045);
        ctx.stroke();

        this.#drawTongue(headRadius);
        this.#drawEyes(headRadius);

        ctx.restore();
    }

    #drawTongue(headRadius) {
        const { ctx, palette } = this;
        ctx.beginPath();
        ctx.moveTo(headRadius * 1.1, 0);
        ctx.lineTo(headRadius * 1.55, 0);
        ctx.moveTo(headRadius * 1.55, 0);
        ctx.lineTo(headRadius * 1.75, -headRadius * 0.22);
        ctx.moveTo(headRadius * 1.55, 0);
        ctx.lineTo(headRadius * 1.75, headRadius * 0.22);
        ctx.strokeStyle = palette.tongue;
        ctx.lineWidth = Math.max(1.5, headRadius * 0.09);
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    #drawEyes(headRadius) {
        const { ctx, palette } = this;
        const eyeOffsetX = headRadius * 0.42;
        const eyeOffsetY = headRadius * 0.42;
        const eyeRadius = headRadius * 0.24;
        const pupilRadius = eyeRadius * 0.55;

        [1, -1].forEach((side) => {
            const ex = eyeOffsetX;
            const ey = eyeOffsetY * side;

            ctx.beginPath();
            ctx.arc(ex, ey, eyeRadius, 0, Math.PI * 2);
            ctx.fillStyle = palette.eyeShine;
            ctx.fill();
            ctx.strokeStyle = palette.outline;
            ctx.lineWidth = Math.max(1, headRadius * 0.05);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(ex + eyeRadius * 0.2, ey, pupilRadius, 0, Math.PI * 2);
            ctx.fillStyle = palette.pupil;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(ex + eyeRadius * 0.35, ey - eyeRadius * 0.35, pupilRadius * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = palette.eyeShine;
            ctx.fill();
        });
    }
}