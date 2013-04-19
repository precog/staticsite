$.iframeSubmit = function(method) {
  var uid = "ifr_"+Math.floor(Math.random() * 214783647),
    settings = {
      action : "",
      method : "post",
      window : window,
      data   : {},
      complete : function() {},
      remove_after : 10000
    },
    methods = {
      init : function(options) {
        settings = $.extend(settings, options);
        var $iframe = $('<iframe name="'+uid+'" style="display:none"></iframe>').appendTo("body"),
            $form   = $('<form action="'+settings.action+'" method="'+settings.method.toUpperCase()+'" target="'+uid+'" style="display:none"></form>').appendTo("body");
        for(var key in settings.data) {
          if(!settings.data.hasOwnProperty(key)) continue;
          $('<input type="hidden" name="'+key+'" value="'+settings.data[key]+'">').appendTo($form);
        }
        $iframe.on("load", function() {
          $form.remove();
          setTimeout(function() {
            $iframe.remove();
          }, settings.remove_after);
          settings.complete();
        });
        $form.submit();
        return this;
      }
    };

  if ( methods[method] ) {
    return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
  } else if ( typeof method === 'object' || ! method ) {
    return methods.init.apply( this, arguments );
  } else {
    $.error( 'Method ' +  method + ' does not exist on jQuery.iframeSubmit' );
  }
};