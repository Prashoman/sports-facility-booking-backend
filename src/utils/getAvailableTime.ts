interface TTimeFormat{
    startTime: string;
    endTime: string;
}

export const getAvailableTimeCalculate = (
  initialTime: TTimeFormat[],
  alreadyBooked: TTimeFormat[]
) => {
  // Helper function to convert time (HH:MM) to minutes
  const timeToMinutes = (time:string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

// Helper function to convert minutes back to time (HH:MM)
const minutesToTime = (minutes:number) => {
    const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
    const mins = String(minutes % 60).padStart(2, '0');
    return `${hours}:${mins}`;
};

// Convert initialTime to minutes range
const initialRange = initialTime.map(({ startTime, endTime }) => ({
    start: timeToMinutes(startTime),
    end: timeToMinutes(endTime),
}));

// Convert alreadyBooked to minutes range
const bookedRanges = alreadyBooked.map(({ startTime, endTime }) => ({
    start: timeToMinutes(startTime),
    end: timeToMinutes(endTime),
}));

// Sort bookedRanges by start time
bookedRanges.sort((a, b) => a.start - b.start);

const availableSlots = [];

for (const range of initialRange) {
    let currentStart = range.start;

    for (const booked of bookedRanges) {
        // If booked slot is completely outside the current range, skip it
        if (booked.end <= currentStart || booked.start >= range.end) continue;

        // If there is a gap before the booked slot, add it as an available slot
        if (currentStart < booked.start) {
            availableSlots.push({
                startTime: minutesToTime(currentStart),
                endTime: minutesToTime(Math.min(booked.start, range.end)),
            });
        }

        // Update currentStart to the end of the booked slot
        currentStart = Math.max(currentStart, booked.end);
    }

    // Add the remaining time after the last booked slot
    if (currentStart < range.end) {
        availableSlots.push({
            startTime: minutesToTime(currentStart),
            endTime: minutesToTime(range.end),
        });
    }
}

return availableSlots;
};
