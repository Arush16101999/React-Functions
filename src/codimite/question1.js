// Available time slots for  A/C repairing job

// const availableTimeSlots = [{ plumping: 60, AC: 100 }];

const getAvailableTimeSlots = () => {
  const plumping = 100 / 60;
  console.log("available slot : " + plumping);

  const AC = 60 / 100;
  console.log(AC);
};
getAvailableTimeSlots();

// Define working hours and job durations
const workStart = new Date("2024-07-01T09:00:00");
const workEnd = new Date("2024-07-01T17:00:00");

const jobDurations = {
  "A/C repairing": 100 * 60 * 1000, // Convert minutes to milliseconds
  Plumbing: 60 * 60 * 1000, // Convert minutes to milliseconds
};

// Scheduled appointments
const appointments = [
  {
    start: new Date("2024-07-01T09:00:00"),
    end: new Date("2024-07-01T10:40:00"),
  },
  {
    start: new Date("2024-07-01T11:00:00"),
    end: new Date("2024-07-01T12:00:00"),
  },
];

// Function to find available slots
function findAvailableSlots(appointments, jobDuration, workStart, workEnd) {
  let availableSlots = [];
  let currentTime = new Date(workStart);

  for (let appointment of appointments) {
    if (currentTime.getTime() + jobDuration <= appointment.start.getTime()) {
      availableSlots.push({
        start: new Date(currentTime),
        end: new Date(appointment.start),
      });
    }
    currentTime = new Date(appointment.end);
  }

  if (currentTime.getTime() + jobDuration <= workEnd.getTime()) {
    availableSlots.push({
      start: new Date(currentTime),
      end: new Date(workEnd),
    });
  }

  return availableSlots;
}

// Find available slots for each job type
const availableSlotsAC = findAvailableSlots(
  appointments,
  jobDurations["A/C repairing"],
  workStart,
  workEnd
);
const availableSlotsPlumbing = findAvailableSlots(
  appointments,
  jobDurations["Plumbing"],
  workStart,
  workEnd
);

console.log("Available slots for A/C repairing:", availableSlotsAC);
console.log("Available slots for Plumbing:", availableSlotsPlumbing);

// Output in a readable format
function formatSlots(slots) {
  return slots.map((slot) => ({
    start: slot.start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    end: slot.end.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
}

console.log(
  "Formatted available slots for A/C repairing:",
  formatSlots(availableSlotsAC)
);
console.log(
  "Formatted available slots for Plumbing:",
  formatSlots(availableSlotsPlumbing)
);
