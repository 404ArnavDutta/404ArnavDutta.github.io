---
layout: single
title: "Reports"
permalink: /reports/
header: false

# Add each report here (title, url, date, summary)
reports:
  - title: "Nuclear Magnetic Resonance — Year 2 Lab Report"
    url: "/assets/reports/NUCLEAR_MAGNETIC_RESONANCE.pdf"
    date: 2024-12-3
    summary: "Year-2 physics lab: NMR principles, setup, and results."
---

<div style="display:flex; gap:2rem; align-items:center; margin:1rem 0 1.25rem 0;">
  <label style="flex:1;">
    <div style="font-weight:600; margin-bottom:.25rem;">Search</div>
    <input id="report-search" type="text" placeholder="Search title or summary..." style="width:100%; padding:.6rem .75rem; border-radius:.5rem; border:1px solid var(--mm-color-border,#444);" />
  </label>
  <label style="min-width:220px;">
    <div style="font-weight:600; margin-bottom:.25rem;">Sort</div>
    <select id="report-sort" style="width:100%; padding:.6rem .75rem; border-radius:.5rem; border:1px solid var(--mm-color-border,#444);">
      <option value="new">Newest first</option>
      <option value="old">Oldest first</option>
    </select>
  </label>
</div>

<ul id="report-list" style="list-style:none; padding-left:0;">
  {% for r in page.reports %}
  <li class="report-item"
      data-title="{{ r.title | downcase }}"
      data-summary="{{ r.summary | downcase }}"
      data-date="{{ r.date | escape }}"
      style="margin:0 0 1rem 0; padding:1rem 1.25rem; border-radius:.75rem; border:1px solid var(--mm-color-border,#444);">
    <div style="display:flex; justify-content:space-between; gap:1rem; align-items:baseline; flex-wrap:wrap;">
      <a href="{{ r.url }}" style="font-weight:700; text-decoration:underline;">{{ r.title }}</a>
      <time datetime="{{ r.date }}">{{ r.date }}</time>
    </div>
    {% if r.summary %}
    <p style="margin:.35rem 0 0 0;">{{ r.summary }}</p>
    {% endif %}
  </li>
  {% endfor %}
</ul>

<script>
(function(){
  const list    = document.getElementById('report-list');
  const items   = Array.from(list.querySelectorAll('.report-item'));
  const search  = document.getElementById('report-search');
  const sortSel = document.getElementById('report-sort');

  function apply() {
    const q = (search.value || '').toLowerCase().trim();
    const ord = sortSel.value;

    // filter
    const filtered = items.filter(li =>
      li.dataset.title.includes(q) || li.dataset.summary.includes(q)
    );

    // sort by date
    filtered.sort((a, b) => {
      const da = new Date(a.dataset.date);
      const db = new Date(b.dataset.date);
      return ord === 'new' ? (db - da) : (da - db);
    });

    // render
    list.innerHTML = '';
    filtered.forEach(li => list.appendChild(li));
  }

  search.addEventListener('input', apply);
  sortSel.addEventListener('change', apply);
  apply();
})();
</script>
