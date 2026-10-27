(function () {
  "use strict";

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char];
    });
  }

  function initials(name) {
    const clean = String(name || "").trim();
    return clean ? clean.charAt(0).toLocaleUpperCase("id-ID") : "?";
  }

  function renderMembers() {
    const list = document.getElementById("members-list");
    if (!list) return;

    const data = (window.CP_DATA && Array.isArray(window.CP_DATA.members)) ? window.CP_DATA.members : [];
    const search = document.getElementById("member-search");
    const countLabel = document.getElementById("member-results-count");
    const filterButtons = Array.from(document.querySelectorAll("[data-member-filter]"));
    let activeFilter = "all";

    const countFor = (category) => data.filter((member) => member.category === category).length;
    const countMobi = countFor("MOBI");
    const countHP = countFor("HP");
    const countTotal = data.length;

    const setText = (id, value) => {
      const node = document.getElementById(id);
      if (node) node.textContent = String(value);
    };
    setText("members-mobi-count", countMobi);
    setText("members-hp-count", countHP);
    setText("members-total-count", countTotal);
    setText("filter-count-all", countTotal);
    setText("filter-count-mobi", countMobi);
    setText("filter-count-hp", countHP);

    function cardMarkup(member) {
      const category = member.category === "MOBI" ? "MOBI" : "HP";
      return `<article class="member-card" data-category="${category}">
        <span class="member-avatar" aria-hidden="true">${escapeHTML(initials(member.name))}</span>
        <div class="member-info"><strong>${escapeHTML(member.name)}</strong><span class="member-category-tag ${category.toLowerCase()}">${category}</span></div>
      </article>`;
    }

    function emptyMarkup() {
      return `<div class="empty-state"><span class="empty-state-icon">${window.CP_ICON ? window.CP_ICON("search-x") : ""}</span><h3>Anggota tidak ditemukan</h3><p>Coba nama lain atau ubah filter kategori untuk melihat hasil yang tersedia.</p></div>`;
    }

    function render() {
      const term = (search ? search.value : "").trim().toLocaleLowerCase("id-ID");
      const filtered = data.filter((member) => {
        const byCategory = activeFilter === "all" || member.category === activeFilter;
        const byName = String(member.name).toLocaleLowerCase("id-ID").includes(term);
        return byCategory && byName;
      });

      if (countLabel) countLabel.textContent = `Menampilkan ${filtered.length} dari ${countTotal} entri anggota`;
      if (!filtered.length) {
        list.innerHTML = emptyMarkup();
        return;
      }

      const groups = activeFilter === "all" ? ["MOBI", "HP"] : [activeFilter];
      list.innerHTML = groups.map((category) => {
        const group = filtered.filter((member) => member.category === category);
        if (!group.length) return "";
        const isMobi = category === "MOBI";
        return `<section class="member-category-section" aria-label="Anggota ${category}">
          <div class="member-category-title"><span class="category-indicator ${isMobi ? "" : "hp"}"></span><h2>${category}</h2><span>${group.length} anggota ditampilkan</span><span class="member-category-line"></span><span class="muted">${isMobi ? "01 / MOBILE" : "02 / PHONE"}</span></div>
          <div class="members-grid">${group.map(cardMarkup).join("")}</div>
        </section>`;
      }).join("");
    }

    if (search) search.addEventListener("input", render);
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.memberFilter || "all";
        filterButtons.forEach((item) => {
          const isActive = item === button;
          item.classList.toggle("is-active", isActive);
          item.setAttribute("aria-pressed", String(isActive));
        });
        render();
      });
    });
    render();
  }

  window.CP_INIT_MEMBERS = renderMembers;
})();
