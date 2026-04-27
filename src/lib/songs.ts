export type Mood = "happy" | "sad" | "energetic" | "calm" | "angry" | "romantic";

export interface MoodMeta {
  id: Mood;
  label: string;
  emoji: string;
  tagline: string;
  gradient: string;
}

export const MOODS: Record<Mood, MoodMeta> = {
  happy:     { id: "happy",     label: "Happy",     emoji: "😄", tagline: "Sunshine in your ears",      gradient: "linear-gradient(135deg, oklch(0.85 0.18 90), oklch(0.78 0.18 30))" },
  sad:       { id: "sad",       label: "Melancholy", emoji: "🥺", tagline: "Soft songs for soft hearts", gradient: "linear-gradient(135deg, oklch(0.55 0.15 250), oklch(0.45 0.10 280))" },
  energetic: { id: "energetic", label: "Energetic", emoji: "⚡", tagline: "Turn it up to eleven",        gradient: "linear-gradient(135deg, oklch(0.72 0.22 340), oklch(0.65 0.25 25))" },
  calm:      { id: "calm",      label: "Calm",      emoji: "🌿", tagline: "Breathe and unwind",          gradient: "linear-gradient(135deg, oklch(0.78 0.15 180), oklch(0.65 0.15 220))" },
  angry:     { id: "angry",     label: "Fired Up",  emoji: "🔥", tagline: "Channel the fire",            gradient: "linear-gradient(135deg, oklch(0.55 0.25 25), oklch(0.40 0.15 15))" },
  romantic:  { id: "romantic",  label: "Romantic",  emoji: "💗", tagline: "Hearts on fire",              gradient: "linear-gradient(135deg, oklch(0.78 0.18 350), oklch(0.65 0.20 320))" },
};

export interface Song {
  title: string;
  artist: string;
  album: string;
  cover: string;
  language: "Hindi" | "English";
  link: string; // YouTube search fallback always works
}

