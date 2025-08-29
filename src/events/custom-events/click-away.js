class ClickAwayEvent extends Event {
  constructor(originalEvent, targetElement) {
    super("clickaway", { bubbles: true, cancelable: true });
    this.originalEvent = originalEvent;
    this.targetElement = targetElement;
  }
}

function listen_click_away(element) {
  function handler(e) {
    if (!element.contains(e.target)) {
      const clickAwayEvent = new ClickAwayEvent(e, element);
      element.dispatchEvent(clickAwayEvent);
    }
  }

  globalThis?.document?.addEventListener("click", handler);

  // return cleanup function
  return () => {
    globalThis?.document?.removeEventListener("click", handler);
  };
}

export{
    ClickAwayEvent,
    listen_click_away
}

// // Example usage
// const box = document.querySelector("#my-box");

// const stop = listenClickAway(box);

// box.addEventListener("clickaway", (e) => {
//   console.log("Clicked outside box!", e);
// });

// // later, you can stop listening:
// // stop();
