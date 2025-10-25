/* ================== VARIABILE & CONFIG ================== */
const STORAGE_KEY = 'gradinitaDataV7';
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let selectedDays = [];
let chartInstance = null;
let selectedChildIdForModal = null;

/* ================== NOTIFICĂRI ================== */
class NotificationManager {
    static show(message, type = 'info', duration = 3000) {
        // Elimină notificările vechi
        const oldNotifications = document.querySelectorAll('.custom-notification');
        oldNotifications.forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
        `;

        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };

        notification.style.background = colors[type] || colors.info;
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, duration);
    }
}

/* ================== FUNCȚII DE BAZĂ ================== */
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const migrateData = (data) => {
    if (!data.children) data.children = {};

    Object.keys(data.children).forEach(childId => {
        const child = data.children[childId];

        if (!child.institution) child.institution = 'Grădiniță';
        if (!child.startDate) child.startDate = new Date().toISOString().split('T')[0];
        if (!child.defaultRate) child.defaultRate = 15;
        if (!child.color) child.color = getRandomColor();
        if (!child.extraActivities) {
            child.extraActivities = [
                { name: 'Engleză', rate: 20, color: '#9b59b6', enabled: true }
            ];
        }

        child.extraActivities.forEach(activity => {
            if (activity.enabled === undefined) activity.enabled = true;
            if (!activity.color) activity.color = '#9b59b6';
        });
    });

    return data;
};

const loadData = () => {
    try {
        let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        data = migrateData(data);
        return data;
    } catch (e) {
        console.error("Eroare la încărcare date:", e);
        return { children: {} };
    }
};

const saveData = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error("Eroare la salvare date:", e);
        NotificationManager.show('Eroare la salvarea datelor', 'error');
    }
};

const sanitize = (input) => {
    if (typeof input !== 'string') return input;
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
};

/* ================== RENDER CALENDAR ================== */
const renderCalendar = () => {
    const calendar = document.getElementById('calendar');
    if (!calendar) {
        console.error('Elementul calendar nu a fost găsit!');
        return;
    }

    calendar.innerHTML = '';
    const data = loadData();
    const key = `${year}-${month}`;

    if (!data[key]) {
        data[key] = {
            days: {},
            daysExtra: {},
            rates: {},
            notes: {},
            payments: {},
            holidays: [],
            freeDays: {},
            paymentsOnDay: {}
        };
        saveData(data);
    }

    // Header zile săptămânii
    const weekdays = ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sa', 'Du'];
    weekdays.forEach((w, idx) => {
        const el = document.createElement('div');
        el.className = `day-header ${idx >= 5 ? 'weekend' : ''}`;
        el.textContent = w;
        calendar.appendChild(el);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const empty = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < empty; i++) {
        calendar.appendChild(document.createElement('div'));
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
        const day = document.createElement('div');
        day.className = 'day';
        day.dataset.day = d;

        const date = new Date(year, month, d);
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        if (isWeekend) day.classList.add('weekend');

        day.innerHTML = `<span class="day-number">${d}</span>`;
        day.onclick = (e) => toggleCtrlSelection(d, day, e);
        updateDayDisplay(day, d, data[key]);
        calendar.appendChild(day);
    }

    // Actualizează controalele de navigare
    const monthSelect = document.getElementById('monthSelectNav');
    const yearSelect = document.getElementById('yearSelectNav');
    if (monthSelect) monthSelect.value = month;
    if (yearSelect) yearSelect.value = year;

    renderChildrenReports();
    renderLegend();
};

const updateDayDisplay = (cell, day, monthData) => {
    cell.style.backgroundColor = '';
    cell.style.borderColor = '';

    let indicators = cell.querySelector('.indicators');
    if (indicators) indicators.remove();
    indicators = document.createElement('div');
    indicators.className = 'indicators';

    if (!monthData) return;

    // Note
    if (monthData.notes && monthData.notes[day]) {
        cell.classList.add('note-indicator');
        cell.title = `Notiță: ${sanitize(monthData.notes[day])}`;
    } else {
        cell.classList.remove('note-indicator');
    }

    // Zile libere
    if (monthData.holidays && monthData.holidays.includes(day)) {
        cell.classList.add('holiday');
        if (!cell.title) cell.title = "Zi liberă";
        return;
    } else {
        cell.classList.remove('holiday');
    }

    // Zile fără plată
    if (monthData.freeDays && monthData.freeDays[day]) {
        cell.classList.add('free-day');
        cell.title = "Zi fără plată (absentență/vacanță)";
    } else {
        cell.classList.remove('free-day');
    }

    const childrenData = loadData().children;
    let cellTooltipContent = '';

    for (const childId of Object.keys(childrenData)) {
        const child = childrenData[childId];
        const childName = sanitize(child.name);

        const isFreeForChild = monthData.freeDays && monthData.freeDays[day] && monthData.freeDays[day].includes(childId);

        if (monthData.freeDays && monthData.freeDays[day] && monthData.freeDays[day].length === Object.keys(childrenData).length) {
            continue;
        }

        if (!isFreeForChild && monthData.days && monthData.days[childId] && monthData.days[childId].includes(day)) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.style.backgroundColor = child.color || '#3498db';
            indicator.title = `${childName} - ${child.institution}`;
            indicators.appendChild(indicator);
            cellTooltipContent += (cellTooltipContent ? '\n' : '') + `${childName} - ${child.institution}`;
        }

        const activities = child.extraActivities || [];
        activities.forEach((activity, index) => {
            if (!isFreeForChild && activity.enabled && monthData.daysExtra && monthData.daysExtra[childId] &&
                monthData.daysExtra[childId][index] && monthData.daysExtra[childId][index].includes(day)) {
                const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.style.backgroundColor = activity.color || '#9b59b6';
            indicator.title = `${childName} - ${activity.name}`;
            indicators.appendChild(indicator);
            cellTooltipContent += (cellTooltipContent ? '\n' : '') + `${childName} - ${activity.name}`;
                }
        });
    }

    if (monthData.paymentsOnDay && monthData.paymentsOnDay[day]) {
        const paymentInfo = monthData.paymentsOnDay[day];
        if (paymentInfo.length > 0) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.style.backgroundColor = paymentInfo[0].color || '#2ecc71';

            const paymentTooltip = paymentInfo.map(p => {
                const child = childrenData[p.childId];
                const childName = child ? sanitize(child.name) : 'Necunoscut';
                return `${parseFloat(p.amount).toFixed(2)} lei - ${childName}`;
            }).join('\n');

            indicator.title = `Plăți:\n${paymentTooltip}`;
            indicators.appendChild(indicator);
            cellTooltipContent += (cellTooltipContent ? '\n---\n' : '') + `Plăți:\n${paymentTooltip}`;
        }
    }

    if (indicators.children.length > 0) {
        cell.appendChild(indicators);
    }

    if (cellTooltipContent) {
        cell.title = cellTooltipContent;
    }
};

/* ================== GESTIUNE MODALE ================== */
const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
};

const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
    if (modalId === 'dayModal') {
        clearMultiSelection();
    }
};

const clearMultiSelection = () => {
    selectedDays.forEach(d => {
        const cell = document.querySelector(`.day[data-day='${d}']`);
        if (cell) cell.style.outline = '';
    });
        selectedDays = [];
};

const toggleCtrlSelection = (day, elCell, event) => {
    const isCtrlKey = event.ctrlKey || event.metaKey;
    const index = selectedDays.indexOf(day);

    if (isCtrlKey) {
        if (index > -1) {
            selectedDays.splice(index, 1);
            elCell.style.outline = '';
        } else {
            selectedDays.push(day);
            elCell.style.outline = '3px solid #3498db';
        }
    } else {
        const isOpeningMulti = selectedDays.length > 1 && index > -1;
        if (!isOpeningMulti) {
            clearMultiSelection();
            selectedDays = [day];
            elCell.style.outline = '3px solid #3498db';
        }
        showDayModal(day, elCell);
    }
};

const showDayModal = (day, elCell) => {
    const modalDayNumber = document.getElementById('modalDayNumber');
    if (modalDayNumber) {
        modalDayNumber.textContent = selectedDays.length > 1 ? selectedDays.join(', ') : day;
    }

    const data = loadData();
    const key = `${year}-${month}`;
    const children = data.children || {};
    const childSelectionButtons = document.getElementById('childSelectionButtons');

    if (!childSelectionButtons) return;

    childSelectionButtons.innerHTML = '';

    // Butoane generale
    const generalButtons = document.createElement('div');
    generalButtons.className = 'general-buttons';

    // Buton zi fără plată pentru toți copiii
    const isFreeDay = data[key].freeDays && data[key].freeDays[day];
    const freeDayBtn = document.createElement('button');
    freeDayBtn.textContent = selectedDays.every(d => data[key].freeDays && data[key].freeDays[d]) ?
    'Anulează zi fără plată' : 'Marchează ca zi fără plată (toți copiii)';
    freeDayBtn.className = selectedDays.every(d => data[key].freeDays && data[key].freeDays[d]) ?
    'btn-danger' : 'btn-info';
    freeDayBtn.onclick = applyMultiFreeDay;
    generalButtons.appendChild(freeDayBtn);

    childSelectionButtons.appendChild(generalButtons);

    // Butoane pentru fiecare copil
    for (const id of Object.keys(children)) {
        const child = children[id];
        const isKindergartenActive = selectedDays.every(d => data[key].days && data[key].days[id] && data[key].days[id].includes(d));
        const isFreeForChild = selectedDays.every(d =>
        data[key].freeDays && data[key].freeDays[d] && data[key].freeDays[d].includes(id)
        );

        const childSection = document.createElement('div');
        childSection.className = 'child-selection-section';
        childSection.innerHTML = `
        <div class="child-name">
        ${sanitize(child.name)}
        ${isFreeForChild ? '<span class="free-day-badge">🆓 Fără plată</span>' : ''}
        </div>
        <div class="activity-buttons">
        <button class="${isKindergartenActive ? 'active' : ''}" onclick="applyMultiPresence('${id}','kindergarten')">
        ${child.institution}
        </button>
        `;

        // Activități suplimentare
        const activities = child.extraActivities || [];
        activities.forEach((activity, index) => {
            if (activity.enabled) {
                const isActivityActive = selectedDays.every(d =>
                data[key].daysExtra &&
                data[key].daysExtra[id] &&
                data[key].daysExtra[id][index] &&
                data[key].daysExtra[id][index].includes(d)
                );

                childSection.innerHTML += `
                <button class="${isActivityActive ? 'active' : ''}"
                onclick="applyMultiPresence('${id}','extra', ${index})"
                style="background-color: ${activity.color || '#9b59b6'}">
                ${sanitize(activity.name)}
                </button>
                `;
            }
        });

        // Buton pentru zi fără plată individuală
        childSection.innerHTML += `
        <button class="${isFreeForChild ? 'active' : ''} free-day-btn"
        onclick="toggleFreeDayForChild('${id}')">
        ${isFreeForChild ? '✅ Fără plată' : '🆓 Marchează fără plată'}
        </button>
        </div>
        </div>`;
        childSelectionButtons.appendChild(childSection);
    }

    // Notiță existentă
    const noteTextarea = document.getElementById('noteTextarea');
    if (noteTextarea) {
        const existingNote = (data[key].notes && data[key].notes[selectedDays[0]]) || '';
        noteTextarea.value = sanitize(existingNote);
    }

    openModal('dayModal');
};

const reRenderModalButtons = () => {
    const data = loadData();
    const key = `${year}-${month}`;
    const children = data.children || {};
    const childSelectionButtons = document.getElementById('childSelectionButtons');

    if (!childSelectionButtons) return;

    childSelectionButtons.innerHTML = '';

    const day = selectedDays[0];
    const generalButtons = document.createElement('div');
    generalButtons.className = 'general-buttons';

    const isFreeDay = data[key].freeDays && data[key].freeDays[day];
    const freeDayBtn = document.createElement('button');
    freeDayBtn.textContent = selectedDays.every(d => data[key].freeDays && data[key].freeDays[d]) ?
    'Anulează zi fără plată' : 'Marchează ca zi fără plată (toți copiii)';
    freeDayBtn.className = selectedDays.every(d => data[key].freeDays && data[key].freeDays[d]) ?
    'btn-danger' : 'btn-info';
    freeDayBtn.onclick = applyMultiFreeDay;
    generalButtons.appendChild(freeDayBtn);

    childSelectionButtons.appendChild(generalButtons);

    for (const id of Object.keys(children)) {
        const child = children[id];
        const isKindergartenActive = selectedDays.every(d => data[key].days && data[key].days[id] && data[key].days[id].includes(d));
        const isFreeForChild = selectedDays.every(d =>
        data[key].freeDays && data[key].freeDays[d] && data[key].freeDays[d].includes(id)
        );

        const childSection = document.createElement('div');
        childSection.className = 'child-selection-section';
        childSection.innerHTML = `
        <div class="child-name">
        ${sanitize(child.name)}
        ${isFreeForChild ? '<span class="free-day-badge">🆓 Fără plată</span>' : ''}
        </div>
        <div class="activity-buttons">
        <button class="${isKindergartenActive ? 'active' : ''}" onclick="applyMultiPresence('${id}','kindergarten')">
        ${child.institution}
        </button>
        `;

        const activities = child.extraActivities || [];
        activities.forEach((activity, index) => {
            if (activity.enabled) {
                const isActivityActive = selectedDays.every(d =>
                data[key].daysExtra &&
                data[key].daysExtra[id] &&
                data[key].daysExtra[id][index] &&
                data[key].daysExtra[id][index].includes(d)
                );

                childSection.innerHTML += `
                <button class="${isActivityActive ? 'active' : ''}"
                onclick="applyMultiPresence('${id}','extra', ${index})"
                style="background-color: ${activity.color || '#9b59b6'}">
                ${sanitize(activity.name)}
                </button>
                `;
            }
        });

        childSection.innerHTML += `
        <button class="${isFreeForChild ? 'active' : ''} free-day-btn"
        onclick="toggleFreeDayForChild('${id}')">
        ${isFreeForChild ? '✅ Fără plată' : '🆓 Marchează fără plată'}
        </button>
        </div>
        </div>`;
        childSelectionButtons.appendChild(childSection);
    }
};

const applyMultiPresence = (childId, type, activityIndex = null) => {
    const data = loadData();
    const key = `${year}-${month}`;

    if (type === 'kindergarten') {
        if (!data[key].days) data[key].days = {};
        if (!data[key].days[childId]) data[key].days[childId] = [];

        const isTogglingOn = !selectedDays.every(d => data[key].days[childId].includes(d));

        selectedDays.forEach(d => {
            const arr = data[key].days[childId];
            const idx = arr.indexOf(d);
            if (isTogglingOn) {
                if (idx === -1) arr.push(d);
            } else {
                if (idx > -1) arr.splice(idx, 1);
            }
        });
    } else if (type === 'extra' && activityIndex !== null) {
        if (!data[key].daysExtra) data[key].daysExtra = {};
        if (!data[key].daysExtra[childId]) data[key].daysExtra[childId] = [];

        while (data[key].daysExtra[childId].length <= activityIndex) {
            data[key].daysExtra[childId].push([]);
        }

        const activityDays = data[key].daysExtra[childId][activityIndex];
        const isTogglingOn = !selectedDays.every(d => activityDays.includes(d));

        selectedDays.forEach(d => {
            const idx = activityDays.indexOf(d);
            if (isTogglingOn) {
                if (idx === -1) activityDays.push(d);
            } else {
                if (idx > -1) activityDays.splice(idx, 1);
            }
        });
    }

    saveData(data);
    renderCalendar();
    reRenderModalButtons();
};

const applyMultiFreeDay = () => {
    const data = loadData();
    const key = `${year}-${month}`;
    if (!data[key].freeDays) data[key].freeDays = {};

    const isTogglingOn = !selectedDays.every(d => data[key].freeDays && data[key].freeDays[d]);

    selectedDays.forEach(d => {
        if (isTogglingOn) {
            const allChildIds = Object.keys(data.children || {});
            data[key].freeDays[d] = allChildIds;

            for(const childId in data.children){
                if (data[key].days && data[key].days[childId]) {
                    data[key].days[childId] = data[key].days[childId].filter(day => day !== d);
                }
                if (data[key].daysExtra && data[key].daysExtra[childId]) {
                    data[key].daysExtra[childId] = data[key].daysExtra[childId].map(activityDays =>
                    activityDays.filter(day => day !== d)
                    );
                }
            }

            if (data[key].holidays && data[key].holidays.includes(d)) {
                data[key].holidays = data[key].holidays.filter(h => h !== d);
            }
        } else {
            delete data[key].freeDays[d];
        }
    });

    saveData(data);
    renderCalendar();
    reRenderModalButtons();
    NotificationManager.show(isTogglingOn ? 'Zile marcate ca fără plată!' : 'Zilele nu mai sunt fără plată!', 'success');
};

const toggleFreeDayForChild = (childId) => {
    const data = loadData();
    const key = `${year}-${month}`;
    if (!data[key].freeDays) data[key].freeDays = {};

    const isTogglingOn = !selectedDays.every(d =>
    data[key].freeDays && data[key].freeDays[d] && data[key].freeDays[d].includes(childId)
    );

    selectedDays.forEach(d => {
        if (!data[key].freeDays[d]) data[key].freeDays[d] = [];

        if (isTogglingOn) {
            if (!data[key].freeDays[d].includes(childId)) {
                data[key].freeDays[d].push(childId);
            }

            if (data[key].days && data[key].days[childId]) {
                data[key].days[childId] = data[key].days[childId].filter(day => day !== d);
            }
            if (data[key].daysExtra && data[key].daysExtra[childId]) {
                data[key].daysExtra[childId] = data[key].daysExtra[childId].map(activityDays =>
                activityDays.filter(day => day !== d)
                );
            }
        } else {
            data[key].freeDays[d] = data[key].freeDays[d].filter(id => id !== childId);
            if (data[key].freeDays[d].length === 0) {
                delete data[key].freeDays[d];
            }
        }
    });

    saveData(data);
    renderCalendar();
    reRenderModalButtons();
    NotificationManager.show(isTogglingOn ? 'Zile marcate ca fără plată pentru copil!' : 'Zilele nu mai sunt fără plată pentru copil!', 'success');
};

const saveNote = () => {
    const data = loadData();
    const key = `${year}-${month}`;
    if (!data[key].notes) data[key].notes = {};

    const noteTextarea = document.getElementById('noteTextarea');
    if (!noteTextarea) return;

    const note = noteTextarea.value.trim();

    if (note) {
        selectedDays.forEach(d => {
            data[key].notes[d] = sanitize(note);
        });
    } else {
        selectedDays.forEach(d => {
            delete data[key].notes[d];
        });
    }

    saveData(data);
    renderCalendar();
    closeModal('dayModal');
    clearMultiSelection();
    NotificationManager.show('Notiță salvată!', 'success');
};

const clearDaySelections = () => {
    const data = loadData();
    const key = `${year}-${month}`;

    selectedDays.forEach(d => {
        for(const childId in data.children){
            if (data[key].days && data[key].days[childId]) {
                data[key].days[childId] = data[key].days[childId].filter(day => day !== d);
            }
            if (data[key].daysExtra && data[key].daysExtra[childId]) {
                data[key].daysExtra[childId] = data[key].daysExtra[childId].map(activityDays =>
                activityDays.filter(day => day !== d)
                );
            }
        }
        if (data[key].holidays) {
            data[key].holidays = data[key].holidays.filter(day => day !== d);
        }
        if (data[key].notes) {
            delete data[key].notes[d];
        }
    });

    saveData(data);
    renderCalendar();
    closeModal('dayModal');
    clearMultiSelection();
    NotificationManager.show('Selecțiile au fost șterse!', 'success');
};

/* ================== GESTIUNE COPII ================== */
const addChild = () => {
    const data = loadData();
    const newId = `c${Date.now()}`;
    const newChild = {
        name: `Copil ${Object.keys(data.children).length + 1}`,
        institution: 'Grădiniță',
        startDate: new Date().toISOString().split('T')[0],
        defaultRate: 15,
            color: getRandomColor(),
            extraActivities: [
                { name: 'Engleză', rate: 20, color: '#9b59b6', enabled: true }
            ]
    };
    data.children[newId] = newChild;
    saveData(data);
    renderCalendar();
    showSettingsModal(newId);
    NotificationManager.show('Copil nou adăugat!', 'success');
};

const showSettingsModal = (childId) => {
    selectedChildIdForModal = childId;
    const data = loadData();
    const child = data.children[childId];

    const settingsChildName = document.getElementById('settingsChildName');
    const editChildName = document.getElementById('editChildName');
    const editInstitution = document.getElementById('editInstitution');
    const editStartDate = document.getElementById('editStartDate');
    const editDefaultRate = document.getElementById('editDefaultRate');
    const editChildColor = document.getElementById('editChildColor');

    if (settingsChildName) settingsChildName.textContent = sanitize(child.name);
    if (editChildName) editChildName.value = sanitize(child.name);
    if (editInstitution) editInstitution.value = child.institution || 'Grădiniță';
    if (editStartDate) editStartDate.value = child.startDate || new Date().toISOString().split('T')[0];
    if (editDefaultRate) editDefaultRate.value = child.defaultRate || 15;
    if (editChildColor) editChildColor.value = child.color || '#3498db';

    renderExtraActivities(child.extraActivities || []);
    openModal('settingsModal');
};

const renderExtraActivities = (activities) => {
    const container = document.getElementById('extraActivitiesContainer');
    if (!container) return;

    container.innerHTML = '';

    activities.forEach((activity, index) => {
        const activityDiv = document.createElement('div');
        activityDiv.className = 'extra-activity-item';
        activityDiv.innerHTML = `
        <div class="activity-row">
        <input type="checkbox" ${activity.enabled ? 'checked' : ''}
        onchange="toggleExtraActivity(${index}, this.checked)">
        <input type="text" value="${sanitize(activity.name)}"
        onchange="updateExtraActivity(${index}, 'name', this.value)"
        placeholder="Nume activitate">
        <input type="number" value="${activity.rate}"
        onchange="updateExtraActivity(${index}, 'rate', this.value)"
        placeholder="Cost">
        <input type="color" value="${activity.color || '#9b59b6'}"
        onchange="updateExtraActivity(${index}, 'color', this.value)">
        <button onclick="removeExtraActivity(${index})" class="btn-danger">🗑️</button>
        </div>
        `;
        container.appendChild(activityDiv);
    });
};

const toggleExtraActivity = (index, enabled) => {
    const data = loadData();
    const childId = selectedChildIdForModal;
    if (data.children[childId] && data.children[childId].extraActivities[index]) {
        data.children[childId].extraActivities[index].enabled = enabled;
        saveData(data);
    }
};

const updateExtraActivity = (index, field, value) => {
    const data = loadData();
    const childId = selectedChildIdForModal;
    if (data.children[childId] && data.children[childId].extraActivities[index]) {
        data.children[childId].extraActivities[index][field] = value;
        saveData(data);
    }
};

const removeExtraActivity = (index) => {
    if (confirm('Sigur vrei să ștergi această activitate?')) {
        const data = loadData();
        const childId = selectedChildIdForModal;
        if (data.children[childId]) {
            data.children[childId].extraActivities.splice(index, 1);
            saveData(data);
            renderExtraActivities(data.children[childId].extraActivities);
            NotificationManager.show('Activitate ștearsă!', 'success');
        }
    }
};

const addNewExtraActivity = () => {
    const data = loadData();
    const childId = selectedChildIdForModal;
    if (data.children[childId]) {
        const newActivity = {
            name: 'Activitate Nouă',
            rate: 20,
            color: getRandomColor(),
            enabled: true
        };
        data.children[childId].extraActivities.push(newActivity);
        saveData(data);
        renderExtraActivities(data.children[childId].extraActivities);
    }
};

const saveChildSettings = () => {
    const data = loadData();
    const childId = selectedChildIdForModal;
    if (!data.children[childId]) return;

    const editChildName = document.getElementById('editChildName');
    const editInstitution = document.getElementById('editInstitution');
    const editStartDate = document.getElementById('editStartDate');
    const editDefaultRate = document.getElementById('editDefaultRate');
    const editChildColor = document.getElementById('editChildColor');

    if (!editChildName) return;

    const newName = editChildName.value.trim();
    if (!newName) {
        NotificationManager.show('Numele copilului este obligatoriu', 'error');
        return;
    }

    const newRate = parseFloat(editDefaultRate?.value) || 15;

    data.children[childId].name = sanitize(newName);
    if (editInstitution) data.children[childId].institution = editInstitution.value;
    if (editStartDate) data.children[childId].startDate = editStartDate.value;
    data.children[childId].defaultRate = newRate;
    if (editChildColor) data.children[childId].color = editChildColor.value;

    const key = `${year}-${month}`;
    if (!data[key]) {
        data[key] = { days: {}, daysExtra: {}, rates: {}, payments: {}, holidays: [] };
    }
    if (!data[key].rates) data[key].rates = {};
    data[key].rates[childId] = newRate;

    saveData(data);
    renderCalendar();
    closeModal('settingsModal');
    NotificationManager.show('Setări salvate cu succes!', 'success');
};

const deleteChild = () => {
    const childName = loadData().children[selectedChildIdForModal]?.name || 'acest copil';
    if (confirm(`Sigur vrei să ștergi copilul "${childName}" și toate datele aferente?`)) {
        const data = loadData();
        const id = selectedChildIdForModal;
        delete data.children[id];

        Object.keys(data).forEach(key => {
            if (key !== 'children') {
                if (data[key].days) delete data[key].days[id];
                if (data[key].daysExtra) delete data[key].daysExtra[id];
                if (data[key].rates) delete data[key].rates[id];
                if (data[key].payments) delete data[key].payments[id];
            }
        });

        saveData(data);
        renderCalendar();
        closeModal('settingsModal');
        NotificationManager.show('Copil șters cu succes!', 'success');
    }
};

/* ================== RAPOARTE COPII ================== */
const renderChildrenReports = () => {
    const container = document.getElementById('childrenReports');
    if (!container) return;

    container.innerHTML = '';
    const data = loadData();
    const key = `${year}-${month}`;

    if (!data[key]) {
        data[key] = { days: {}, daysExtra: {}, rates: {}, payments: {}, holidays: [], freeDays: {} };
        saveData(data);
    }

    for (const id of Object.keys(data.children || {})) {
        const child = data.children[id];
        const rateKindergarten = data[key].rates?.[id] ?? child.defaultRate;

        // Inițializează datele pentru luna curentă
        if (!data[key].days) data[key].days = {};
        if (!data[key].days[id]) data[key].days[id] = [];
        if (!data[key].daysExtra) data[key].daysExtra = {};
        if (!data[key].daysExtra[id]) data[key].daysExtra[id] = [];
        if (!data[key].rates) data[key].rates = {};
        if (!data[key].rates[id]) data[key].rates[id] = rateKindergarten;
        if (!data[key].payments) data[key].payments = {};
        if (!data[key].payments[id]) data[key].payments[id] = [];
        if (!data[key].freeDays) data[key].freeDays = {};
        saveData(data);

        const previousMonthBalance = getHistoricalBalance(year, month, id, data);

        let kindergartenDays = 0;
        let freeDaysCount = 0;

        if (data[key].days && data[key].days[id]) {
            kindergartenDays = data[key].days[id].filter(day => {
                const isFreeDay = data[key].freeDays && data[key].freeDays[day] && data[key].freeDays[day].includes(id);
                if (isFreeDay) freeDaysCount++;
                return !isFreeDay;
            }).length;
        }

        const totalKindergarten = kindergartenDays * rateKindergarten;

        let totalExtra = 0;
        let extraDetails = '';
        const activities = child.extraActivities || [];

        activities.forEach((activity, index) => {
            if (activity.enabled) {
                let activityDays = 0;
                if (data[key].daysExtra && data[key].daysExtra[id] && data[key].daysExtra[id][index]) {
                    activityDays = data[key].daysExtra[id][index].filter(day => {
                        return !(data[key].freeDays && data[key].freeDays[day] && data[key].freeDays[day].includes(id));
                    }).length;
                }
                const activityCost = activityDays * activity.rate;
                totalExtra += activityCost;
                if (activityDays > 0) {
                    extraDetails += `
                    <div style="margin-left: 15px; font-size: 0.9em; margin-top: 4px;">
                    <strong>${sanitize(activity.name)}:</strong> ${activityDays} zile × ${activity.rate} lei = ${activityCost.toFixed(2)} lei
                    </div>
                    `;
                }
            }
        });

        const totalCalculatedCurrentMonth = totalKindergarten + totalExtra;

        const totalPaidKindergartenCurrentMonth = (data[key].payments && data[key].payments[id] ? data[key].payments[id].filter(p => p.type === 'kindergarten') : []).reduce((sum, p) => sum + parseFloat(p.amount), 0);
        const totalPaidExtraCurrentMonth = (data[key].payments && data[key].payments[id] ? data[key].payments[id].filter(p => p.type === 'extra') : []).reduce((sum, p) => sum + parseFloat(p.amount), 0);
        const totalPaidCurrentMonth = totalPaidKindergartenCurrentMonth + totalPaidExtraCurrentMonth;

        const estimatedMonthlyKindergartenCost = getEstimatedMonthlyKindergartenCost(year, month, id, data);
        const targetKindergartenPaymentAmount = estimatedMonthlyKindergartenCost - previousMonthBalance;
        const recommendedKindergartenPayment = Math.max(0, targetKindergartenPaymentAmount);
        const finalBalance = (totalPaidCurrentMonth + previousMonthBalance) - totalCalculatedCurrentMonth;

        const div = document.createElement('div');
        div.className = 'child-report';
        div.innerHTML = `
        <h3>
        <span>${sanitize(child.name)}</span>
        <span style="font-size: 0.8em; color: #7f8c8d;">${child.institution} (din ${new Date(child.startDate).toLocaleDateString('ro-RO')})</span>
        <button onclick="showSettingsModal('${id}')">⚙️</button>
        </h3>
        <div style="font-weight: bold; color: ${previousMonthBalance >= 0 ? '#2ecc71' : '#e74c3c'}; border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 12px;">
        Sold Reportat Cumulativ (la începutul lunii): ${previousMonthBalance.toFixed(2)} lei
        </div>
        ${freeDaysCount > 0 ? `
            <div style="background: #e8f4fd; padding: 8px; border-radius: 6px; margin-bottom: 10px; border-left: 4px solid #3498db;">
            <strong>📅 Zile fără plată (absente/vacanță):</strong> ${freeDaysCount} zile
            </div>
            ` : ''}
            <div style="margin-top: 10px;">
            <strong>Estimare Cost ${child.institution} (Total zile lucrătoare):</strong> ${estimatedMonthlyKindergartenCost.toFixed(2)} lei
            </div>
            <div style="font-weight: bold; font-size: 1.2em; color: #3498db; margin-top: 8px; border-top: 1px solid #ddd; padding-top: 8px;">
            SUMA DE PLATĂ RECOMANDATĂ (Până pe 15): ${recommendedKindergartenPayment.toFixed(2)} lei
            </div>
            <hr style="border: 0; border-top: 5px dotted #eee; margin: 15px 0;" />
            <div>
            <strong>Cost Real ${child.institution} (Prezență):</strong> ${kindergartenDays} zile × ${rateKindergarten} lei = ${totalKindergarten.toFixed(2)} lei
            </div>
            ${extraDetails ? `<div style="margin-top: 8px;"><strong>Activități suplimentare:</strong>${extraDetails}</div>` : ''}
            <div style="border-top: 1px solid #eee; margin-top: 8px; padding-top: 8px;">
            <strong>TOTAL COST REAL (Calculat):</strong> ${totalCalculatedCurrentMonth.toFixed(2)} lei
            </div>
            <div style="margin-top: 12px;">
            <div style="margin-bottom: 4px;"><strong>Total Plătit ${child.institution} (luna curentă):</strong> ${totalPaidKindergartenCurrentMonth.toFixed(2)} lei</div>
            <div><strong>Total Plătit Activități Suplimentare (luna curentă):</strong> ${totalPaidExtraCurrentMonth.toFixed(2)} lei</div>
            </div>
            <div style="font-weight: bold; font-size: 1.2em; color: ${finalBalance >= 0 ? '#2ecc71' : '#e74c3c'}; border-top: 1px solid #ddd; margin-top: 12px; padding-top: 12px;">
            BALANȚA FINALĂ CUMULATIVĂ (de Reportat): ${finalBalance.toFixed(2)} lei
            </div>
            <button style="width: 100%; margin-top: 10px; background: #2ecc71;" onclick="showPaymentsModal('${id}')">Vezi/Adaugă Plăți</button>
            `;
            container.appendChild(div);
    }
};

const getEstimatedMonthlyKindergartenCost = (y, m, childId, data) => {
    const child = data.children[childId];
    if (!child) return 0;

    const key = `${y}-${m}`;
    const rateKindergarten = data[key]?.rates?.[childId] ?? child.defaultRate;
    const daysInMonth = new Date(y, parseInt(m) + 1, 0).getDate();
    let workingDays = 0;

    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(y, parseInt(m), d);
        const dayOfWeek = date.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            const isFreeDay = data[key].freeDays &&
            data[key].freeDays[d] &&
            data[key].freeDays[d].includes(childId);

            const isFreeDayForAll = data[key].freeDays &&
            data[key].freeDays[d] &&
            data[key].freeDays[d].length === Object.keys(data.children || {}).length;

            if (!isFreeDay && !isFreeDayForAll) {
                workingDays++;
            }
        }
    }

    return workingDays * rateKindergarten;
};

/* ================== GESTIUNE PLĂȚI ================== */
const showPaymentsModal = (childId) => {
    selectedChildIdForModal = childId;
    const data = loadData();
    const key = `${year}-${month}`;
    const childName = data.children[childId]?.name || 'Necunoscut';
    const monthName = new Date(year, month).toLocaleString('ro-RO', { month: 'long' });

    const paymentsChildName = document.getElementById('paymentsChildName');
    const paymentsMonth = document.getElementById('paymentsMonth');
    const newPaymentDate = document.getElementById('newPaymentDate');
    const newPaymentAmount = document.getElementById('newPaymentAmount');

    if (paymentsChildName) paymentsChildName.textContent = sanitize(childName);
    if (paymentsMonth) paymentsMonth.textContent = monthName;
    if (newPaymentDate) newPaymentDate.value = new Date().toISOString().split('T')[0];
    if (newPaymentAmount) newPaymentAmount.value = '';

    renderPaymentList();
    openModal('paymentsModal');
};

const renderPaymentList = () => {
    const data = loadData();
    const key = `${year}-${month}`;
    const childId = selectedChildIdForModal;
    const paymentList = document.getElementById('paymentList');
    const paymentsTotal = document.getElementById('paymentsTotal');

    if (!paymentList) return;

    paymentList.innerHTML = '';

    if (!data[key].payments || !data[key].payments[childId]) {
        data[key].payments = data[key].payments || {};
        data[key].payments[childId] = [];
    }

    let totalPaid = 0;
    data[key].payments[childId].sort((a,b) => new Date(a.date) - new Date(b.date));

    data[key].payments[childId].forEach((payment, index) => {
        totalPaid += parseFloat(payment.amount);
        const paymentTypeLabel = payment.type === 'kindergarten' ?
        (data.children[childId]?.institution || 'Grădiniță') : 'Activitate Suplimentară';

        const li = document.createElement('li');
        li.innerHTML = `
        <span>${payment.date} - ${parseFloat(payment.amount).toFixed(2)} lei (${sanitize(paymentTypeLabel)})</span>
        <button onclick="deletePayment(${index})">&times;</button>
        `;
        paymentList.appendChild(li);
    });

    if (paymentsTotal) {
        paymentsTotal.textContent = totalPaid.toFixed(2);
    }
};

const addPayment = () => {
    const data = loadData();
    const key = `${year}-${month}`;
    const childId = selectedChildIdForModal;

    const newPaymentAmount = document.getElementById('newPaymentAmount');
    const newPaymentDate = document.getElementById('newPaymentDate');
    const newPaymentType = document.getElementById('newPaymentType');
    const newPaymentColor = document.getElementById('newPaymentColor');

    if (!newPaymentAmount || !newPaymentDate || !newPaymentType) return;

    const amount = parseFloat(newPaymentAmount.value);
    const dateStr = newPaymentDate.value;
    const type = newPaymentType.value;

    if (isNaN(amount) || amount <= 0) {
        NotificationManager.show('Suma trebuie să fie pozitivă', 'error');
        return;
    }

    if (!dateStr) {
        NotificationManager.show('Selectează o dată', 'error');
        return;
    }

    const date = new Date(dateStr);
    const day = date.getDate();

    if (!data[key].payments) data[key].payments = {};
    if (!data[key].payments[childId]) {
        data[key].payments[childId] = [];
    }

    const paymentColor = newPaymentColor ? newPaymentColor.value : '#2ecc71';
    data[key].payments[childId].push({
        amount: amount,
        date: dateStr,
        type: type,
        color: paymentColor
    });

    if (!data[key].paymentsOnDay) data[key].paymentsOnDay = {};
    if (!data[key].paymentsOnDay[day]) data[key].paymentsOnDay[day] = [];
    data[key].paymentsOnDay[day].push({
        childId: childId,
        amount: amount,
        color: paymentColor
    });

    saveData(data);
    newPaymentAmount.value = '';
    renderPaymentList();
    renderChildrenReports();
    renderCalendar();

    NotificationManager.show(`Plată adăugată: ${amount} lei`, 'success');
};

const deletePayment = (index) => {
    const data = loadData();
    const key = `${year}-${month}`;
    const childId = selectedChildIdForModal;

    if (confirm('Ești sigur că vrei să ștergi această plată?')) {
        const paymentToDelete = data[key].payments[childId][index];
        const date = new Date(paymentToDelete.date);
        const day = date.getDate();

        data[key].payments[childId].splice(index, 1);

        if (data[key].paymentsOnDay && data[key].paymentsOnDay[day]) {
            data[key].paymentsOnDay[day] = data[key].paymentsOnDay[day].filter(p =>
            !(p.childId === childId && p.amount === paymentToDelete.amount && p.color === paymentToDelete.color)
            );
            if (data[key].paymentsOnDay[day].length === 0) {
                delete data[key].paymentsOnDay[day];
            }
        }

        saveData(data);
        renderPaymentList();
        renderChildrenReports();
        renderCalendar();
        NotificationManager.show('Plată ștearsă', 'success');
    }
};

/* ================== FUNCȚII CONTABILE ================== */
const getHistoricalBalance = (currentYear, currentMonth, childId, data) => {
    let cumulativeCost = 0;
    let cumulativePaid = 0;

    const allKeys = Object.keys(data).filter(k => k !== 'children');

    allKeys.sort((a, b) => {
        const [aY, aM] = a.split('-').map(Number);
        const [bY, bM] = b.split('-').map(Number);
        if (aY !== bY) return aY - bY;
        return aM - bM;
    });

    for (const key of allKeys) {
        const [y, m] = key.split('-').map(Number);

        if (y > currentYear || (y === currentYear && m >= currentMonth)) {
            break;
        }

        const monthData = data[key];
        const childData = data.children[childId];
        if (!childData) continue;

        const rateKindergarten = monthData.rates?.[childId] ?? childData.defaultRate;
        const kindergartenDays = (monthData.days?.[childId] || []).length;
        const totalKindergarten = kindergartenDays * rateKindergarten;

        let totalExtra = 0;
        const activities = childData.extraActivities || [];
        activities.forEach((activity, index) => {
            if (activity.enabled) {
                const activityDays = (monthData.daysExtra && monthData.daysExtra[childId] && monthData.daysExtra[childId][index]) ?
                monthData.daysExtra[childId][index].length : 0;
                totalExtra += activityDays * activity.rate;
            }
        });

        const totalCalculated = totalKindergarten + totalExtra;
        cumulativeCost += totalCalculated;

        const totalPaid = (monthData.payments?.[childId] || []).reduce((sum, p) => sum + parseFloat(p.amount), 0);
        cumulativePaid += totalPaid;
    }

    return cumulativePaid - cumulativeCost;
};

/* ================== BUTOANE NOI ================== */
const shareApp = () => {
    if (navigator.share) {
        navigator.share({
            title: 'Gradinita & Cresa App',
            text: 'Aplicație pentru gestionarea prezenței și plăților copiilor la grădiniță și creșă',
            url: window.location.href
        })
        .then(() => NotificationManager.show('Aplicație distribuită!', 'success'))
        .catch(() => NotificationManager.show('Distribuire anulată', 'info'));
    } else {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
        .then(() => NotificationManager.show('Link copiat în clipboard!', 'success'))
        .catch(() => {
            prompt('Copiază acest link pentru a distribui aplicația:', url);
        });
    }
};

const showDonationModal = () => {
    openModal('donationModal');
};

const openDonationLink = (platform) => {
    const links = {
        'buymeacoffee': 'https://buymeacoffee.com/aswy',
        'IBAM': 'https://RO31INGB0000999901856836'
    };

    window.open(links[platform], '_blank');
    NotificationManager.show('Mulțumim pentru sprijin! ❤️', 'success');
    closeModal('donationModal');
};

/* ================== BACKUP MANAGER ================== */
const showBackupManager = () => {
    const backups = JSON.parse(localStorage.getItem('autoBackups') || '[]');
    let backupHTML = '<h3 style="margin-top: 0; color: #2c3e50;">📦 Backup-uri Automate</h3>';

    if (backups.length === 0) {
        backupHTML += '<p style="text-align: center; color: #7f8c8d; padding: 20px;">Nu există backup-uri automate încă.</p>';
    } else {
        backupHTML += '<div style="max-height: 200px; overflow-y: auto; border: 1px solid #e9ecef; border-radius: 8px;">';

        backups.reverse().forEach((backup, index) => {
            const date = new Date(backup.timestamp);
            const dateStr = date.toLocaleDateString('ro-RO');
            const timeStr = date.toLocaleTimeString('ro-RO');

            backupHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #e9ecef; background: white;">
            <div style="flex: 1;">
            <div style="font-weight: bold; color: #2c3e50;">${dateStr}</div>
            <div style="font-size: 12px; color: #7f8c8d;">${timeStr}</div>
            </div>
            <button onclick="restoreBackup('${backup.timestamp}')"
            style="background: #3498db; color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">
            Restaurează
            </button>
            </div>
            `;
        });
        backupHTML += '</div>';
    }

    const modal = document.getElementById('backupManagerModal');
    if (modal) {
        modal.querySelector('.modal-content').innerHTML = `
        <span class="modal-close" onclick="closeModal('backupManagerModal')">&times;</span>
        ${backupHTML}
        <div style="display: flex; gap: 10px; margin-top: 15px;">
        <button onclick="closeModal('backupManagerModal')" style="flex: 1; padding: 10px; background: #95a5a6; color: white; border: none; border-radius: 6px; cursor: pointer;">
        Închide
        </button>
        </div>
        `;
    }

    openModal('backupManagerModal');
};

