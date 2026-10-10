const mongoose = require('mongoose')
require('dotenv').config()

const Movie = require('./models/Movie')
const connectDB = require('./config/db')

const fallbackPoster =
  'https://placehold.co/500x750/181818/f5f1ea?text=MovieGo'

const movies = [
  {
    title: 'Spider-Man: Brand New Day',
    description:
      'Peter Parker returns for a new chapter as Spider-Man, facing a dangerous threat while trying to rebuild his life.',
    poster:
      'https://image.tmdb.org/t/p/w500/9JCQtDCSpPR2ld55yNlEg1VwcQo.jpg',
    backdrop:
      'https://image.tmdb.org/t/p/original/jenQoCLJ4FEfFGZS13op91jlxjy.jpg',
    genre: ['Action', 'Adventure'],
    language: 'English',
    duration: '2h 16m',
    rating: 8.2,
    releaseDate: new Date('2026-07-31'),
    cast: ['Tom Holland', 'Zendaya', 'Sadie Sink', 'Jacob Batalon'],
    trailerUrl: '',
    isActive: true,
  },

  {
    title: 'Avatar: Fire and Ash',
    description:
      'The world of Pandora expands as the Sully family faces a new chapter filled with danger, conflict and discovery.',
    poster: fallbackPoster,
    backdrop: '',
    genre: ['Science Fiction', 'Adventure', 'Fantasy'],
    language: 'English',
    duration: '3h 12m',
    rating: 8.1,
    releaseDate: new Date('2025-12-19'),
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
    trailerUrl: '',
    isActive: true,
  },

  {
    title: 'Mission: Impossible',
    description:
      'An elite agent faces impossible odds in a high-stakes mission where every decision could change everything.',
    poster: fallbackPoster,
    backdrop: '',
    genre: ['Action', 'Thriller'],
    language: 'English',
    duration: '2h 49m',
    rating: 8.0,
    releaseDate: new Date('2025-05-23'),
    cast: ['Tom Cruise', 'Hayley Atwell', 'Ving Rhames'],
    trailerUrl: '',
    isActive: true,
  },

  {
    title: 'Jurassic World Rebirth',
    description:
      'A new expedition ventures into dangerous territory where prehistoric creatures still rule the wild.',
    poster: fallbackPoster,
    backdrop: '',
    genre: ['Action', 'Adventure', 'Science Fiction'],
    language: 'English',
    duration: '2h 14m',
    rating: 7.8,
    releaseDate: new Date('2025-07-02'),
    cast: ['Scarlett Johansson', 'Jonathan Bailey', 'Mahershala Ali'],
    trailerUrl: '',
    isActive: true,
  },

  {
    title: 'Fantastic Four: First Steps',
    description:
      'A legendary superhero team begins a new journey as they face a threat beyond anything they have encountered before.',
    poster: fallbackPoster,
    backdrop: '',
    genre: ['Action', 'Adventure', 'Science Fiction'],
    language: 'English',
    duration: '1h 55m',
    rating: 8.0,
    releaseDate: new Date('2025-07-25'),
    cast: ['Pedro Pascal', 'Vanessa Kirby', 'Joseph Quinn'],
    trailerUrl: '',
    isActive: true,
  },

  {
    title: 'Superman',
    description:
      'A new generation discovers the story of Superman as he searches for his place between humanity and his extraordinary destiny.',
    poster: fallbackPoster,
    backdrop: '',
    genre: ['Action', 'Adventure', 'Drama'],
    language: 'English',
    duration: '2h 10m',
    rating: 8.1,
    releaseDate: new Date('2025-07-11'),
    cast: ['David Corenswet', 'Rachel Brosnahan', 'Nicholas Hoult'],
    trailerUrl: '',
    isActive: true,
  },

  {
    title: 'F1',
    description:
      'A former racing champion returns to the track and mentors a young driver while chasing one final victory.',
    poster: fallbackPoster,
    backdrop: '',
    genre: ['Drama', 'Sport'],
    language: 'English',
    duration: '2h 35m',
    rating: 8.3,
    releaseDate: new Date('2025-06-27'),
    cast: ['Brad Pitt', 'Damson Idris', 'Javier Bardem'],
    trailerUrl: '',
    isActive: true,
  },

  {
    title: 'How to Train Your Dragon',
    description:
      'A young Viking and a mysterious dragon form an unlikely friendship that changes their world forever.',
    poster: fallbackPoster,
    backdrop: '',
    genre: ['Adventure', 'Fantasy', 'Family'],
    language: 'English',
    duration: '2h 5m',
    rating: 8.2,
    releaseDate: new Date('2025-06-13'),
    cast: ['Mason Thames', 'Nico Parker', 'Gerard Butler'],
    trailerUrl: '',
    isActive: true,
  },

  {
    title: 'The Batman',
    description:
      'Batman investigates a series of mysterious crimes that reveal a darker conspiracy beneath Gotham City.',
    poster: fallbackPoster,
    backdrop: '',
    genre: ['Crime', 'Mystery', 'Thriller'],
    language: 'English',
    duration: '2h 56m',
    rating: 8.5,
    releaseDate: new Date('2022-03-04'),
    cast: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano'],
    trailerUrl: '',
    isActive: true,
  },

  {
    title: 'Interstellar',
    description:
      'A team of explorers travels beyond the limits of human space exploration in search of a future for mankind.',
    poster:
      'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop: '',
    genre: ['Science Fiction', 'Drama', 'Adventure'],
    language: 'English',
    duration: '2h 49m',
    rating: 8.7,
    releaseDate: new Date('2014-11-07'),
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    trailerUrl: '',
    isActive: true,
  },

  // Indian Movies

  {
    title: 'Hanuman Ansh',
    description:
      'A mythological action drama inspired by the legendary stories and devotion surrounding Lord Hanuman.',
    poster: fallbackPoster,
    backdrop: '',
    genre: ['Mythology', 'Action', 'Drama'],
    language: 'Hindi',
    duration: '2h 25m',
    rating: 8.0,
    releaseDate: new Date('2026-08-14'),
    cast: [],
    trailerUrl: '',
    isActive: true,
  },

  {
    title: 'Drishyam 3',
    description:
      'Vijay Salgaonkar faces a new chapter as an old mystery threatens to bring everything back to the surface.',
    poster: fallbackPoster,
    backdrop: '',
    genre: ['Crime', 'Mystery', 'Thriller'],
    language: 'Hindi',
    duration: '2h 30m',
    rating: 8.4,
    releaseDate: new Date('2026-10-02'),
    cast: [
      'Ajay Devgn',
      'Tabu',
      'Shriya Saran',
      'Jaideep Ahlawat',
      'Prakash Raj',
    ],
    trailerUrl: '',
    isActive: true,
  },

  {
    title: 'Dhurandhar',
    description:
      'A high-stakes action thriller filled with espionage, betrayal, danger and revenge.',
    poster: fallbackPoster,
    backdrop: '',
    genre: ['Action', 'Thriller', 'Drama'],
    language: 'Hindi',
    duration: '2h 45m',
    rating: 8.4,
    releaseDate: new Date('2026-03-19'),
    cast: [
      'Ranveer Singh',
      'Sanjay Dutt',
      'Akshaye Khanna',
      'Arjun Rampal',
      'R. Madhavan',
    ],
    trailerUrl: '',
    isActive: true,
  },

  {
    title: 'Mirzapur: The Movie',
    description:
      'The world of Mirzapur moves to the big screen as Guddu Pandit and the familiar crime empire return.',
    poster: fallbackPoster,
    backdrop: '',
    genre: ['Crime', 'Action', 'Thriller'],
    language: 'Hindi',
    duration: '2h 28m',
    rating: 8.2,
    releaseDate: new Date('2026-09-04'),
    cast: [
      'Pankaj Tripathi',
      'Ali Fazal',
      'Divyenndu',
      'Ravi Kishan',
    ],
    trailerUrl: '',
    isActive: true,
  },

  {
    title: 'Border 2',
    description:
      'A new generation of soldiers steps onto the battlefield in a story of courage, sacrifice and patriotism.',
    poster: fallbackPoster,
    backdrop: '',
    genre: ['War', 'Action', 'Drama'],
    language: 'Hindi',
    duration: '2h 40m',
    rating: 8.1,
    releaseDate: new Date('2026-01-23'),
    cast: [
      'Sunny Deol',
      'Varun Dhawan',
      'Diljit Dosanjh',
      'Ahan Shetty',
    ],
    trailerUrl: '',
    isActive: true,
  },

  {
    title: 'Ramayana: Part 1',
    description:
      'An epic retelling of the timeless Ramayana, bringing one of India’s greatest stories to the big screen.',
    poster: fallbackPoster,
    backdrop: '',
    genre: ['Mythology', 'Adventure', 'Drama'],
    language: 'Hindi',
    duration: '2h 55m',
    rating: 8.5,
    releaseDate: new Date('2026-11-06'),
    cast: [
      'Ranbir Kapoor',
      'Sai Pallavi',
      'Yash',
      'Sunny Deol',
    ],
    trailerUrl: '',
    isActive: true,
  },
]

const seedMovies = async () => {
  try {
    await connectDB()

    await Movie.deleteMany()

    await Movie.insertMany(movies)

    console.log(`✅ ${movies.length} movies added successfully`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Failed to seed movies:', error.message)

    process.exit(1)
  }
}

seedMovies()