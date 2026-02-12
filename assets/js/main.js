(function () {
  const PHONE = "0507365857";
  const WA_NUMBER = "971507365857"; // رقم أبوظبي بصيغة واتساب الدولية (الإمارات +971)

  // تفعيل رابط الصفحة الحالية في القائمة
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });

  // قائمة الموبايل
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav-menu]");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    // إغلاق القائمة عند الضغط على رابط
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });

    // إغلاق عند الضغط خارجها
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("open");
      }
    });
  }

  // تجهيز روابط الاتصال/واتساب تلقائياً
  document.querySelectorAll("[data-phone]").forEach(el => {
    el.setAttribute("href", `tel:${PHONE}`);
  });
  document.querySelectorAll("[data-wa]").forEach(el => {
    el.setAttribute("href", `https://wa.me/${WA_NUMBER}`);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  // فورم واتساب (يرسل رسالة جاهزة)
  const waForm = document.querySelector("[data-wa-form]");
  if (waForm) {
    waForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = (waForm.querySelector("[name='name']")?.value || "").trim();
      const area = (waForm.querySelector("[name='area']")?.value || "").trim();
      const device = (waForm.querySelector("[name='device']")?.value || "").trim();
      const issue = (waForm.querySelector("[name='issue']")?.value || "").trim();

      const msg =
        `السلام عليكم،\n` +
        `أنا: ${name || "بدون اسم"}\n` +
        `المكان: ${area || "غير محدد"}\n` +
        `نوع الجهاز: ${device || "غير محدد"}\n` +
        `وصف المشكلة: ${issue || "غير محدد"}\n` +
        `أرجو التواصل معي لتحديد الموعد.`;

      const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }
})();
