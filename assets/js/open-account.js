/* =============================================================================
   비즈니스 계정 개설 — 4단계 폼
   운영 엔드포인트: POST /api/open-account  → { success: boolean, message?: string }
   로컬 정적 서버(localhost)에는 API가 없으므로 미리보기 모드로 완료 화면을 보여준다.
   ============================================================================= */
(function () {
  'use strict';

  var form = document.getElementById('oa-form');
  if (!form) return;

  var panels  = Array.prototype.slice.call(form.querySelectorAll('.oa-panel'));
  var marks   = Array.prototype.slice.call(document.querySelectorAll('.oa-stepper__i'));
  var doneEl  = document.getElementById('oa-done');
  var failEl  = document.getElementById('oa-fail');
  var step    = 0;

  var ENDPOINT = form.dataset.endpoint || '/api/open-account';
  var isPreview = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:';

  /* ---------- 단계 이동 ---------- */
  function show(i, scroll) {
    step = i;
    panels.forEach(function (p, n) { p.classList.toggle('is-on', n === i); });
    marks.forEach(function (m, n) {
      m.classList.toggle('is-on', n === i);
      m.classList.toggle('is-done', n < i);
    });
    if (scroll !== false) {                       // 최초 렌더에서는 스크롤하지 않는다
      var top = form.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  }

  /* ---------- 검증 ---------- */
  function mark(field, bad) {
    var wrap = field.closest('.oa-f');
    if (wrap) wrap.classList.toggle('is-bad', bad);
    return !bad;
  }

  function validate(i) {
    var panel = panels[i];
    var fields = Array.prototype.slice.call(panel.querySelectorAll('[required]'));
    var ok = true;

    fields.forEach(function (f) {
      var bad;
      if (f.type === 'checkbox') {
        bad = !f.checked;
        var lab = f.closest('.oa-agree');
        if (lab) lab.style.color = bad ? '#e0607a' : '';
      } else if (f.type === 'email') {
        bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim());
      } else {
        bad = f.value.trim() === '';
      }
      if (!mark(f, bad)) ok = false;
    });

    if (!ok) {
      var first = panel.querySelector('.oa-f.is-bad input, .oa-f.is-bad select, .oa-agree [required]:not(:checked)');
      if (first) first.focus({ preventScroll: true });
    }
    return ok;
  }

  /* 입력을 고치면 에러 표시 해제 */
  form.addEventListener('input', function (e) {
    var wrap = e.target.closest && e.target.closest('.oa-f');
    if (wrap) wrap.classList.remove('is-bad');
  });
  form.addEventListener('change', function (e) {
    var wrap = e.target.closest && e.target.closest('.oa-f');
    if (wrap) wrap.classList.remove('is-bad');
    var lab = e.target.closest && e.target.closest('.oa-agree');
    if (lab) lab.style.color = '';
  });

  /* ---------- 다음 / 이전 ---------- */
  form.addEventListener('click', function (e) {
    var next = e.target.closest('[data-go="next"]');
    var back = e.target.closest('[data-go="back"]');
    if (next) { e.preventDefault(); if (validate(step)) show(step + 1); }
    if (back) { e.preventDefault(); show(step - 1); }
  });

  /* ---------- 노선 칩 ---------- */
  Array.prototype.slice.call(form.querySelectorAll('.oa-chk input')).forEach(function (cb) {
    var sync = function () { cb.closest('.oa-chk').classList.toggle('is-on', cb.checked); };
    cb.addEventListener('change', sync);
    sync();
  });

  /* ---------- 제출 ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate(3)) return;

    var btn = form.querySelector('[type="submit"]');
    var label = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.textContent = '접수 중...'; }
    if (failEl) failEl.classList.remove('is-on');

    var fd = new FormData(form);
    var payload = {};
    fd.forEach(function (v, k) {
      if (payload[k] === undefined) payload[k] = v;
      else if (Array.isArray(payload[k])) payload[k].push(v);
      else payload[k] = [payload[k], v];
    });

    var finish = function () {
      form.style.display = 'none';
      var stepper = document.querySelector('.oa-stepper');
      if (stepper) stepper.style.display = 'none';
      if (doneEl) {
        doneEl.classList.add('is-on');
        doneEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    var fail = function () {
      if (btn) { btn.disabled = false; btn.innerHTML = label; }
      if (failEl) failEl.classList.add('is-on');
    };

    if (isPreview) { setTimeout(finish, 400); return; }

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json(); })
      .then(function (d) { if (d && d.success) finish(); else fail(); })
      .catch(fail);
  });

  show(0, false);   // 초기화 — 스크롤 없이 1단계만 표시
})();
