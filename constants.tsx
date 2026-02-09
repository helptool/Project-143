import React from 'react';
import { Heart, Gift, Music, Smile, Camera, Coffee, Sun, Moon, Star, CloudRain, Shield } from 'lucide-react';
import { LoveNote, Memory } from './types';

// EDIT HERE: This is where you can change the messages for Vaishnavi
export const SENDER_NAME = "Aryaman";
export const RECIPIENT_NAME = "Vaishnavi";
export const NICKNAMES = ["Jaan", "Baccha", "Jaanu", "Shona", "Babu", "Baby", "Darling", "Meri Rahogulla", "Meri Rasmalayi", "Meri Nanhi Si Jaan"];

// Music URL - A soft romantic piano track (Royalty Free)
export const BACKGROUND_MUSIC_URL = "https://cdn.pixabay.com/audio/2025/11/14/audio_d9897e229a.mp3";

// Relationship Start Date: 07 October 2024, 5:35 PM
export const START_DATE = "2024-10-07T17:35:00";

// Add your photos here. Use standard image URLs.
export const MEMORIES: Memory[] = [
  { 
    id: 1, 
    url: "https://raw.githubusercontent.com/helptool/Project-143/main/images/photo_6307445476504490976_y.jpg", 
    caption: "The way you smile lights up my whole world, Meri Jaan ✨" 
  },
  { 
    id: 2, 
    url: "https://raw.githubusercontent.com/helptool/Project-143/main/images/photo_6203946467002007925_y.jpg", 
    caption: "Even the simplest moments with you feel like magic, Meri Jaadu 💖" 
  },
  { 
    id: 3, 
    url: "https://raw.githubusercontent.com/helptool/Project-143/main/images/Generated%20Image%20February%2008%2C%202026%20-%205_11PM.png", 
    caption: "Missing your warmth every single second, Mera Baccha 🥺" 
  },
  { 
    id: 4, 
    url: "https://raw.githubusercontent.com/helptool/Project-143/main/images/ChatGPT%20Image%20Feb%208%2C%202026%2C%2005_35_42%20PM.png", 
    caption: "Can't wait to let you hold my hand forever, Meri Shona 🤝" 
  },
  { 
    id: 5, 
    url: "https://raw.githubusercontent.com/helptool/Project-143/main/images/ChatGPT%20Image%20Feb%208%2C%202026%2C%2005_39_33%20PM.png", 
    caption: "You are the cutest person that ever existed, My Cutie Pie 🥰" 
  },
  { 
    id: 6, 
    url: "https://raw.githubusercontent.com/helptool/Project-143/main/images/Generated%20Image%20February%2008%2C%202026%20-%205_02PM.png", 
    caption: "My heart beats only for you, My little baby ❤️" 
  },
  { 
    id: 7, 
    url: "https://raw.githubusercontent.com/helptool/Project-143/main/images/photo_6289660394888872967_y.jpg", 
    caption: "Every memory with you is a treasure that I keep safe 🍯✨" 
  },
  { 
    id: 8, 
    url: "https://raw.githubusercontent.com/helptool/Project-143/main/images/ChatGPT%20Image%20Feb%208%2C%202026%2C%2005_31_19%20PM.png", 
    caption: "I am forever grateful to have you in my life, my life 🥹🌹" 
  }
];

export const LOVE_NOTES: LoveNote[] = [
  { id: 1, text: "The way you look at me with those beautiful doe eyes...", rotation: -2 },
  { id: 2, text: "The way you talk to me with that sweet sugary voice...", rotation: 3 },
  { id: 3, text: "The way you calm me when I need you the most...", rotation: -1 },
  { id: 4, text: "The way you hold me close when you become possessive...", rotation: 2 },
  { id: 5, text: "Your cute little angry face.", rotation: -3 },
  { id: 6, text: "The way you blush when I compliment you (just like now ❤️)...", rotation: 1 },
  { id: 7, text: "Your pure heart and it's feelings for me meri jaan...", rotation: -2 },
  { id: 8, text: "The way your expression changes when you see me...", rotation: 4 },
  { id: 9, text: "Your cute innocent face when I adore you secretely...", rotation: -1 },
  { id: 10, text: "I love YOU! I Love Everything about you...", rotation: 2 },
];

export const PROMISE_LIST = [
  "I promise to be with you especially whenever I feel low 😚.",
  "I promise to always annoy you with my cute dramas 🥹.",
  "I promise to pamper you after roasting you 🥰",
  "I promise to Love You even after my last breath 🥹❤️"
];

export const IMPORTANT_DATES = [
  { 
    title: "Our First Kiss & Hug", 
    date: "8 November 2024", 
    time: "5:58 PM", 
    caption: "A soft, shy moment that froze time forever...🙈✨" 
  },
  { 
    title: "Our First Video Call", 
    date: "10 November 2024", 
    time: "7:13 PM – 7:35 PM", 
    caption: "Nervous smiles, messy hair, and magical butterflies 📸💖" 
  },
  { 
    title: "My First Rose & Letter", 
    date: "18 November 2024", 
    time: "~6:30 PM", 
    caption: "Pouring my nervous heart out in a letter to you 💌🌹" 
  },
  { 
    title: "Your Rose Back to Me", 
    date: "22 November 2024", 
    time: "~6:00 PM", 
    caption: "The moment your words made my world complete 🥺❤️" 
  },
  { 
    title: "Our First Trip", 
    date: "5 April 2025", 
    time: "8:00 AM – 4:00 PM", 
    caption: "Dongargarh: Adventures & togetherness await us ⛰️👫" 
  }
];

export const DISTANCE_LETTER = `
My Dearest Vaishu,

Even though there are miles between us right now (750 meters 🫩), please know that you are the closest thing to my heart (thing bole toh insaan 😁).
Every morning I wake up missing you (fir baad me gud morning bhi hoti hai tumse baat karke 🥹), 
And every night I go to sleep dreaming of the day I can finally hold you…

I know this little distance is hard. I know my baby, sometimes it hurts not being able to just hug you when you're sad.
But my love for you is much stronger than any distance my cutieee. I love youuu sooo muchhhh meriiii laadoooo!! 🥰
Today, tomorrow, and forever my babygurl…✨!!!

You are my darling, my sweetheart, my everything 😭❤️
`;

export const FINAL_MESSAGE = `
Meri Vaishu… 🥹
I don’t have much right now…
(Paishe 💸)
But jo bhi hai…,
(Thodu sa hi hai 😭)
Jitna bhi hai…,
woh sab tumhara hai meri laado 🥹

I love youu theee mosttt babyyy, meri nanhi si jaan. 😚🥹
Happy Valentine Week Sweetie 💞
`;