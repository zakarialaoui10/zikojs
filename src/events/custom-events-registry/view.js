class ViewEvent extends CustomEvent {
    constructor(type, detail, { bubbles = true, cancelable = true } = {}) {
        super(type, { detail, bubbles, cancelable });
    }
}

function register_view_event(element, { intersection = true, resize = true, threshold = 0 } = {}) {
    let intersectionObserver, resizeObserver;

    if (intersection) {
        intersectionObserver = new IntersectionObserver(entries => {
            for (let entry of entries) {
                const type = entry.isIntersecting ? "enterview" : "exitview";
                element.dispatchEvent(new ViewEvent(type, entry));
            }
        }, { threshold });
        intersectionObserver.observe(element);
    }

    if (resize) {
        resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                element.dispatchEvent(new ViewEvent("resizeview", { width, height, entry }));
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

export {
    ViewEvent,
    register_view_event
};
