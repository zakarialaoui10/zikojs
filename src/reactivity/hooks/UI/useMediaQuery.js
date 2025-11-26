/*
 [
            {
                query: '(min-width: 600px)',
                callback: () => console.log(1)
            },
            {
                query: '(max-width: 300px)',
                callback: () => console.log(2)
            }
        ]
*/
class UseMediaQuery {
    constructor(mediaQueryRules=[],fallback=()=>{}) {
        this.mediaQueryRules = mediaQueryRules;
        this.fallback = fallback;
        this.lastCalledCallback = null;
        this.init();
    }

    init() {
        this.mediaQueryRules.forEach(({ query, callback }) => {
            const mediaQueryList = globalThis.matchMedia(query);
            const checkMatches = () => {
                const anyMatch = this.mediaQueryRules.some(({ query }) => globalThis.matchMedia(query).matches);
                if (mediaQueryList.matches) {
                    callback();
                    this.lastCalledCallback = callback;
                } else if (!anyMatch && this.lastCalledCallback !== this.fallback) {
                    this.fallback();
                    this.lastCalledCallback = this.fallback;
                }
            };
            checkMatches()
            mediaQueryList.addListener(checkMatches);
        });
    }
}

const useMediaQuery = (mediaQueryRules,fallback) => new UseMediaQuery(mediaQueryRules,fallback);
export {
    useMediaQuery
};
