const floodFill=(parent, imageData, newColor, x, y)=>{
    const { width, height, data } = imageData;
    const stack = [];
    const baseColor = parent.getColorAtPixel(imageData, x, y);
    let operator = { x, y };

    if (parent.colorMatch(baseColor, newColor)) {
        return;
    }

    // Add the clicked location to stack
    stack.push({ x: operator.x, y: operator.y });

    while (stack.length) {
        operator = stack.pop();
        let contiguousDown = true; // Vertical is assumed to be true
        let contiguousUp = true; // Vertical is assumed to be true
        let contiguousLeft = false;
        let contiguousRight = false;

        // Move to top most contiguousDown pixel
        while (contiguousUp && operator.y >= 0) {
            operator.y--;
            contiguousUp = parent.colorMatch(parent.getColorAtPixel(imageData, operator.x, operator.y), baseColor);
        }

        // Move downward
        while (contiguousDown && operator.y < height) {
            parent.setColorAtPixel(imageData, newColor, operator.x, operator.y);

            // Check left
            if (operator.x - 1 >= 0 && parent.colorMatch(parent.getColorAtPixel(imageData, operator.x - 1, operator.y), baseColor)) {
                if (!contiguousLeft) {
                    contiguousLeft = true;
                    stack.push({ x: operator.x - 1, y: operator.y });
                }
            } else {
                contiguousLeft = false;
            }

            // Check right
            if (operator.x + 1 < width && parent.colorMatch(parent.getColorAtPixel(imageData, operator.x + 1, operator.y), baseColor)) {
                if (!contiguousRight) {
                    stack.push({ x: operator.x + 1, y: operator.y });
                    contiguousRight = true;
                }
            } else {
                contiguousRight = false;
            }

            operator.y++;
            contiguousDown = parent.colorMatch(parent.getColorAtPixel(imageData, operator.x, operator.y), baseColor);
        }
    }
    return imageData;
}
export default floodFill;