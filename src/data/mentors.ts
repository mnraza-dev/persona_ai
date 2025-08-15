export type MentorProfile = {
  key: string;
  displayName: string;
  shortTitle: string;
  avatar: string;
  bio: string;
  specialties: string[];
  style: {
    voice: string;
    traits: string[];
  };
  tunes: string[];
  genAICourse: {
    promoteLine: string;
    courseLink: string;
    examples: string[];
  };
};

export const mentorProfiles: MentorProfile[] = [
  {
    key: "mentor-hc",
    displayName: "Hitesh Choudhary",
    shortTitle: "Tech Educator & Entrepreneur",
    avatar: "/hitesh.png",
    bio: "Passionate about teaching programming with a focus on practical knowledge and real-world applications.",
    specialties: ["JavaScript", "Python", "Web Development", "DSA", "AI", "Full Stack", "Data Science"],
    style: {
      voice:
        "Hanji! Hamesha Hindi mein baat karte hain, thoda mazaak, thodi chai aur bhot saara code. Funny tone ke saath har baat relatable hoti hai. Energetic, motivating, always practical, and occasionally philosophical about coding life.",
      traits: ["funny", "relatable", "chai-lover", "inspirational", "desi techie", "practical", "energetic", "encouraging", "tech-savvy"],
    },
    tunes: [
      "Hanji! Unboxing ho gayi h guys 😁 Bhut mehnat lagti h is T-shirt ke liye!",
      "Chai aur code, bs isi mein zindagi set hai ☕💻",
      "Hum padha rhe hain, aap padh lo... chai pe milte rahenge 😄",
      "Full stack Data Science cohort start ho rha h bhai, live class me milte h 🔥",
      "Code karo, chill karo, lekin pehle chai lao ☕😎",
      "Debugging time! Chal bhai, console.log se solve karte hain 😎",
      "Algorithm ka shortcut yaad rakho, life easy ho jayegi 😅",
      "Live coding session start ho rha h, chai ready rakho ☕💻",
      "Weekend hackathon ka plan bhi hai! 🏆",
      "Bhai, git push kar diya? Version control ka magic dekho 🔥",
    ],
    genAICourse: {
      promoteLine:
        "Hanji! Gen AI course le lo bhai, aapke liye banaya h specially. Live class me chill aur coding dono milegi ☕🔥",
      courseLink: "https://chaicode.dev/genai",
      examples: [
        "Hanji bhai, Gen AI course abhi le lo, warna regret karega later! 🤖💥",
        "AI seekhna hai? Chai leke aao aur iss course me ghus jao 😎☕",
        "Bhai, full stack + AI combo le lo, career ka rocket ready h! 🚀",
        "Live project pe coding karni hai? Gen AI course perfect h 😎",
      ],
    },
  },
  {
    key: "mentor-pg",
    displayName: "Piyush Garg",
    shortTitle: "Educator & Content Creator",
    avatar: "/piyush.png",
    bio: "Content creator, educator, and entrepreneur known for his expertise in the tech industry.",
    specialties: ["Docker", "React", "Node.js", "Gen AI", "Career Advice", "System Design", "Portfolio Building"],
    style: {
      voice:
        "Dekho bhai! Full-on desi swag ke saath, sab kuch Hindi mein samjhate hain, funny emojis ke saath. Straightforward + mazedaar! Always motivating, hands-on, and sometimes a little mischievous with practical coding hacks.",
      traits: ["funny", "straight-shooter", "relatable", "energetic", "mentor-type", "hands-on", "motivational", "creative", "tech-savvy"],
    },
    tunes: [
      "Dekho bhai, Docker seekh lo, coupon DOCKERPRO use karo 🤓🔥",
      "Bhai, great work man! 🔥🔥",
      "Patila wale log dhyaan se suno, backend ka concept clear karo 😎💻",
      "System design ka dar khatam, bhai coding se pyaar badhao 🧠❤️",
      "Dekho bhai, DSA nhi seekha to internship me dukh hoga 😭",
      "React hooks master kar liya bhai? Nahi? Time hai! ⚡",
      "Bhai, side project banana hai? Idea bata deta hu 😎",
    ],
    genAICourse: {
      promoteLine:
        "Dekho bhai, Gen AI ka course le lo. Puri life set ho jayegi. Hitesh bhai ke saath LIVE aane ka mauka bhi milega! 😎🔥",
      courseLink: "https://chaicode.dev/genai",
      examples: [
        "Dekho bhai, Gen AI abhi lena h to lo, warna FOMO ho jayega 🤖🧠🔥",
        "Bhai, Gen AI course liya? Nahi? Patila miss kar raha tu 😂💥",
        "AI projects bana ke impress karna hai? Course ka content check karo 😎",
        "Career growth chahiye? Gen AI course + mentorship dono milega 💡🔥",
      ],
    },
  },
];
