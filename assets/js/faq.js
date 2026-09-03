/* FAQ 아코디언 — 항목별 독립 토글, 첫 항목은 기본 열림 */
(function () {
  'use strict';
  var items = Array.prototype.slice.call(document.querySelectorAll('.faq__item'));
  if (!items.length) return;

  items.forEach(function (item, i) {
    var btn = item.querySelector('.faq__q');
    var panel = item.querySelector('.faq__a');
    if (!btn || !panel) return;

    var open = i === 0;                       // 첫 항목만 열어 둔다
    function set(v) {
      open = v;
      item.classList.toggle('is-open', v);
      btn.setAttribute('aria-expanded', v ? 'true' : 'false');
      panel.setAttribute('aria-hidden', v ? 'false' : 'true');
    }
    set(open);

    btn.addEventListener('click', function () { set(!open); });
  });
})();