const restoreBackup = (timestamp) => {
    const backups = JSON.parse(localStorage.getItem('autoBackups') || '[]');
    const backup = backups.find(b => b.timestamp === timestamp);
    if (backup) {
        if (confirm('Sigur doriți să restaurați acest backup? Toate datele curente vor fi înlocuite.')) {
            saveData(backup.data);
            renderCalendar();
            NotificationManager.show('Backup restaurat cu succes!', 'success');
            closeModal('backupManagerModal');
        }
    }
};

/* ================== EXPORT/IMPORT ================== */
const cleanDataForExport = (data) => {
    const cleanData = JSON.parse(JSON.stringify(data));
    delete cleanData._version;
    delete cleanData._timestamp;
    return cleanData;
};

const exportJSON = () => {
    const data = loadData();
    const exportData = cleanDataForExport(data);

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `gradinita_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    NotificationManager.show('Export JSON realizat!', 'success');
};

const importJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedData = JSON.parse(e.target.result);
            const currentData = loadData();

            if (!importedData.children) {
                NotificationManager.show('Fișier invalid: lipsește secțiunea children!', 'error');
                return;
            }

            const mergedData = {
                children: { ...currentData.children, ...importedData.children },
                ...currentData
            };

            Object.keys(importedData).forEach(key => {
                if (key !== 'children') {
                    mergedData[key] = { ...(currentData[key] || {}), ...importedData[key] };
                }
            });

            saveData(mergedData);
            NotificationManager.show('Import finalizat cu succes!', 'success');
            renderCalendar();

        } catch (err) {
            console.error('Eroare import:', err);
            NotificationManager.show('Fișier JSON invalid!', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
};

const exportExcel = () => {
    try {
        const data = loadData();
        const rows = [];

        for(const key of Object.keys(data)) {
            if(key === 'children') continue;
            const [y, m] = key.split('-').map(v => parseInt(v));
            const monthName = new Date(y, m).toLocaleString('ro-RO', { month: 'long' });

            for(const childId of Object.keys(data.children || {})) {
                const monthData = data[key];
                const childData = data.children[childId];
                const kindergartenRate = monthData.rates?.[childId] ?? childData.defaultRate;
                const kindergartenDays = (monthData.days?.[childId] || []).length;
                const totalKindergarten = kindergartenDays * kindergartenRate;

                let totalExtra = 0;
                const activities = childData.extraActivities || [];
                activities.forEach((activity, index) => {
                    if (activity.enabled) {
                        const activityDays = (monthData.daysExtra && monthData.daysExtra[childId] && monthData.daysExtra[childId][index]) ?
                        monthData.daysExtra[childId][index].length : 0;
                        totalExtra += activityDays * activity.rate;
                    }
                });

                const totalPaidKindergarten = (monthData.payments?.[childId] || []).filter(p => p.type === 'kindergarten').reduce((sum, p) => sum + parseFloat(p.amount), 0);
                const totalPaidExtra = (monthData.payments?.[childId] || []).filter(p => p.type === 'extra').reduce((sum, p) => sum + parseFloat(p.amount), 0);
                const previousMonthBalance = getHistoricalBalance(y, m, childId, data);
                const finalBalance = ((totalPaidKindergarten + totalPaidExtra) + previousMonthBalance) - (totalKindergarten + totalExtra);

                rows.push({
                    An: y,
                    Luna: monthName,
                    Copil: childData.name,
                    Instituție: childData.institution || 'Grădiniță',
                    "Zile Grădiniță": kindergartenDays,
                    "Total Grădiniță (lei)": totalKindergarten.toFixed(2),
                          "Plătit Grădiniță (lei)": totalPaidKindergarten.toFixed(2),
                          "Total Activități (lei)": totalExtra.toFixed(2),
                          "Plătit Activități (lei)": totalPaidExtra.toFixed(2),
                          "Sold Reportat Cumulativ (lei)": previousMonthBalance.toFixed(2),
                          "Balanță Finală Cumulativă (lei)": finalBalance.toFixed(2)
                });
            }
        }

        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Prezențe');
        XLSX.writeFile(wb, 'gradinita_export.xlsx');
        NotificationManager.show('Export Excel realizat!', 'success');
    } catch (error) {
        console.error('Eroare export Excel:', error);
        NotificationManager.show('Eroare la exportul Excel!', 'error');
    }
};

const exportPDF = () => {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('l', 'pt', 'a4');
        const head = [
            ['An', 'Lună', 'Copil', 'Instituție', 'Cost Grăd.', 'Plătit Grăd.', 'Cost Act.', 'Plătit Act.', 'Sold Reportat', 'Balanță Finală']
        ];
        const rows = [];
        const data = loadData();

        for (const key of Object.keys(data)) {
            if (key === 'children') continue;
            const [y, m] = key.split('-').map(v => parseInt(v));
            const monthName = new Date(y, m).toLocaleString('ro-RO', { month: 'long' });

            for (const childId of Object.keys(data.children || {})) {
                const childData = data.children[childId];
                const monthData = data[key];
                const rateKindergarten = monthData.rates?.[childId] ?? (childData.defaultRate || 0);
                const kindergartenDays = (monthData.days?.[childId] || []).length;
                const totalKindergarten = kindergartenDays * rateKindergarten;

                let totalExtra = 0;
                const activities = childData.extraActivities || [];
                activities.forEach((activity, index) => {
                    if (activity.enabled) {
                        const activityDays = (monthData.daysExtra && monthData.daysExtra[childId] && monthData.daysExtra[childId][index]) ?
                        monthData.daysExtra[childId][index].length : 0;
                        totalExtra += activityDays * activity.rate;
                    }
                });

                const totalPaidKindergarten = (monthData.payments?.[childId] || []).filter(p => p.type === 'kindergarten').reduce((sum, p) => sum + parseFloat(p.amount), 0);
                const totalPaidExtra = (monthData.payments?.[childId] || []).filter(p => p.type === 'extra').reduce((sum, p) => sum + parseFloat(p.amount), 0);
                const previousMonthBalance = getHistoricalBalance(y, m, childId, data);
                const finalBalance = ((totalPaidKindergarten+totalPaidExtra) + previousMonthBalance) - (totalKindergarten + totalExtra);

                rows.push([
                    y, monthName, childData.name, childData.institution || 'Grădiniță',
                    totalKindergarten.toFixed(2), totalPaidKindergarten.toFixed(2),
                          totalExtra.toFixed(2), totalPaidExtra.toFixed(2),
                          previousMonthBalance.toFixed(2), finalBalance.toFixed(2)
                ]);
            }
        }

        doc.autoTable({
            head: head,
            body: rows,
            startY: 40,
            styles: { fontSize: 7 },
            headStyles: { fillColor: [52, 152, 219], textColor: 255 },
            theme: 'grid'
        });
        doc.save('gradinita_export.pdf');
        NotificationManager.show('Export PDF realizat!', 'success');
    } catch (error) {
        console.error('Eroare export PDF:', error);
        NotificationManager.show('Eroare la exportul PDF!', 'error');
    }
};

/* ================== FUNCȚII UTILITARE ================== */
const resetData = () => {
    if (!confirm('Sigur vrei să ștergi toate datele stocate local? Această acțiune nu se poate anula.')) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('gradinitaWelcomeShown');
    localStorage.removeItem('autoBackups');
    NotificationManager.show('Date resetate cu succes!', 'success');
    setTimeout(() => window.location.reload(), 1000);
};

const changeMonth = (offset) => {
    month += offset;
    if (month < 0) { month = 11; year -= 1; }
    if (month > 11) { month = 0; year += 1; }
    today = new Date(year, month, 1);

    const yearSelect = document.getElementById('yearSelectNav');
    const monthSelect = document.getElementById('monthSelectNav');
    if (yearSelect) yearSelect.value = year;
    if (monthSelect) monthSelect.value = month;

    renderCalendar();
};

const changeMonthToSelected = () => {
    const monthSelect = document.getElementById('monthSelectNav');
    const yearSelect = document.getElementById('yearSelectNav');

    if (monthSelect && yearSelect) {
        month = parseInt(monthSelect.value);
        year = parseInt(yearSelect.value);
        renderCalendar();
    }
};

const renderLegend = () => {
    const data = loadData();
    const legend = document.getElementById('legend');
    if (!legend) return;

    legend.innerHTML = '';

    if (!data.children) data.children = {};

    for (const childId of Object.keys(data.children)) {
        const child = data.children[childId];

        const itemKindergarten = document.createElement('div');
        itemKindergarten.className = 'legend-item';
        itemKindergarten.innerHTML = `<div class="color-box" style="background:${child.color}"></div><div>${sanitize(child.name)} - ${child.institution}</div>`;
        legend.appendChild(itemKindergarten);

        const activities = child.extraActivities || [];
        activities.forEach((activity, index) => {
            if (activity.enabled) {
                const itemExtra = document.createElement('div');
                itemExtra.className = 'legend-item';
                itemExtra.innerHTML = `<div class="color-box" style="background:${activity.color || '#9b59b6'}"></div><div>${sanitize(child.name)} - ${sanitize(activity.name)}</div>`;
                legend.appendChild(itemExtra);
            }
        });
    }

    const itemPayment = document.createElement('div');
    itemPayment.className = 'legend-item';
    itemPayment.innerHTML = `<div class="color-box" style="background:#2ecc71"></div><div>Indicator Plată</div>`;
    legend.appendChild(itemPayment);
};

/* ================== RAPORT GENERAL ================== */
const showGeneralReportModal = () => {
    const reportYearSelect = document.getElementById('reportYearSelect');
    if (!reportYearSelect) return;

    reportYearSelect.innerHTML = '';
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        reportYearSelect.appendChild(option);
    }
    reportYearSelect.value = currentYear;
    openModal('generalReportModal');
    generateGeneralReport();
};

const generateGeneralReport = () => {
    const container = document.getElementById('generalReportContainer');
    if (!container) return;

    container.innerHTML = '<h4>Se generează raportul...</h4>';

    const selectedYear = parseInt(document.getElementById('reportYearSelect').value);
    const monthSelect = document.getElementById('reportMonthSelect');
    let selectedMonths = Array.from(monthSelect.options)
    .filter(option => option.selected)
    .map(option => option.value);
    const data = loadData();
    let monthsToReport = [];

    if (selectedMonths.includes('-1')) {
        for (let m = 0; m < 12; m++) monthsToReport.push(`${selectedYear}-${m}`);
    } else {
        monthsToReport = selectedMonths.map(m => `${selectedYear}-${parseInt(m)}`);
    }

    monthsToReport.sort((a, b) => {
        const [aY, aM] = a.split('-').map(Number);
        const [bY, bM] = b.split('-').map(Number);
        if (aY !== bY) return aY - bY;
        return aM - bM;
    });

    let reportHTML = `<table id="generalReportTable"><thead><tr>
    <th>An</th><th>Lună</th><th>Copil</th><th>Instituție</th>
    <th>Cost Grăd. (lei)</th><th>Plătit Grăd. (lei)</th>
    <th>Cost Act. (lei)</th><th>Plătit Act. (lei)</th>
    <th>Sold Reportat (lei)</th><th>Balanță Finală (lei)</th>
    </tr></thead><tbody>`;

    for (const key of monthsToReport) {
        if (!data[key]) continue;
        const [y, m] = key.split('-').map(v => parseInt(v));
        const monthName = new Date(y, m).toLocaleString('ro-RO', { month: 'long' });

        for (const childId of Object.keys(data.children || {})) {
            const childData = data.children[childId];
            const monthData = data[key];
            const rateKindergarten = monthData.rates?.[childId] ?? (childData.defaultRate || 0);
            const kindergartenDays = (monthData.days?.[childId] || []).length;
            const totalKindergarten = kindergartenDays * rateKindergarten;

            let totalExtra = 0;
            const activities = childData.extraActivities || [];
            activities.forEach((activity, index) => {
                if (activity.enabled) {
                    const activityDays = (monthData.daysExtra && monthData.daysExtra[childId] && monthData.daysExtra[childId][index]) ?
                    monthData.daysExtra[childId][index].length : 0;
                    totalExtra += activityDays * activity.rate;
                }
            });

            const totalPaidKindergarten = (monthData.payments?.[childId] || []).filter(p => p.type === 'kindergarten').reduce((sum, p) => sum + parseFloat(p.amount), 0);
            const totalPaidExtra = (monthData.payments?.[childId] || []).filter(p => p.type === 'extra').reduce((sum, p) => sum + parseFloat(p.amount), 0);
            const previousMonthBalance = getHistoricalBalance(y, m, childId, data);
            const finalBalance = ((totalPaidKindergarten+totalPaidExtra) + previousMonthBalance) - (totalKindergarten + totalExtra);

            reportHTML += `
            <tr>
            <td>${y}</td>
            <td>${monthName}</td>
            <td>${sanitize(childData.name)}</td>
            <td>${childData.institution || 'Grădiniță'}</td>
            <td>${totalKindergarten.toFixed(2)}</td>
            <td>${totalPaidKindergarten.toFixed(2)}</td>
            <td>${totalExtra.toFixed(2)}</td>
            <td>${totalPaidExtra.toFixed(2)}</td>
            <td style="color: ${previousMonthBalance >= 0 ? '#2ecc71' : '#e74c3c'}; font-weight: bold;">${previousMonthBalance.toFixed(2)}</td>
            <td style="color: ${finalBalance >= 0 ? '#2ecc71' : '#e74c3c'}; font-weight: bold;">${finalBalance.toFixed(2)}</td>
            </tr>
            `;
        }
    }
    reportHTML += '</tbody></table>';
    container.innerHTML = reportHTML;
};

/* ================== WELCOME MODAL ================== */
function showWelcomeModal() {
    if (!localStorage.getItem('gradinitaWelcomeShown')) {
        openModal('welcomeModal');
    }
}

function closeWelcomeModal() {
    localStorage.setItem('gradinitaWelcomeShown', 'true');
    closeModal('welcomeModal');
}

/* ================== PWA SERVICE WORKER ================== */
if ('serviceWorker' in navigator) {
    let refreshing = false;

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('ServiceWorker registered successfully');
            const updateMessage = document.getElementById('update-message');
            if (updateMessage) updateMessage.style.display = 'none';

            const reloadButton = document.getElementById('reload-button');
            if (reloadButton) {
                reloadButton.addEventListener('click', () => {
                    if (registration.waiting) {
                        registration.waiting.postMessage({ action: 'skipWaiting' });
                    }
                });
            }

            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log('New content is available; please refresh.');
                        const updateMessage = document.getElementById('update-message');
                        if (updateMessage) updateMessage.style.display = 'block';
                    }
                });
            });
        })
        .catch(error => {
            console.log('ServiceWorker registration failed: ', error);
            const updateMessage = document.getElementById('update-message');
            if (updateMessage) updateMessage.style.display = 'none';
        });

            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (!refreshing) {
                    refreshing = true;
                    const updateMessage = document.getElementById('update-message');
                    if (updateMessage) updateMessage.style.display = 'none';
                    window.location.reload();
                }
            });
    });
} else {
    const updateMessage = document.getElementById('update-message');
    if (updateMessage) updateMessage.style.display = 'none';
}

/* ================== AUTO BACKUP ================== */
const setupAutoBackup = () => {
    setInterval(() => {
        try {
            const data = loadData();
            const timestamp = new Date().toISOString();
            const backups = JSON.parse(localStorage.getItem('autoBackups') || '[]');

            backups.push({
                timestamp,
                data: JSON.parse(JSON.stringify(data))
            });

            while (backups.length > 3) backups.shift();

            localStorage.setItem('autoBackups', JSON.stringify(backups));
        } catch (error) {
            console.error('Eroare backup automat:', error);
        }
    }, 30 * 60 * 1000);
};

/* ================== INIȚIALIZARE ================== */
(function init() {
    console.log('Aplicația se încarcă...');

    const data = loadData();
    if (!data.children || Object.keys(data.children).length === 0) {
        data.children = {};
        const id1 = 'c1';
        const id2 = 'c2';
        data.children[id1] = {
            name: 'Casian',
            institution: 'Grădiniță',
            startDate: new Date().toISOString().split('T')[0],
 defaultRate: 15,
     color: '#4da6ff',
     extraActivities: [
         { name: 'Engleză', rate: 20, color: '#9b59b6', enabled: true }
     ]
        };
        data.children[id2] = {
            name: 'Ezra',
            institution: 'Grădiniță',
            startDate: new Date().toISOString().split('T')[0],
 defaultRate: 15,
     color: '#ffd633',
     extraActivities: [
         { name: 'Engleză', rate: 20, color: '#ff6f61', enabled: true }
     ]
        };
        saveData(data);
    }

    // Actualizează controalele de navigare
    const yearSelect = document.getElementById('yearSelectNav');
    const monthSelect = document.getElementById('monthSelectNav');
    if (yearSelect) yearSelect.value = year;
    if (monthSelect) monthSelect.value = month;

    setupAutoBackup();
    renderCalendar();
    showWelcomeModal();

    setTimeout(() => {
        NotificationManager.show('Aplicația a fost încărcată cu succes!', 'success', 2000);
    }, 500);
})();
