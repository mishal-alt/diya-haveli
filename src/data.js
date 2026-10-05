// All invitation copy and media paths live here.
export const media = {
  cover: '/images/r3.png',
  opener: '/media/openr.mp4',
  lotus: '/media/lotus.mp4',
  lastFrame: '/images/last_frame.jpeg',
  celebrationsBg: '/images/r1.png',
  eventBadge: '/images/r2.png',
  floatingBadge: '/images/r1.png',
  weddingHands: '/images/wedding-hands.jpg',
  palaceCourtyard: '/images/palace-courtyard.jpg',
}

// Optional background music: drop an mp3 at /public/audio.mp3 (or set VITE_AUDIO_URL).
export const AUDIO_URL = import.meta.env.VITE_AUDIO_URL ?? '/audio.mp3'

export const WEDDING_DATE = '2027-02-14T18:30:00+05:30'

export const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'blessing', label: 'Blessing' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'story', label: 'Story' },
  { id: 'celebrations', label: 'Events' },
  { id: 'venue', label: 'Venue' },
]

export const events = [
  {
    name: 'Mehendi',
    date: '12 February 2027',
    time: '4:00 PM',
    place: 'Courtyard Lawns, Rambagh Haveli',
    note: 'Marigolds, henna and folk music at sundown.',
    start: '2027-02-12T16:00:00+05:30',
    end: '2027-02-12T19:00:00+05:30',
    slug: 'mehendi',
  },
  {
    name: 'Sangeet',
    date: '13 February 2027',
    time: '7:30 PM',
    place: 'Sheesh Mahal Ballroom',
    note: 'An evening of dance, dhol and shared stories.',
    start: '2027-02-13T19:30:00+05:30',
    end: '2027-02-13T23:00:00+05:30',
    slug: 'sangeet',
  },
  {
    name: 'Wedding Ceremony',
    date: '14 February 2027',
    time: '6:30 PM',
    place: 'Amber Gardens Mandap',
    note: 'Saat phere under a canopy of lotus and light.',
    start: '2027-02-14T18:30:00+05:30',
    end: '2027-02-14T20:30:00+05:30',
    slug: 'wedding',
  },
  {
    name: 'Reception',
    date: '14 February 2027',
    time: '9:00 PM',
    place: 'The Grand Durbar Hall',
    note: 'Dinner, blessings and celebration till late.',
    start: '2027-02-14T21:00:00+05:30',
    end: '2027-02-15T00:00:00+05:30',
    slug: 'reception',
  },
]

export const milestones = [
  {
    year: '2019 — Meteorology',
    title: 'The First Meeting',
    text: 'A monsoon evening in Bengaluru. Two strangers share one umbrella at a tram crossing, and the rain never quite lets up.',
    photo: {
      src: '/images/story-first-meeting.jpg',
      alt: 'Aarav and Meera sharing an umbrella on a rainy Bengaluru evening',
      placement: 'right',
    },
  },
  {
    year: '2022 — Geography',
    title: 'The First Journey',
    text: 'A first journey together through the lanes of Udaipur. A borrowed scooter, a missed turn, a long quiet lunch.',
  },
  {
    year: '2025 — Devotion',
    title: 'The Question',
    text: 'A question asked beneath a lotus pond at dawn. A pause that answered itself before the words arrived.',
    photo: {
      src: '/images/story-question.jpg',
      alt: 'A proposal beside a lotus pond at first light',
      placement: 'below',
    },
  },
  {
    year: '2027 — Union',
    title: 'The Beginning',
    text: 'Two families. One thread. Seven vows. The slow unrolling of a story that started, as these things do, on a rainy evening.',
    photo: {
      src: '/images/story-beginning.jpg',
      alt: 'The couple taking their first ceremonial steps together',
      placement: 'left',
    },
  },
]
