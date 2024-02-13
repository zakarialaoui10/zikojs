import { 
    useStyle,
    useTheme,
    useTitle,
    useFavIcon
 } from "./UI";
import { 
    useEventEmitter,
    useChannel,
    useThread,
    useBluetooth
 } from "./Interactions";
import { 
    useBattery,
    useGeolocation
 } from "./Sensors";
const State={
    useStyle,
    useTheme,
    useBattery,
    useGeolocation,
    useEventEmitter,
    useChannel,
    useThread,
    useBluetooth,
    useTitle,
    useFavIcon,
    ExtractAll: function () {
        const keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key !== 'ExtractAll' && key !== 'RemoveAll') {
                globalThis[key] = this[key];
            }
        }
        return this;
    },
    RemoveAll: function () {
        const keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key !== 'RemoveAll') {
                delete globalThis[key];
            }
        }
        return this;
    }
}
export default State;
export{
    useStyle,
    useTheme,
    useTitle,
    useFavIcon,
    useBattery,
    useGeolocation,
    useEventEmitter,
    useChannel,
    useThread,
    useBluetooth
}