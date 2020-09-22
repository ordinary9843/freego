$(document).ready(function() {
   let target = $('img, a, button, input, select, checkbox, radio, textarea, label');
   let tabKey = 1;

   // 產生tabKey
   $.each(target, function (i, v) {
      if (typeof $(v).attr('tabKey') == 'undefined') {
         $(v).attr('tabKey', tabKey);

         tabKey++;
      }
   });

   // 選擇字級
   $('body').on('click', '[data-trigger="changeFontSize"]', function () {
      let ele = $(this);

      $.each($('div, span, section, header, ul, li, a, label, button'), function(i, v) {
         if (typeof $(v).attr('data-origin-font-size') == 'undefined') {
            $(v).attr('data-origin-font-size', $(v).css('fontSize'));
         }

         let fontSize = parseInt($(v).attr('data-origin-font-size'));
         let percent = parseInt(ele.attr('data-font-size')) / 100;

         $(v).css({
            fontSize: fontSize * percent
         });
      });

   // alt聚焦
   }).on('keydown', function (e) {
      if (e.altKey) {
         let altKeyCode = [
            18, // 鍵盤按鍵B對應麵包屑
            77, // 鍵盤按鍵M對應選單
            78 // 鍵盤按鍵M對應導覽列
         ];

         if ($.inArray(e.keyCode, altKeyCode)) {
            $('[tabKey="' + String.fromCharCode(e.keyCode) + '"]').trigger('focus');
         }
      }

   // 共用聚焦
   }).on('focus', '[tabKey]', function () {
      let ele = $(this);

      // 多層選單開合
      if (ele.closest('.nav').length > 0) {
         if (ele.siblings('ul').find('li').length > 0) {
            ele.closest('li').addClass('hover');
         }
      }

      ele.addClass('focus-element');

   // 共用模糊
   }).on('blur', '[tabKey]', function () {
      let ele = $(this);

      // 多層選單開合
      if (ele.closest('.nav').length > 0) {
         if (ele.closest('li').index() > 0 && ele.siblings('ul').find('[tabKey]').length < 1) {
            ele.closest('.nav').find('li').removeClass('hover');
         }
      }

      ele.removeClass('focus-element');
   });
});