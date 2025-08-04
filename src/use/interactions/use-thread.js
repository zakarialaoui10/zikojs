class ZikoUseThreed {
    #workerContent;
    constructor() {
        this.#workerContent = (
            function (msg) {
                try {
                    const func = new Function("return " + msg.data.fun)();
                    let result = func();
                    postMessage({ result });
                } catch (error) {
                    postMessage({ error: error.message });
                } finally {
                    if (msg.data.close) self.close();
                }
            }
        ).toString();
        this.blob = new Blob(["this.onmessage = " + this.#workerContent], { type: "text/javascript" });
        this.worker = new Worker(window.URL.createObjectURL(this.blob));
    }
    call(func, callback, close = true) {
        this.worker.postMessage({
            fun: func.toString(),
            close
        });
        this.worker.onmessage = function (e) {
            if (e.data.error) {
                console.error(e.data.error);
            } else {
                callback(e.data.result);
            }
        };
        return this;
    }
}

const useThread = (func, callback , close) => {
    const T = new ZikoUseThreed();
    if (func) {
        T.call(func, callback , close);
    }
    return T;
}

export { useThread };