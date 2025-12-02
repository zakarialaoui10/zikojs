const useSuccesifKeys=(self,keys=[],callback=()=>{})=>{
    self.cache.stream.enabled.down=true;
    const length=keys.length;
    const LastKeysDown=self.cache.stream.history.down.slice(-length).map(n=>n.key);
    
        if(keys.join("")===LastKeysDown.join("")){
            self.event.preventDefault();
            callback.call(self,self);
        }
    
}
export {
    useSuccesifKeys
}