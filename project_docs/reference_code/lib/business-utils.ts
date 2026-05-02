/**
 * Helper utility to determine if a business is currently open based on its hours string.
 * Expected format: "9:00 AM - 9:00 PM" or "Open 24 Hours"
 * Supports simple range parsing for IST timezone.
 */

export function getBusinessStatus(hoursString: string): { isOpen: boolean; message: string } {
  if (!hoursString) return { isOpen: false, message: 'Hours not set' };
  
  const now = new Date();
  // Convert to IST (UTC+5:30)
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(now.getTime() + istOffset);
  
  const currentTime = istDate.getUTCHours() * 60 + istDate.getUTCMinutes();
  
  if (hoursString.toLowerCase().includes('24 hours')) {
    return { isOpen: true, message: 'Open 24 Hours' };
  }

  try {
    // Basic parser for "HH:MM AM - HH:MM PM"
    const [startPart, endPart] = hoursString.split('-').map(s => s.trim());
    
    const parseTime = (timeStr: string) => {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (isNaN(minutes)) minutes = 0;
      
      if (modifier?.toUpperCase() === 'PM' && hours < 12) hours += 12;
      if (modifier?.toUpperCase() === 'AM' && hours === 12) hours = 0;
      
      return hours * 60 + minutes;
    };

    const startTime = parseTime(startPart);
    const endTime = parseTime(endPart);

    // Handle overnight hours (e.g., 9 PM - 2 AM)
    if (endTime < startTime) {
      const isOpen = currentTime >= startTime || currentTime <= endTime;
      return { 
        isOpen, 
        message: isOpen ? 'Open Now' : 'Closed' 
      };
    }

    const isOpen = currentTime >= startTime && currentTime <= endTime;
    return { 
      isOpen, 
      message: isOpen ? 'Open Now' : `Closed · Opens at ${startPart}` 
    };
  } catch (e) {
    // Fallback for complex strings
    return { isOpen: true, message: hoursString };
  }
}
