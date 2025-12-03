export function mouse_details_setter() {
    const rect = this.targetElement.getBoundingClientRect();
    const e = this.event;
    const x = (e.clientX - rect.left) | 0;
    const y = (e.clientY - rect.top) | 0;

    switch (this.currentEvent) {

        case "mousedown":
            this.dx = x;
            this.dy = y;
            this.isDown = true;
            break;

        case "mousemove":
            this.mx = x;
            this.my = y;
            this.isMoving = true;
            break;

        case "mouserup":
            this.ux = x;
            this.uy = y;
            this.isDown = false;
            this.isMoving = false;
            break;
    }
}