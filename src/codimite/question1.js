// Available time slots for  A/C repairing job

const availableTimeSlots = [{ plumping: 60, AC: 100 }];

const getAvailableTimeSlots = () => {
  const plumping = 100 / 60;
  console.log("available slot : " + plumping);

  const AC = 60 / 100;
  console.log(AC);
};
getAvailableTimeSlots();
