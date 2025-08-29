class ViewEvent extends Event {
    constructor(type, detail) {
    super(type, { bubbles: true, cancelable: true });
    this.detail = detail;
    }
}

function register_view_event(element, { intersection = true, resize = true, threshold = 0 } = {}) {
    let intersectionObserver, resizeObserver;
    if (intersection) {
        intersectionObserver = new IntersectionObserver(entries => {
            for (let entry of entries) {
            const type = entry.isIntersecting ? "enterView" : "exitView";
            element.dispatchEvent(new ViewEvent(type, entry));
            }
        }, { threshold });
        intersectionObserver.observe(element);
    }
    if (resize) {
        resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
            const { width, height } = entry.contentRect;
            element.dispatchEvent(new ViewEvent("resizeView", { width, height, entry }));
            }
        });
        resizeObserver.observe(element);
    }
    return () => {
        if (intersectionObserver) {
            intersectionObserver.unobserve(element);
            intersectionObserver.disconnect();
        }
        if (resizeObserver) {
            resizeObserver.unobserve(element);
            resizeObserver.disconnect();
        }
    };
}

export{
    ViewEvent,
    register_view_event
}