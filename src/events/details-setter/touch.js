export function touch_details_setter() {
    const e = this.event;
    const touch = e.touches?.[0] || e.changedTouches?.[0];

    if (!touch) return; // should never happen but safe

    const rect = this.targetElement.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    switch (this.currentEvent) {
        case "touchstart":
            this.dx = x;
            this.dy = y;
            this.isDown = true;
            break;

        case "touchmove":
            this.mx = x;
            this.my = y;
            this.isMoving = true;
            break;

        case "touchend":
            this.ux = x;
            this.uy = y;
            this.isDown = false;
            break;
    }
}
