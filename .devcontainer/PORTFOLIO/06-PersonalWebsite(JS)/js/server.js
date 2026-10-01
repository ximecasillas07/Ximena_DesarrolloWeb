console.log("Running the script");

/**
 * Helper function to format input date string (YYYY-MM-DD) into readable format (e.g. "Tuesday 15")
 * or fallback to original value.
 * @param {string} dateString - Date string from input[type="date"]
 * @returns {string} Formatted date
 */
function formatScheduleDate(dateString) {
  if (!dateString) return "-";
  
  const parts = dateString.split("-");
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 0-indexed month
    const day = parseInt(parts[2], 10);
    
    const dateObj = new Date(year, month, day);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[dateObj.getDay()];
    
    return `${dayName} ${day}`;
  }
  
  return dateString;
}

/**
 * Function that extracts data from the form fields and adds a new row to the schedule table.
 * @param {Event} [event] - Optional form submit event
 */
function addScheduleEntryFromForm(event) {
  if (event) {
    event.preventDefault();
  }

  // 1. Select form input elements
  const dateInput = document.getElementById("date");
  const timeStartInput = document.getElementById("time_start");
  const timeEndInput = document.getElementById("time_end");
  const activityInput = document.getElementById("activity");
  const placeInput = document.getElementById("place");
  const typeSelect = document.getElementById("type");
  const notesTextarea = document.getElementById("notes");
  const flagColorInput = document.getElementById("flag");
  const busyCheckbox = document.getElementById("free_busy");

  // 2. Extract values from form fields
  const dateVal = dateInput ? dateInput.value : "";
  const timeStartVal = timeStartInput ? timeStartInput.value : "";
  const timeEndVal = timeEndInput ? timeEndInput.value : "";
  const activityVal = activityInput ? activityInput.value.trim() : "";
  const placeVal = (placeInput && placeInput.value.trim()) ? placeInput.value.trim() : "-";
  const typeVal = typeSelect ? typeSelect.value : "Other";
  const notesVal = (notesTextarea && notesTextarea.value.trim()) ? notesTextarea.value.trim() : "-";
  const flagColor = flagColorInput ? flagColorInput.value : "#11999e";
  const isBusy = busyCheckbox ? busyCheckbox.checked : false;

  // Basic validation
  if (!dateVal || !timeStartVal || !timeEndVal || !activityVal) {
    alert("Please fill in all required fields: Date, Start Time, End Time, and Activity.");
    return;
  }

  // 3. Find or target the schedule table body
  const tableBody = document.querySelector("#schedule-table tbody") || document.querySelector(".data-table tbody");
  if (!tableBody) {
    console.error("Schedule table body not found in the DOM.");
    return;
  }

  // 4. Create new table row (<tr>)
  const newRow = document.createElement("tr");
  newRow.classList.add("newly-added-row");

  // Format Status label and icon
  const statusEmoji = isBusy ? "🔴 Busy" : "🟢 Free";

  // Build row HTML with the 8 columns:
  // Date | Start | End | Description | Place | Type | Notes | Status
  newRow.innerHTML = `
    <td>${formatScheduleDate(dateVal)}</td>
    <td>${timeStartVal}</td>
    <td>${timeEndVal}</td>
    <td>${activityVal}</td>
    <td>${placeVal}</td>
    <td>${typeVal}</td>
    <td>${notesVal}</td>
    <td>
      <span class="flag-dot" style="background-color: ${flagColor};" title="Flag color: ${flagColor}"></span>
      <span>${statusEmoji}</span>
    </td>
  `;

  // 5. Append new row to table
  tableBody.appendChild(newRow);

  // 6. Reset form
  const form = document.getElementById("schedule-form") || document.querySelector(".form-container");
  if (form) {
    form.reset();
  }

  // 7. Smoothly scroll to the newly created row
  newRow.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Attach event listener when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("schedule-form") || document.querySelector(".form-container");
  if (form) {
    form.addEventListener("submit", addScheduleEntryFromForm);
  }
});
