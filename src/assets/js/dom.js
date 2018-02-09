var vendor=(()=>{
    let eleStyle= document.createElement('div').style;
    let transformNames={
        webkit:'webkitTransform',
        Moz:'MozTransform',
        O:'OTransform',
        ms:'msTransform',
        standard:'transform'
    }
    for(let key in transformNames){
        if(eleStyle[transformNames[key]]!=='undefined'){
            return key
        }
        return false;
    }
})()
var dom={
    getAttr(ele,name,val){
        if(val){
            return ele.setAttribute(name,val)
        }else{
            return ele.getAttribute(name);
        }
    },
    compBrowser(attr){
        if(vendor===false){
            return false;
        }
        if(vendor==='standard'){
            return attr
        } 
        return vendor+attr.charAt(0).toUpperCase()+attr.substr(1);       

    }
}
export default dom;