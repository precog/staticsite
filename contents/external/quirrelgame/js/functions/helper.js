/*HELPER*/
(function(){
var expose = window.PrecogWeb || (window.PrecogWeb = {});
var helper = expose.helper = {

"walk":  function (value, handler) {
        if(value == null) {
//console.log("null", value);
            return handler(value);
        } else if(value instanceof Array) {
//console.log("array", value);
            for(var i = 0; i < value.length; i++) {
                if(window.PrecogWeb.helper.walk(value[i], handler))
                    return true;
            }
            return false;
        } else if("object" === typeof value) {
//console.log("object", value);
            for(var key in value){
                if(!value.hasOwnPrototype(key)) continue;
                if(window.PrecogWeb.helper.walk(value[key], handler))
                    return true;
            }
            return false;
        } else {
//console.log("primitive", value);
            return handler(value);
        }
    }
}
})();  