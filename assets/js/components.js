/* ============================================
   WIZMOBILITY — Component Loader & Interactions
   ============================================ */

/* ── 유입 출처 추적 (first-touch attribution) ──
   첫 진입 시 UTM·랜딩 URL·referrer를 localStorage에 저장(90일).
   이후 사이트 내 이동으로 URL의 UTM이 사라져도, 문의 폼이 원래 출처를 함께 전송한다.
   모든 페이지가 components.js를 로드하므로 캡처는 이 한 곳에서만 수행. */
(function captureAttribution() {
  try {
    var KEY = 'wm_attribution', MAX_AGE = 90 * 24 * 60 * 60 * 1000;
    var params = new URLSearchParams(location.search);
    var cur = {
      utm_source:   params.get('utm_source')   || '',
      utm_medium:   params.get('utm_medium')   || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term:     params.get('utm_term')     || '',
      utm_content:  params.get('utm_content')  || '',
    };
    var hasUtm = !!(cur.utm_source || cur.utm_medium || cur.utm_campaign);
    var stored = null;
    try { stored = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
    var fresh = stored && stored.ts && (Date.now() - stored.ts < MAX_AGE);
    var storedHasUtm = stored && !!(stored.utm_source || stored.utm_medium || stored.utm_campaign);
    // first-touch 보존. 단 새 UTM이 들어왔는데 기존에 UTM이 없거나(직접 유입 후 캠페인 재진입) 만료면 갱신.
    if (!stored || !fresh || (hasUtm && !storedHasUtm)) {
      localStorage.setItem(KEY, JSON.stringify({
        utm_source: cur.utm_source, utm_medium: cur.utm_medium, utm_campaign: cur.utm_campaign,
        utm_term: cur.utm_term, utm_content: cur.utm_content,
        landing_url: location.href,
        landing_referrer: document.referrer || '',
        ts: Date.now(),
      }));
    }
  } catch (e) { /* 스토리지 차단 환경은 조용히 무시 */ }
})();

/* 저장된 first-touch 출처 + 현재 GA client_id를 폼 전송용 객체로 반환 */
window.WM_getAttribution = function () {
  var rec = {};
  try { rec = JSON.parse(localStorage.getItem('wm_attribution') || '{}') || {}; } catch (e) {}
  var gaMatch = document.cookie.match(/_ga=GA\d\.\d\.(\d+\.\d+)/);
  return {
    utm_source:       rec.utm_source      || '',
    utm_medium:       rec.utm_medium      || '',
    utm_campaign:     rec.utm_campaign    || '',
    utm_term:         rec.utm_term        || '',
    utm_content:      rec.utm_content     || '',
    landing_url:      rec.landing_url     || '',
    landing_referrer: rec.landing_referrer || '',
    ga_client_id:     gaMatch ? gaMatch[1] : '',
  };
};

document.addEventListener('DOMContentLoaded', () => {
  loadComponents();
  initSectionReveal();
  initFaqAccordion();
  initModals();
  initContactForm();
});

/* ── GNB 인터랙션 바인딩 ──
   GNB/푸터 마크업은 서버가 include로 합쳐 내려보낸다(각 페이지의
   `<?php include $_SERVER['DOCUMENT_ROOT'] . '/components/gnb.html'; ?>`).
   따라서 여기서는 fetch 없이 이미 존재하는 DOM에 동작만 붙인다. */
function loadComponents() {
  // 한글판은 /ko/ 경로(또는 <html lang="ko">)에서 ko partial이 include된다.
  const isKo = location.pathname.startsWith('/ko/') || document.documentElement.lang === 'ko';

  if (isKo) {
    // 한글 GNB는 onclick 인라인(toggleMobileMenu/toggleLang) — ko.js 전역 함수에 의존.
    if (window.initKoGnb) window.initKoGnb();
    return;
  }

  if (!document.querySelector('.gnb')) return;
  initMobileMenu();
  initDropdowns();
  initScrollHeader();
  initLangSwitcher();
}

/* ── Scroll header: transparent → solid + mobile hide-on-scroll ── */
function initScrollHeader() {
  const header = document.querySelector('.gnb');
  if (!header) return;

  const hasTransparentHero = document.querySelector('.page-hero');
  const SOLID_AT = 100;       // transparent → solid 임계값
  const HIDE_AT = 80;         // hide-on-scroll 활성 임계값
  const DELTA_MIN = 5;        // 작은 떨림 무시(히스테리시스)

  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;

    // transparent → solid (hero 없는 페이지는 처음부터 solid 고정)
    if (!hasTransparentHero) {
      header.classList.add('gnb--solid');
    } else if (y > SOLID_AT) {
      header.classList.add('gnb--solid');
    } else {
      header.classList.remove('gnb--solid');
    }

    // hide-on-scroll (CSS에서 모바일에만 transform 적용 — 데스크톱은 클래스 붙어도 무동작)
    const delta = y - lastY;
    const panelOpen = document.querySelector('.gnb__mobile-panel.is-open');
    if (y <= HIDE_AT || panelOpen) {
      header.classList.remove('gnb--hidden');
    } else if (Math.abs(delta) >= DELTA_MIN) {
      if (delta > 0) header.classList.add('gnb--hidden');
      else header.classList.remove('gnb--hidden');
    }
    document.body.classList.toggle('is-gnb-hidden', header.classList.contains('gnb--hidden'));
    lastY = y;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
}

/* ── Mobile hamburger ── */
function initMobileMenu() {
  const toggle = document.querySelector('.gnb__hamburger');
  const panel = document.querySelector('.gnb__mobile-panel');
  const close = document.querySelector('.gnb__mobile-close');

  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    panel.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });

  if (close) {
    close.addEventListener('click', () => {
      panel.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }

  // accordion
  panel.querySelectorAll('.gnb__mobile-parent').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.nextElementSibling;
      if (sub) sub.classList.toggle('is-open');
      btn.classList.toggle('is-open');
    });
  });
}

