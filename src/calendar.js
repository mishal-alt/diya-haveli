const stamp = (iso) => {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/)
  return m ? `${m[1]}${m[2]}${m[3]}T${m[4]}${m[5]}${m[6]}` : iso
}

export function eventToIcs(e) {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Aarav and Meera//Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${e.slug}@aarav-meera-2027.example`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(e.start)}`,
    `DTEND:${stamp(e.end)}`,
    `SUMMARY:Aarav & Meera — ${e.name}`,
    `LOCATION:${e.place}`,
    `DESCRIPTION:${e.note}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export const icsDataUrl = (e) => `data:text/calendar;charset=utf-8,${encodeURIComponent(eventToIcs(e))}`
