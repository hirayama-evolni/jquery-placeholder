(function() {
  (function($) {
    var natively_supported;
    natively_supported = ('placeholder' in document.createElement('input')) && ('placeholder' in document.createElement('textarea'));
    $.fn.placeholder = function(user_options) {
      var cnt, log, options, set_place_holder;
      options = $.extend({
        force: false,
        map: {},
        map_key_attr: "id",
        value_attr: null,
        value_func: null,
        focus_color: null,
        blur_color: "#999999",
        debug: false
      }, user_options);
      log = function(message) {
        if (options.debug && window && window.console && window.console.log) {
          return console.log(message);
        }
      };
      set_place_holder = function(el, is_clear) {
        if (is_clear) {
          log("clearing.");
          if (el.val() === el.data("placeholder_str")) {
            el.val("");
          }
          el.css("color", options.focus_color ? options.focus_color : "");
        } else {
          if (el.val().length === 0) {
            log("setting.");
            el.val(el.data("placeholder_str"));
            if (options.blur_color) {
              el.css("color", options.blur_color);
            }
          }
        }
      };
      log("natively supported? " + natively_supported);
      log("options:");
      log(options);
      log("Number of elements: " + this.length);
      cnt = 0;
      this.each(function(index, element) {
        var el, str, tagname, type;
        log("[" + (cnt++) + "]");
        el = $(element);
        tagname = el.get(0).tagName;
        type = el.attr("type");
        log("tagname: " + tagname);
        log("type: " + type);
        if (!((tagname.toLowerCase() === "input" && type.toLowerCase() === "text") || (tagname.toLowerCase() === "textarea"))) {
          log("Element not applicable. Ignore it.");
          return;
        }
        if (options.value_func) {
          str = options.value_func.apply(element);
          log("string determined by func: \"" + str + "\"");
        } else if (options.value_attr) {
          str = el.attr(options.value_attr);
          log("string determined by attr: \"" + str + "\"");
        } else {
          str = options.map[el.attr(options.map_key_attr)];
          log("string determined by map: \"" + str + "\"");
        }
        if (str == null) {
          str = "";
        }
        if (str === "") {
          log("result string is empty.");
          return;
        }
        if (!options.force && natively_supported) {
          el.attr("placeholder", str);
          return log("Natively supported. Use placeholder attr.");
        } else {
          log("Not natively supported.");
          log("setting event handlers.");
          el.data("placeholder_str", str);
          set_place_holder(el, false);
          el.focus(function(e) {
            set_place_holder(el, true);
          });
          el.blur(function(e) {
            set_place_holder(el, false);
          });
          return el.closest("form").bind("submit", {
            element: el
          }, function(e) {
            var tmp;
            tmp = e.data.element;
            set_place_holder(tmp, true);
          });
        }
      });
      return this;
    };
    $.extend({
      placeholder: function(user_options) {
        var log, options;
        options = $.extend({
          selector: "input[type='text'], textarea",
          debug: false
        }, user_options);
        log = function(message) {
          if (options.debug && window && window.console && window.console.log) {
            return console.log(message);
          }
        };
        if (!options.force && natively_supported) {
          log("Natively supported, so now exit.");
          return;
        }
        $(options.selector).placeholder({
          value_attr: "placeholder",
          force: options.force,
          debug: options.debug
        });
      }
    });
  })(jQuery);

}).call(this);
