---
layout: single
title: "Projects"
permalink: /projects/
header: false

# Add projects here. Use ISO dates in `date_iso` for sorting.
projects:
  # example:
  # - title: "Battery Sim"
  #   url: "https://github.com/404ArnavDutta/battery-sim"
  #   date_iso: 2025-02-01
  #   summary: "G-force-aware braking model with real-time charts (Streamlit)."
---

<div style="display:flex; gap:2rem; align-items:center; margin:1rem 0 1.25rem 0;">
  <label style="flex:1;">
    <div style="font-weight:600; margin-bottom:.25rem;">Search</div>
    <input id="proj-search" type="text" placeholder="Search title or summary..." style="width:100%; padding:.6rem .75rem; border-radius:.5rem; border:1px solid var(--mm-color-border,#444);" />
  </label>
  <label style="min-width:220px;">
    <div style="font-weight:600; margin-bottom:.25rem;">Sort</div>
    <select id="proj-sort" style="width:100%; padding:.6rem .75rem; border-radius:.5rem; border:1px solid var(--mm-color-border,#444);">
      <option value="new">Newest first</option>
      <option value="old">Oldest first</option>
    </select>
  </label>
</div>

<ul id="proj-list" style="list-style:none; padding-left:0;">
  {% for p in page.projects %}
  <li class="proj-item"
      data-title="{{ p.title | downcase }}"
      data-summary="{{ p.summary | downcase }}"
      data-date="{{ p.date_iso | escape }}"
      style="margin:0 0 1rem 0; padding:1rem 1.25rem; border-radius:.75rem; border:1px solid var(--mm-color-border,#444);">
    <div style="display:flex; justify-content:space-between; gap:1rem; align-items:baseline; flex-wrap:wrap;">
      <a href="{{ p.url }}" style="font-weight:700; text-decoration:underline;">{{ p.title }}</a>
      <time class="date" datetime="{{ p.date_iso }}"></time>
    </div>
    {% if p.summary %}<p style="margin:.35rem 0 0 0;">{{ p.summary }}</p>{% endif %}
  </li>
  {% endfor %}
</ul>

<p id="proj-empty" style="display:none; margin-top:1rem;">No projects yet — check back soon.</p>

<script>
(function(){
  const list = document.getElementById('proj-list');
  const items = Array.from(list.querySelectorAll('.proj-item'));
  const search = document.getElementById('proj-search');
  const sortSel = document.getElementById('proj-sort');
  const emptyMsg = document.getElementById('proj-empty');

  function fmtUK(d){
    const dd = String(d.getDate()).padStart(2,'0');
    const mm = String(d.getMonth()+1).padStart(2,'0');
    const yyyy = d.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  }

  items.forEach(li => {
    const t = li.querySelector('time.date');
    const d = new Date(li.dataset.date);
    if (!isNaN(d)) t.textContent = fmtUK(d);
  });

  function apply(){
    const q = (search.value || '').toLowerCase().trim();
    const ord = sortSel.value;

    const filtered = items.filter(li =>
      li.dataset.title.includes(q) || li.dataset.summary.includes(q)
    );

    filtered.sort((a,b) => {
      const da = new Date(a.dataset.date), db = new Date(b.dataset.date);
      return ord === 'new' ? (db - da) : (da - db);
    });

    list.innerHTML = '';
    filtered.forEach(li => list.appendChild(li));
    emptyMsg.style.display = filtered.length ? 'none' : 'block';
  }

  search.addEventListener('input', apply);
  sortSel.addEventListener('change', apply);
  apply();
})();
</script>
