import { ZikoEvent, EVENT_CONTROLLER } from "./ZikoEvent.js";
import { norm, lerp, abs, sign } from "../../math/index.js";
class ZikoEventSwipe extends ZikoEvent {
  constructor(target, width_threshold = 0.3, height_threshold = 0.3) {
    super(target);
    const { removeListener, setWidthThreshold, setHeightThreshold } = init_swipe_event_handler(
      this.target?.element,
      width_threshold,
      height_threshold,
      this.target.width,
      this.target.height,
    );
    this.cache = {
      width_threshold,
      height_threshold,
      removeListener,
      setWidthThreshold,
      setHeightThreshold,
      legacyTouchAction : globalThis?.document?.body?.style?.touchAction,
      prefixe: "",
      preventDefault: {
        swipe: false,
      },
      paused: {
        swipe: false,
      },
      stream: {
        enabled: {
          swipe: false,
        },
        clear: {
          swipe: false,
        },
        history: {
          swipe: [],
        },
      },
      callbacks: {
        swipe: [],
      },
    };
    this.__controller = {
      swipe: swipe_controller.bind(this),
    };
  }
  onSwipe(...callbacks) {
    Object.assign(globalThis?.document?.body?.style,{touchAction:"none"})
    this.__onEvent("swipe", {}, ...callbacks);
    return this;
  }
  updateThresholds(width_threshold = this.cache.width_threshold, height_threshold = this.cache.height_threshold) {
    if (width_threshold !== undefined) {
      this.cache.setWidthThreshold(width_threshold);
    }
    if (height_threshold !== undefined) {
      this.cache.setHeightThreshold(height_threshold);
    }
    return this;
  }
  destroy() {
    this.cache.removeListener();
    Object.assign(globalThis?.document?.body?.style,{touchAction:this.cache.legacyTouchAction})
    return this;
  }
}
function init_swipe_event_handler(element, width_threshold = 0.50, height_threshold = 0.5, width, height) {
  let Interpolated_width_threshold = lerp(width_threshold, 0, width);
  let Interpolated_height_threshold = lerp(height_threshold, 0, height);
  let startX = 0, startY = 0, endX = 0, endY = 0;
  const pointerDownHandler = (event) => {
    startX = event.clientX;
    startY = event.clientY;
  };
  const pointerUpHandler = (event) => {
    endX = event.clientX;
    endY = event.clientY;
    handleSwipe();
  };
  element?.addEventListener('pointerdown', pointerDownHandler);
  element?.addEventListener('pointerup', pointerUpHandler);
  function handleSwipe() {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    if (Math.abs(deltaX) > Interpolated_width_threshold || Math.abs(deltaY) > Interpolated_height_threshold) {
      dispatchSwipeEvent(deltaX, deltaY);
    }
  }
  function dispatchSwipeEvent(deltaX, deltaY) {
    const event = globalThis?.CustomEvent ? new CustomEvent('swipe', {
      detail: {
        deltaX: abs(deltaX) < Interpolated_width_threshold ? 0 : sign(deltaX) * norm(abs(deltaX), 0, width),
        deltaY: abs(deltaY) < Interpolated_height_threshold ? 0 : sign(deltaY) * norm(abs(deltaY), 0, height),
        direction: {
          x : abs(deltaX) < Interpolated_width_threshold ? "none" : deltaX > 0 ? "right" : "left",
          y : abs(deltaY) < Interpolated_height_threshold ? "none" : deltaY > 0 ? 'down' : 'up',
        },
      },
    }) : null;
    element?.dispatchEvent(event);
  }
  function setWidthThreshold(new_width_threshold) {
    Interpolated_width_threshold = lerp(new_width_threshold, 0, width);
  }
  function setHeightThreshold(new_height_threshold) {
    Interpolated_height_threshold = lerp(new_height_threshold, 0, height);
  }
  return {
    removeListener() {
      element?.removeEventListener('pointerdown', pointerDownHandler);
      element?.removeEventListener('pointerup', pointerUpHandler);
      console.log('Swipe event listeners removed');
    },
    setWidthThreshold,
    setHeightThreshold,
  };
}
function swipe_controller(e) {
  EVENT_CONTROLLER.call(this, e, "swipe", null, null);
}
const useSwipeEvent = (target, width_threshold, height_threshold) => new ZikoEventSwipe(target, width_threshold, height_threshold);
export{
  useSwipeEvent,
  ZikoEventSwipe
}
/*
a=p("ALLL").size("300px","300px").style({background:"red",userSelect:"none"})
t=text("")
ev=useSwipeEvent(a, .1, .3)
ev.onSwipe(e=>{
// t.setValue(`
//  vertical direction : ${e.event.detail.direction.y}
//  horizontal direction : ${e.event.detail.direction.x}
//  deltaX : ${e.event.detail.deltaX}
//  deltaY : ${e.event.detail.deltaY}
// `)
e.target.st.translate(e.event.detail.deltaX * 200, e.event.detail.deltaY * 200,0, 500)
})
*/
/*
a=p("ALLL")
.size("300px","300px")
.style({background:"red",userSelect:"none"})
.onSwipe(
.3,
.3,
e=>{
  e.target.st.translate(e.event.detail.deltaX * 200, e.event.detail.deltaY * 200,0, 500)
})
*/
