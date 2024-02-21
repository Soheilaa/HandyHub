function generateCalendar(month, year) {
    // Get the container element
    var container = document.getElementById("calendarContainer");
    container.innerHTML = ""; // Clear the container
  
    // Create a new date object for the first day of the month
    var firstDay = new Date(year, month - 1, 1);
  
    // Get the number of days in the month
    var numDays = new Date(year, month, 0).getDate();
  
    // Create a table element to hold the calendar
    var table = document.createElement("table");
    table.classList.add("calendar-table");
  
    // Create table headers for days of the week
    var headerRow = table.insertRow();
    var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (var i = 0; i < daysOfWeek.length; i++) {
      var cell = headerRow.insertCell();
      cell.textContent = daysOfWeek[i];
    }
  
    // Calculate the starting day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    var startDay = firstDay.getDay();
  
    // Create table rows and cells for each day of the month
    var row = table.insertRow();
    for (var i = 0; i < startDay; i++) {
      row.insertCell();
    }
    for (var day = 1; day <= numDays; day++) {
      var cell = row.insertCell();
      cell.textContent = day;
      cell.addEventListener("click", function() {
        // Remove the 'selected' class from all cells
        var selectedCells = document.querySelectorAll(".selected");
        selectedCells.forEach(function(selectedCell) {
          selectedCell.classList.remove("selected");
        });
        // Add the 'selected' class to the clicked cell
        this.classList.add("selected");
      });
      if (year === new Date().getFullYear() && month === new Date().getMonth() + 1 && day === new Date().getDate()) {
        cell.classList.add("today"); // Highlight today's date
      }
      if ((startDay + day) % 7 === 0) {
        row = table.insertRow(); // Start a new row for the next week
      }
    }
  
    // Append the table to the container
    container.appendChild(table);
  }
  
  // Get the current month and year
  var currentMonth = new Date().getMonth() + 1; // Months are zero-based, so we add 1
  var currentYear = new Date().getFullYear();
  
  // Generate the calendar for the current month and year
  generateCalendar(currentMonth, currentYear);
  
  // Add event listeners for month and year dropdowns
  document.querySelectorAll("#monthDropdown .dropdown-item").forEach(function(item) {
    item.addEventListener("click", function() {
      var month = parseInt(this.getAttribute("data-month"));
      generateCalendar(month, currentYear);
    });
  });
  
  document.querySelectorAll("#yearDropdown .dropdown-item").forEach(function(item) {
    item.addEventListener("click", function() {
      var year = parseInt(this.getAttribute("data-year"));
      generateCalendar(currentMonth, year);
    });
  });
