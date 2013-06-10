(($) ->
  natively_supported =
  document.createElement('input').placeholder?

  $.fn.placeholder = (user_options) ->
    options = $.extend
      force: false
      map: {}
      map_key_attr: "id"
      value_attr: null,
      value_func: null,
      focus_color: null,
      blur_color: "#999999", # falseなら色設定しない
      debug: false
    , user_options

    log = (message) ->
      console.log message if \
      options.debug && window && window.console && window.console.log

    set_place_holder = (el, is_clear) ->
      if is_clear
				# placeholderと同じ文字列が入っていたら消す
        log "clearing."
        el.val("") if el.val() == el.data "placeholder_str"
        el.css "color", \
          if options.focus_color then options.focus_color else ""
      else
        # 空っぽならplaceholderを入れる
        log "setting."
        if el.val().length == 0
          el.val(el.data("placeholder_str"))
          el.css("color", options.blur_color) if options.blur_color

      return

    log "natively supported? "+natively_supported
    log "options:"
    log options

    log "Number of elements: "+this.length

    cnt = 0
    this.each (index, element) ->
      log "["+(cnt++)+"]"

      el = $(element)

      # 自分がinput[type=text]じゃなかったら終わり
      tagname = el.get(0).tagName
      type = el.attr("type")
      log "tagname: "+tagname
      log "type: "+type
      unless (tagname.toLowerCase() == "input" && type.toLowerCase() == "text")
        log "Element not applicable. Ignore it."
        return

      # 設定する文字列
      ## 関数が指定されていたらそれで
      if options.value_func
        str = options.value_func.apply element
        log "string determined by func: \""+str+"\""
      ## 値を取得する属性が指定されていたらそれで
      else if options.value_attr
        str = el.attr(options.value_attr)
        log "string determined by attr: \""+str+"\""
      ## それ以外はmapを引く
      else
        str = options.map[el.attr(options.map_key_attr)]
        log "string determined by map: \""+str+"\""

      str ?= ""

      if str == ""
        # 文字列が空なら何もしない
        log "result string is empty."
        return

      # inputがplaceholderをサポートしてたらそれを使う
      if !options.force && natively_supported
        el.attr "placeholder", str
        log "Natively supported. Use placeholder attr."
      else # サポートしてなかったら
        log "Not natively supported."
        log "setting event handlers."
        # あとで参照しやすいようにdataに入れておく
        el.data("placeholder_str", str)

        # 初期状態で空ならplaceholderを入れておく
        set_place_holder el, false

        # focusが来たら消す
        el.focus (e) ->
					# placeholderと同じ文字列が入っていたら消す
          set_place_holder el, true
          return
        # focusが外れたら入れる
        el.blur (e) ->
          # 空っぽならplaceholderを入れる
          set_place_holder el, false
          return
        # submit時にplaceholderのままならクリアする
        el.closest("form").bind "submit", {element: el}, (e) ->
          tmp = e.data.element
          set_place_holder tmp, true
          return

    return this

  $.extend
    placeholder: (user_options) ->
      options = $.extend
        selector: "input[type='text']"
        debug: false
      , user_options
      
      log = (message) ->
        console.log message if \
        options.debug && window && window.console && window.console.log

      if !options.force && natively_supported
        log "Natively supported, so now exit."
        return

      $(options.selector).placeholder
        value_attr: "placeholder"
        force: options.force
        debug: options.debug
      return

  return
)(jQuery)