const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
const cover = (seed: string) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/400/400`;

export const SONGS: Record<Mood, Song[]> = {
  happy: [
    { title: "Happy", artist: "Pharrell Williams", album: "G I R L", language: "English", cover: cover("happy1"), link: yt("Pharrell Williams Happy") },
    { title: "Walking on Sunshine", artist: "Katrina & The Waves", album: "Walking on Sunshine", language: "English", cover: cover("happy2"), link: yt("Walking on Sunshine Katrina") },
    { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", album: "Trolls OST", language: "English", cover: cover("happy3"), link: yt("Cant Stop the Feeling Justin Timberlake") },
    { title: "Good as Hell", artist: "Lizzo", album: "Cuz I Love You", language: "English", cover: cover("happy4"), link: yt("Lizzo Good as Hell") },
    { title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", language: "English", cover: cover("happy5"), link: yt("Dua Lipa Levitating") },
    { title: "Gallan Goodiyaan", artist: "Yashita Sharma & team", album: "Dil Dhadakne Do", language: "Hindi", cover: cover("happy6"), link: yt("Gallan Goodiyaan") },
    { title: "Badtameez Dil", artist: "Benny Dayal", album: "Yeh Jawaani Hai Deewani", language: "Hindi", cover: cover("happy7"), link: yt("Badtameez Dil") },
    { title: "London Thumakda", artist: "Labh Janjua", album: "Queen", language: "Hindi", cover: cover("happy8"), link: yt("London Thumakda Queen") },
    { title: "Kar Gayi Chull", artist: "Badshah, Fazilpuria", album: "Kapoor & Sons", language: "Hindi", cover: cover("happy9"), link: yt("Kar Gayi Chull") },
    { title: "Nashe Si Chadh Gayi", artist: "Arijit Singh", album: "Befikre", language: "Hindi", cover: cover("happy10"), link: yt("Nashe Si Chadh Gayi") },
  ],
  sad: [
    { title: "Someone Like You", artist: "Adele", album: "21", language: "English", cover: cover("sad1"), link: yt("Adele Someone Like You") },
    { title: "Fix You", artist: "Coldplay", album: "X&Y", language: "English", cover: cover("sad2"), link: yt("Coldplay Fix You") },
    { title: "Let Her Go", artist: "Passenger", album: "All the Little Lights", language: "English", cover: cover("sad3"), link: yt("Passenger Let Her Go") },
    { title: "When I Was Your Man", artist: "Bruno Mars", album: "Unorthodox Jukebox", language: "English", cover: cover("sad4"), link: yt("Bruno Mars When I Was Your Man") },
    { title: "Skinny Love", artist: "Birdy", album: "Birdy", language: "English", cover: cover("sad5"), link: yt("Birdy Skinny Love") },
    { title: "Channa Mereya", artist: "Arijit Singh", album: "Ae Dil Hai Mushkil", language: "Hindi", cover: cover("sad6"), link: yt("Channa Mereya") },
    { title: "Tum Hi Ho", artist: "Arijit Singh", album: "Aashiqui 2", language: "Hindi", cover: cover("sad7"), link: yt("Tum Hi Ho Aashiqui 2") },
    { title: "Agar Tum Saath Ho", artist: "Alka Yagnik, Arijit Singh", album: "Tamasha", language: "Hindi", cover: cover("sad8"), link: yt("Agar Tum Saath Ho") },
    { title: "Kabira", artist: "Tochi Raina, Rekha Bhardwaj", album: "Yeh Jawaani Hai Deewani", language: "Hindi", cover: cover("sad9"), link: yt("Kabira YJHD") },
    { title: "Phir Le Aaya Dil", artist: "Arijit Singh", album: "Barfi!", language: "Hindi", cover: cover("sad10"), link: yt("Phir Le Aaya Dil") },
  ],
  energetic: [
    { title: "Stronger", artist: "Kanye West", album: "Graduation", language: "English", cover: cover("e1"), link: yt("Kanye West Stronger") },
    { title: "Don't Stop Me Now", artist: "Queen", album: "Jazz", language: "English", cover: cover("e2"), link: yt("Queen Dont Stop Me Now") },
    { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", album: "Uptown Special", language: "English", cover: cover("e3"), link: yt("Uptown Funk") },
    { title: "Believer", artist: "Imagine Dragons", album: "Evolve", language: "English", cover: cover("e4"), link: yt("Imagine Dragons Believer") },
    { title: "Titanium", artist: "David Guetta ft. Sia", album: "Nothing but the Beat", language: "English", cover: cover("e5"), link: yt("Titanium David Guetta") },
    { title: "Malhari", artist: "Vishal Dadlani", album: "Bajirao Mastani", language: "Hindi", cover: cover("e6"), link: yt("Malhari Bajirao") },
    { title: "Zinda", artist: "Siddharth Mahadevan", album: "Bhaag Milkha Bhaag", language: "Hindi", cover: cover("e7"), link: yt("Zinda Bhaag Milkha") },
    { title: "Senorita", artist: "Farhan, Hrithik, Abhay", album: "Zindagi Na Milegi Dobara", language: "Hindi", cover: cover("e8"), link: yt("Senorita ZNMD") },
    { title: "Apna Time Aayega", artist: "Ranveer Singh, DIVINE", album: "Gully Boy", language: "Hindi", cover: cover("e9"), link: yt("Apna Time Aayega") },
    { title: "Sultan Title Track", artist: "Sukhwinder Singh, Shadab Faridi", album: "Sultan", language: "Hindi", cover: cover("e10"), link: yt("Sultan Title Track") },
  ],
  calm: [
    { title: "Weightless", artist: "Marconi Union", album: "Weightless", language: "English", cover: cover("c1"), link: yt("Marconi Union Weightless") },
    { title: "Holocene", artist: "Bon Iver", album: "Bon Iver", language: "English", cover: cover("c2"), link: yt("Bon Iver Holocene") },
    { title: "Bloom", artist: "The Paper Kites", album: "Woodland", language: "English", cover: cover("c3"), link: yt("The Paper Kites Bloom") },
    { title: "Saturn", artist: "Sleeping at Last", album: "Atlas: Year One", language: "English", cover: cover("c4"), link: yt("Sleeping at Last Saturn") },
    { title: "River Flows in You", artist: "Yiruma", album: "First Love", language: "English", cover: cover("c5"), link: yt("Yiruma River Flows in You") },
    { title: "Iktara", artist: "Kavita Seth", album: "Wake Up Sid", language: "Hindi", cover: cover("c6"), link: yt("Iktara Wake Up Sid") },
    { title: "Phir Se Ud Chala", artist: "Mohit Chauhan", album: "Rockstar", language: "Hindi", cover: cover("c7"), link: yt("Phir Se Ud Chala Rockstar") },
    { title: "Tum Ho", artist: "Mohit Chauhan", album: "Rockstar", language: "Hindi", cover: cover("c8"), link: yt("Tum Ho Rockstar") },
    { title: "Mitwa", artist: "Shafqat Amanat Ali", album: "Kabhi Alvida Naa Kehna", language: "Hindi", cover: cover("c9"), link: yt("Mitwa KANK") },
    { title: "Khamoshiyan", artist: "Arijit Singh", album: "Khamoshiyan", language: "Hindi", cover: cover("c10"), link: yt("Khamoshiyan Arijit") },
  ],
  angry: [
    { title: "In the End", artist: "Linkin Park", album: "Hybrid Theory", language: "English", cover: cover("a1"), link: yt("Linkin Park In The End") },
    { title: "Killing in the Name", artist: "Rage Against the Machine", album: "RATM", language: "English", cover: cover("a2"), link: yt("Rage Against the Machine Killing in the Name") },
    { title: "Chop Suey!", artist: "System of a Down", album: "Toxicity", language: "English", cover: cover("a3"), link: yt("System of a Down Chop Suey") },
    { title: "Lose Yourself", artist: "Eminem", album: "8 Mile", language: "English", cover: cover("a4"), link: yt("Eminem Lose Yourself") },
    { title: "Bring Me to Life", artist: "Evanescence", album: "Fallen", language: "English", cover: cover("a5"), link: yt("Evanescence Bring Me to Life") },
    { title: "Sadda Haq", artist: "Mohit Chauhan", album: "Rockstar", language: "Hindi", cover: cover("a6"), link: yt("Sadda Haq Rockstar") },
    { title: "Bhaag DK Bose", artist: "Ram Sampath", album: "Delhi Belly", language: "Hindi", cover: cover("a7"), link: yt("Bhaag DK Bose") },
    { title: "Jee Karda", artist: "Divya Kumar", album: "Badlapur", language: "Hindi", cover: cover("a8"), link: yt("Jee Karda Badlapur") },
    { title: "Mere Gully Mein", artist: "DIVINE, Naezy", album: "Gully Boy", language: "Hindi", cover: cover("a9"), link: yt("Mere Gully Mein") },
    { title: "Brothers Anthem", artist: "Vishal Dadlani", album: "Brothers", language: "Hindi", cover: cover("a10"), link: yt("Brothers Anthem") },
  ],
  romantic: [
    { title: "Perfect", artist: "Ed Sheeran", album: "÷ (Divide)", language: "English", cover: cover("r1"), link: yt("Ed Sheeran Perfect") },
    { title: "All of Me", artist: "John Legend", album: "Love in the Future", language: "English", cover: cover("r2"), link: yt("John Legend All of Me") },
    { title: "Thinking Out Loud", artist: "Ed Sheeran", album: "x", language: "English", cover: cover("r3"), link: yt("Thinking Out Loud Ed Sheeran") },
    { title: "A Thousand Years", artist: "Christina Perri", album: "Twilight OST", language: "English", cover: cover("r4"), link: yt("Christina Perri A Thousand Years") },
    { title: "Adore You", artist: "Harry Styles", album: "Fine Line", language: "English", cover: cover("r5"), link: yt("Harry Styles Adore You") },
    { title: "Tum Se Hi", artist: "Mohit Chauhan", album: "Jab We Met", language: "Hindi", cover: cover("r6"), link: yt("Tum Se Hi Jab We Met") },
    { title: "Pee Loon", artist: "Mohit Chauhan", album: "Once Upon a Time in Mumbaai", language: "Hindi", cover: cover("r7"), link: yt("Pee Loon Mohit Chauhan") },
    { title: "Raabta", artist: "Arijit Singh", album: "Agent Vinod", language: "Hindi", cover: cover("r8"), link: yt("Raabta Arijit") },
    { title: "Tera Ban Jaunga", artist: "Akhil Sachdeva, Tulsi Kumar", album: "Kabir Singh", language: "Hindi", cover: cover("r9"), link: yt("Tera Ban Jaunga") },
    { title: "Tujhe Kitna Chahne Lage", artist: "Arijit Singh", album: "Kabir Singh", language: "Hindi", cover: cover("r10"), link: yt("Tujhe Kitna Chahne Lage") },
  ],
};

// Map quiz answers (energy + vibe + state) to a mood
export interface QuizAnswers {
  feeling: "great" | "okay" | "low";
  energy: "low" | "medium" | "high";
  vibe: "calm" | "energetic";
  state: "stressed" | "relaxed" | "excited" | "heartbroken" | "in_love";
  tempo: "slow" | "fast";
}

export function moodFromQuiz(a: QuizAnswers): Mood {
  if (a.state === "in_love") return "romantic";
  if (a.state === "heartbroken" || a.feeling === "low") return "sad";
  if (a.state === "stressed" && a.vibe === "energetic") return "angry";
  if (a.vibe === "calm" || a.energy === "low" || a.tempo === "slow") return "calm";
  if (a.energy === "high" && a.tempo === "fast") return "energetic";
  if (a.feeling === "great") return "happy";
  return "calm";
}

export function randomCameraMood(): Mood {
  const opts: Mood[] = ["happy", "sad", "energetic", "calm", "romantic"];
  return opts[Math.floor(Math.random() * opts.length)];
}
