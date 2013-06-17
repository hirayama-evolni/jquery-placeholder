# jquery.placeholder.js

placeholder実現のためのお助けjQueryモジュールです。

placeholder非対応ブラウザでもplaceholderをエミュレートします。

## 注意

このモジュールは作者の業務上の必要により開発されたものです。お使いになっ
たり参考にされたりするのは自由ですが、業務関係者以外の質問などへの対応
は行いませんし、特に業務上の必要がない限り、機能拡張などは行われないか
もしれません。

## 必要なもの

jQuery … 新しめのAPIは使っていないので古いバージョンでも動くはずです。

## jQuery.placeholder()

非対応ブラウザでもhtml5のplaceholder属性を使用してplaceholderを実現す
るショートカットメソッドです。

デフォルトでは全ての"input[type='text']"及びtextarea要素に対して操作を行います。

ブラウザがplaceholder属性に対応している場合は何も行いません。

### 使い方

```html
<input type="text" name="foo" placeholder="barbar">
```

のように記述しておいて、

```javascript
$(function(){
  $.placeholder();
});
```

のように実行すると、

* placeholder対応ブラウザの場合は何もしない
* 非対応ブラウザの場合は必要な設定を行なってplaceholder機能を実現

します。

### オプション

$.placeholderはobjectを引数に渡すことでオプション設定ができます。

#### selector

対象とする要素を選択するためのセレクタ文字列。

デフォルトは`"input[type='text'], textarea"`。

#### debug

`true`にするとデバッグ用のログが出力されます。

デフォルトは`false`です。

## .placeholder()

こちらは要素ごとにplaceholderを設定するメソッドです。

$.placeholderよりも細かい制御を行いたい方はこちらを利用してください。

### 使い方

#### 主な動作

指定された要素に対して、

1. `input[type="text"]`或いは`textarea`でなければ終了。
2. placeholderとして使用する文字列を決定。決定できない場合はそこで終了。
3. placeholderに対応しているブラウザの場合、placeholder属性に値を設定
   して終了。
4. 値が空の場合placeholderを設定する。
5. 各イベントハンドラを設定する。
   1. focusイベントが来た場合、placeholderと同じ文字列が入っていた場合
      は値をクリアする
   2. blurイベントが来た場合、値が空ならpleceholder文字列を入れる
   3. 親formがsubmitされた場合、placeholderと同じ文字列が入っていた場合
      は値をクリアする

という処理を行います。

#### placeholderに設定する値の決定

placeholderとして設定する値の決定方法は３種類用意してあります。

優先順位は、関数＞属性指定＞Map です。

##### 関数

`value_func`オプションに関数を設定すると、その関数を実行した結果が使用
されます。

##### 属性

`value_attr`オプションに属性の名前を設定すると、その属性の値が
placeholderの値として使用されます。例えば`title`に設定すると`title`属
性の値がplaceholderとして使用されます。

##### マップ

`map`オプションにobject、`map_key_attr`オプションにキーとして使用する
属性の名前を設定すると、そのmapを検索した結果をplaceholderの値として使
用します。

### オプション

.placeholder()はobjectを引数に渡すことでオプション設定ができます。

#### map

placeholder文字列をマッピングしたobject。

デフォルトは`{}`。

#### map_key_attr

map objectを検索するキーとなる属性の名前。

デフォルトは`"id"`。

#### value_attr

placeholder文字列を取り出すのに使用する属性の名前。

デフォルトは`null`。

#### value_func

placeholder文字列を返す関数。thisは当該要素のDOM elementになります。

例えば`function(){return $(this).attr("title");}`は
`value_attr: "title"`と等価です。

デフォルトは`null`。

#### focus_color

focusイベント発生時の色設定。false値が設定された場合は`color`の設定を
削除してデフォルト設定にします。

デフォルトは`null`。

#### blur_color

blueイベント発生時の色設定。false値が設定された場合は何も設定しません。

デフォルトは`"#999999"`。

#### force

`true`の場合、placeholderに対応しているブラウザでも非対応ブラウザと同
じ対応をします。

デフォルトは`false`。

#### debug

`true`にするとデバッグ用のログが出力されます。

デフォルトは`false`。