/* ── Desktop dropdown ──
   Hover is bound on the parent .gnb__item (li) so the menu stays open while
   the cursor traverses the trigger-to-dropdown gap. The dropdown is an
   absolute-positioned child of li, so its hover doesn't fire li mouseleave.
   CSS .gnb__dropdown::before adds an invisible bridge over the visual gap. */
function initDropdowns() {
  document.querySelectorAll('.gnb__item').forEach(item => {
    const trigger = item.querySelector('.gnb__dropdown-trigger');
    const menu = item.querySelector('.gnb__dropdown');
    if (!trigger || !menu) return;

    const open = () => {
      // 언어 드롭다운이 열려있으면 먼저 닫기
      document.querySelectorAll('.gnb__lang-menu.is-open').forEach(m => {
        m.classList.remove('is-open');
        m.previousElementSibling?.setAttribute('aria-expanded', 'false');
      });
      menu.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      menu.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    };

    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', close);
    trigger.addEventListener('focus', open);
    item.addEventListener('focusout', (e) => {
      if (!item.contains(e.relatedTarget)) close();
    });
  });
}

/* ── Language switcher ── */
function initLangSwitcher() {
  document.querySelectorAll('.gnb__lang-wrapper').forEach(wrapper => {
    const btn = wrapper.querySelector('.gnb__lang');
    const menu = wrapper.querySelector('.gnb__lang-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // nav 드롭다운이 열려있으면 먼저 닫기
      document.querySelectorAll('.gnb__dropdown.is-open').forEach(m => {
        m.classList.remove('is-open');
        m.previousElementSibling?.setAttribute('aria-expanded', 'false');
      });
      const isOpen = menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.gnb__lang-menu.is-open').forEach(menu => {
      menu.classList.remove('is-open');
      menu.previousElementSibling?.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.gnb__lang-menu.is-open').forEach(menu => {
        menu.classList.remove('is-open');
        menu.previousElementSibling?.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* ── FAQ Accordion ── */
function initFaqAccordion() {
  const buttons = document.querySelectorAll('.faq-item__question');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('is-open');

      // Close all others
      document.querySelectorAll('.faq-item.is-open').forEach(openItem => {
        openItem.classList.remove('is-open');
        openItem.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ── Modal: data-modal-open="id" 클릭 시 열기, data-modal-close 또는 ESC로 닫기 ── */
function initModals() {
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal-open]');
    if (trigger) {
      e.preventDefault();
      const modal = document.getElementById(trigger.getAttribute('data-modal-open'));
      if (modal) {
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
      }
      return;
    }
    const closer = e.target.closest('[data-modal-close]');
    if (closer) {
      const modal = closer.closest('.modal');
      if (modal) {
        modal.hidden = true;
        document.body.style.overflow = '';
      }
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not([hidden])').forEach(m => {
        m.hidden = true;
        document.body.style.overflow = '';
      });
    }
  });
}

/* ── Section reveal on scroll ── */
function initSectionReveal() {
  const sections = document.querySelectorAll('[data-animate]');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ── Contact Form (about.html 폼2) ── */
function initContactForm() {
  const form   = document.getElementById('contactForm');
  if (!form) return;

  // 타임트랩: 폼 로드 시각 기록
  const loadedAt = document.getElementById('contactLoadedAt');
  if (loadedAt) loadedAt.value = Math.floor(Date.now() / 1000);

  const btn    = document.getElementById('contactSubmitBtn');
  const result = document.getElementById('contactResult');
  const lang   = window.location.pathname.includes('/ko/') ? 'ko' : 'en';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = form.querySelector('#contact-name').value.trim();
    const company = form.querySelector('#contact-company').value.trim();
    const email   = form.querySelector('#contact-email').value.trim();
    const phone   = form.querySelector('#contact-phone').value.trim();
    const subject = form.querySelector('#contact-subject').value;
    const message = form.querySelector('#contact-message').value.trim();

    // 클라이언트 검증
    if (!name || !email || !subject || !message) {
      showResult(result, 'error', 'Please fill in all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showResult(result, 'error', 'Please enter a valid email address.');
      return;
    }
    const consentEl = form.querySelector('#contact-consent');
    if (consentEl && !consentEl.checked) {
      showResult(result, 'error', 'Please agree to the Privacy Policy to submit.');
      return;
    }

    setLoading(btn, true, 'Sending...');
    hideResult(result);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          name, company, email, phone, subject, message,
          lang,
          source_url: window.location.href,
          referrer: document.referrer || '',
          _loaded_at: loadedAt ? loadedAt.value : '',
          _hp: form.querySelector('input[name="_hp"]')?.value || '',
          ...window.WM_getAttribution(),
        }),
      });
      const data = await res.json();

      if (data.success) {
        // 문의 전환 추적 (GTM generate_lead) — 성공 시에만 push해 가짜 전환 방지
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'generate_lead', form_type: 'contact', site: 'wizmobility' });
        form.reset();
        if (loadedAt) loadedAt.value = Math.floor(Date.now() / 1000);
        showResult(result, 'success', data.message);
      } else {
        showResult(result, 'error', data.message || 'Failed to send. Please try again.');
      }
    } catch {
      showResult(result, 'error', 'Network error. Please try again.');
    } finally {
      setLoading(btn, false, 'Send Inquiry →');
    }
  });
}

/* ── 공통 폼 헬퍼 ── */
function setLoading(btn, loading, label) {
  if (!btn) return;
  btn.disabled = loading;
  const arrow = btn.querySelector('.cta__arrow');
  if (arrow) {
    btn.childNodes[0].textContent = label.replace(' →', ' ');
  } else {
    btn.textContent = label;
  }
}

function showResult(el, type, message) {
  if (!el) return;
  el.textContent = message;
  el.className = 'contact-form__result contact-form__result--' + type;
  el.style.display = 'block';
}

function hideResult(el) {
  if (!el) return;
  el.style.display = 'none';
  el.textContent = '';
}
