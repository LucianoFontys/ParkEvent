// Global variables
let currentDate = new Date();
let selectedDateForEvent = null;
let events = {};
let assignedEmployees = [];

// Event types with emojis for better visual appeal
const eventTypes = {
    'Pool Party': '🏊‍♀️',
    'Beach Volleyball': '🏐',
    'Kids Club': '👶',
    'Live Music': '🎵',
    'Water Aerobics': '💦',
    'BBQ Night': '🍖',
    'Dance Class': '💃',
    'Movie Night': '🎬',
    'Fitness Class': '🏋️‍♀️',
    'Craft Workshop': '🎨'
};

// Initialize the calendar
function initCalendar() {
    updateCalendarDisplay();
    setupEventListeners();
}

// Update calendar display
function updateCalendarDisplay() {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthYear = document.getElementById('monthYear');
    monthYear.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    generateCalendarGrid();
}

// Generate calendar grid
function generateCalendarGrid() {
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';

    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // Get first day of month and number of days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    // Add empty cells for days before the first day of the month
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    const daysInPrevMonth = prevMonth.getDate();

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        const dayCell = createDayCell(daysInPrevMonth - i, true);
        calendarGrid.appendChild(dayCell);
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = createDayCell(day, false);
        calendarGrid.appendChild(dayCell);
    }

    // Add empty cells for days after the last day of the month
    const totalCells = calendarGrid.children.length - 7; // Subtract day headers
    const remainingCells = 42 - totalCells; // 6 rows × 7 days = 42 cells

    for (let day = 1; day <= remainingCells; day++) {
        const dayCell = createDayCell(day, true);
        calendarGrid.appendChild(dayCell);
    }
}

// Create individual day cell
function createDayCell(day, isOtherMonth) {
    const dayCell = document.createElement('div');
    dayCell.className = 'day-cell';

    if (isOtherMonth) {
        dayCell.classList.add('other-month');
    }

    const today = new Date();
    const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    if (!isOtherMonth &&
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear()) {
        dayCell.classList.add('today');
    }

    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day;
    dayCell.appendChild(dayNumber);

    if (!isOtherMonth) {
        const dateKey = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        if (events[dateKey] && events[dateKey].length > 0) {
            const eventCount = document.createElement('div');
            eventCount.className = 'event-count';
            eventCount.textContent = events[dateKey].length;
            dayCell.appendChild(eventCount);

            // Add event indicators
            events[dateKey].slice(0, 3).forEach(() => {
                const indicator = document.createElement('div');
                indicator.className = 'event-indicator';
                dayCell.appendChild(indicator);
            });
        }

        dayCell.addEventListener('click', () => {
            if (events[dateKey] && events[dateKey].length > 0) {
                showEventModal(dateKey);
            } else {
                selectDateForEvent(dateKey);
            }
        });
    }

    return dayCell;
}

// Navigate to previous month
function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendarDisplay();
}

// Navigate to next month
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendarDisplay();
}

// Select date for adding event
function selectDateForEvent(dateKey) {
    selectedDateForEvent = dateKey;
    const selectedDateInput = document.getElementById('selectedDate');
    const date = new Date(dateKey);
    selectedDateInput.value = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Setup event listeners
function setupEventListeners() {
    // Employee selection
    document.getElementById('employeeSelect').addEventListener('change', function () {
        const employee = this.value;
        if (employee && !assignedEmployees.includes(employee)) {
            assignedEmployees.push(employee);
            updateAssignedEmployeesDisplay();
            this.value = '';
        }
    });

    // Form submission
    document.getElementById('eventForm').addEventListener('submit', function (e) {
        e.preventDefault();
        addEvent();
    });

    // Modal close on background click
    document.getElementById('eventModal').addEventListener('click', function (e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// Update assigned employees display
function updateAssignedEmployeesDisplay() {
    const container = document.getElementById('assignedEmployees');
    container.innerHTML = '';

    assignedEmployees.forEach((employee, index) => {
        const employeeTag = document.createElement('div');
        employeeTag.className = 'employee-tag';

        const employeeName = document.createElement('span');
        employeeName.textContent = employee;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-employee';
        removeBtn.textContent = '×';
        removeBtn.onclick = () => removeEmployee(index);

        employeeTag.appendChild(employeeName);
        employeeTag.appendChild(removeBtn);
        container.appendChild(employeeTag);
    });
}

// Remove employee from assignment
function removeEmployee(index) {
    assignedEmployees.splice(index, 1);
    updateAssignedEmployeesDisplay();
}

// Add new event
function addEvent() {
    if (!selectedDateForEvent) {
        alert('Please select a date first by clicking on a calendar day.');
        return;
    }

    const eventType = document.getElementById('eventType').value;
    const eventTime = document.getElementById('eventTime').value;

    if (!eventType || !eventTime) {
        alert('Please fill in all required fields.');
        return;
    }

    const newEvent = {
        id: Date.now(),
        type: eventType,
        time: eventTime,
        employees: [...assignedEmployees]
    };

    if (!events[selectedDateForEvent]) {
        events[selectedDateForEvent] = [];
    }

    events[selectedDateForEvent].push(newEvent);

    // Reset form
    document.getElementById('eventForm').reset();
    document.getElementById('selectedDate').value = '';
    assignedEmployees = [];
    updateAssignedEmployeesDisplay();
    selectedDateForEvent = null;

    // Update calendar display
    updateCalendarDisplay();

    alert('Event added successfully!');
}

// Show event modal
function showEventModal(dateKey) {
    const modal = document.getElementById('eventModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    const date = new Date(dateKey);
    modalTitle.textContent = `Events for ${date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}`;

    modalBody.innerHTML = '';

    if (events[dateKey]) {
        events[dateKey].forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';

            const eventTitle = document.createElement('div');
            eventTitle.className = 'event-title';
            eventTitle.textContent = `${eventTypes[event.type] || ''} ${event.type} - ${event.time}`;

            const eventEmployees = document.createElement('div');
            eventEmployees.className = 'event-employees';
            eventEmployees.textContent = event.employees.length > 0
                ? `Assigned to: ${event.employees.join(', ')}`
                : 'No employees assigned';

            const eventActions = document.createElement('div');
            eventActions.className = 'event-actions';

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-small';
            deleteBtn.textContent = 'Delete Event';
            deleteBtn.onclick = () => deleteEvent(dateKey, event.id);

            eventActions.appendChild(deleteBtn);

            eventItem.appendChild(eventTitle);
            eventItem.appendChild(eventEmployees);
            eventItem.appendChild(eventActions);

            modalBody.appendChild(eventItem);
        });
    }

    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('eventModal').style.display = 'none';
}

// Delete event
function deleteEvent(dateKey, eventId) {
    events[dateKey] = events[dateKey].filter(event => event.id !== eventId);

    if (events[dateKey].length === 0) {
        delete events[dateKey];
    }

    updateCalendarDisplay();
    closeModal();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', initCalendar);