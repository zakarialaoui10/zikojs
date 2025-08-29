class SwipeEvent extends Event {
  constructor(type, direction, distX, distY, originalEvent) {
    super(type, { bubbles: true, cancelable: true });
    this.direction = direction; // "left" | "right" | "up" | "down"
    this.distX = distX;
    this.distY = distY;
    this.originalEvent = originalEvent;
  }
}

function listen_swipe(element, threshold = 50, restraint = 100, allowedTime = 500) {
  let startX, startY, startTime, isPointerDown = false;
  function onPointerDown(e) {
    startX = e.clientX;
    startY = e.clientY;
    startTime = Date.now();
    isPointerDown = true;
  }
  function onPointerUp(e) {
    if (!isPointerDown) return;
    isPointerDown = false;

    const distX = e.clientX - startX;
    const distY = e.clientY - startY;
    const elapsedTime = Date.now() - startTime;
    let direction = null;
    let eventName = null;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        direction = distX < 0 ? "left" : "right";
        eventName = "swipe" + direction;
      } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
        direction = distY < 0 ? "up" : "down";
        eventName = "swipe" + direction;
      }
    }

    if (eventName && direction) {
      element.dispatchEvent(
        new SwipeEvent(eventName, direction, distX, distY, e),
      );
    }
  }

  element.addEventListener("pointerdown", onPointerDown, false);
  element.addEventListener("pointerup", onPointerUp, false);

  // cleanup function
  return () => {
    element.removeEventListener("pointerdown", onPointerDown, false);
    element.removeEventListener("pointerup", onPointerUp, false);
  };
}

export{
    SwipeEvent,
    listen_swipe
}