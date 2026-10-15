// ---------- Project Details Modal ----------
document.addEventListener('DOMContentLoaded', () => {
    const pageWrapper   = document.getElementById('pageWrapper');
    const modalOverlay  = document.getElementById('modalOverlay');
    const modalClose    = document.getElementById('modalClose');
    const modalImage    = document.getElementById('modalImage');
    const modalTitle    = document.getElementById('modalTitle');
    const modalTagline  = document.getElementById('modalTagline');
    const modalDesc     = document.getElementById('modalDescription');
    const modalData     = document.getElementById('modalData');
    const modalContributions     = document.getElementById('modalContributions');
    const modalContributionsList = document.getElementById('modalContributionsList');

    const openModal = (card) => {
        const { title, tagline, image, description, role, status, awards, tags, engine, contributions } = card.dataset;

        modalImage.src = image || '';
        modalImage.alt = title || '';
        modalTitle.textContent = title || '';
        modalTagline.textContent = tagline || '';
        modalDesc.textContent = description || '';

        // Project data (Role / Status / Awards / Tags / Engines)
        modalData.innerHTML = '';
        const dataFields = [
            { label: 'Role', value: role },
            { label: 'Status', value: status },
            { label: 'Awards', value: awards, wide: true },
            { label: 'Tags', value: tags, wide: true },
            { label: 'Engines and Languages', value: engine, wide: true }
        ];
        dataFields.forEach(field => {
            if (!field.value) return;
            const item = document.createElement('div');
            item.className = 'modal-data-item' + (field.wide ? ' wide' : '');

            const label = document.createElement('span');
            label.className = 'modal-data-label';
            label.textContent = field.label;

            const value = document.createElement('span');
            value.className = 'modal-data-value';
            value.textContent = field.value;

            item.appendChild(label);
            item.appendChild(value);
            modalData.appendChild(item);
        });

        // Key contributions
        modalContributionsList.innerHTML = '';
        if (contributions) {
            try {
                const items = JSON.parse(contributions);
                items.forEach(entry => {
                    const li = document.createElement('li');

                    const text = document.createElement('p');
                    text.textContent = entry.text;
                    li.appendChild(text);

                    if (entry.images && entry.images.length) {
                        const gallery = document.createElement('div');
                        gallery.className = 'contribution-images';
                        entry.images.forEach(src => {
                            const img = document.createElement('img');
                            img.src = src;
                            img.alt = entry.text;
                            img.loading = 'lazy';
                            gallery.appendChild(img);
                        });
                        li.appendChild(gallery);
                    }

                    modalContributionsList.appendChild(li);
                });
                modalContributions.style.display = items.length ? 'flex' : 'none';
            } catch (e) {
                console.warn('Could not parse project contributions:', e);
                modalContributions.style.display = 'none';
            }
        } else {
            modalContributions.style.display = 'none';
        }

        modalOverlay.classList.add('active');
        pageWrapper.classList.add('blurred');
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        pageWrapper.classList.remove('blurred');
        document.body.classList.remove('modal-open');
    };

    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.project-card');
            if (card) openModal(card);
        });
    });

    modalClose.addEventListener('click', closeModal);

    // Click outside the modal card closes it
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Escape key closes it
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
});

// ---------- Dropdown Menu ----------
    const menuIcon      = document.querySelector('#menu-icon');
    const navLinks      = document.querySelector('.nav-links');
menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
}
