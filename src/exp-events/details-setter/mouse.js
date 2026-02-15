export function mouse_details_setter() {
    const rect = this.targetElement.getBoundingClientRect();
    const e = this.event;
    let x = (e.clientX - rect.left) | 0;
    let y = (e.clientY - rect.top) | 0;

    if(this.cache.useNormalisedCoordinates){
        const w = this.targetElement.clientWidth;
        const h = this.targetElement.clientHeight;
        x = +((x / w) * 2 - 1).toFixed(8);
        y = +((y / h) * -2 + 1).toFixed(8);
    }

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