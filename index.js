import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Get the directory name from the current module URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // Middleware to parse JSON body
app.use(express.static(__dirname)); // Serve static files from the current directory

// Serve the HTML file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Hybrid chatbot class with pattern matching and AI backup
class HybridChatbot {
  constructor() {
    this.currentDate = {
      year: 2025,
      month: 4,  // April
      day: 29,
      fullDate: "Tuesday, April 29, 2025"
    };
  
    // Current factual information
    this.facts = {
      // Political Leaders
      "us president": "Donald Trump is the current President of the United States, inaugurated on January 20, 2025.",
      "usa president": "Donald Trump is the current President of the United States, inaugurated on January 20, 2025.",
      "president of usa": "Donald Trump is the current President of the United States, inaugurated on January 20, 2025.",
      "president of us": "Donald Trump is the current President of the United States, inaugurated on January 20, 2025.",
      "who is president": "Donald Trump is the current President of the United States, inaugurated on January 20, 2025.",
      "vice president": "J.D. Vance is the current Vice President of the United States.",
      "us vice president": "J.D. Vance is the current Vice President of the United States.",
      "uk prime minister": "Keir Starmer is the current Prime Minister of the United Kingdom, who took office in July 2024.",
      "prime minister of uk": "Keir Starmer is the current Prime Minister of the United Kingdom, who took office in July 2024.",
      "canadian prime minister": "Justin Trudeau is the current Prime Minister of Canada.",
      "german chancellor": "Olaf Scholz is the current Chancellor of Germany.",
      "french president": "Emmanuel Macron is the current President of France.",
      "russian president": "Vladimir Putin is the current President of Russia.",
      "chinese president": "Xi Jinping is the current President of China.",
      "indian prime minister": "Narendra Modi is the current Prime Minister of India.",
      "japanese prime minister": "Shigeru Ishiba is the current Prime Minister of Japan, who took office in October 2024.",
      "australian prime minister": "Anthony Albanese is the current Prime Minister of Australia.",
      "brazilian president": "Luiz Inácio Lula da Silva is the current President of Brazil.",
      "mexican president": "Claudia Sheinbaum is the current President of Mexico, who took office in October 2024.",
      "italian prime minister": "Giorgia Meloni is the current Prime Minister of Italy.",
      "spanish prime minister": "Pedro Sánchez is the current Prime Minister of Spain.",
      "south korean president": "Yoon Suk Yeol is the current President of South Korea.",
      "un secretary general": "António Guterres is the current Secretary-General of the United Nations.",
      "pope": "Pope Francis is the current head of the Catholic Church.",
      "eu commission president": "Ursula von der Leyen is the current President of the European Commission.",
      
      // Recent Major Events
      "ukraine war": "The Russia-Ukraine war, which began in February 2022, continues as of 2025 with ongoing conflicts in eastern Ukraine.",
      "gaza conflict": "The Israel-Hamas conflict that intensified in October 2023 remains unresolved as of 2025, with humanitarian concerns in Gaza.",
      "covid pandemic": "The COVID-19 pandemic began in 2020. While no longer a global emergency, variants continue to circulate as of 2025.",
      "2024 olympics": "The 2024 Summer Olympics were held in Paris, France from July 26 to August 11, 2024.",
      "2026 world cup": "The 2026 FIFA World Cup will be jointly hosted by the United States, Mexico, and Canada.",
      "2024 election": "Donald Trump won the 2024 US Presidential election, defeating Kamala Harris.",
      "latest mars mission": "NASA's Mars Sample Return mission is scheduled for the late 2020s to bring Martian samples collected by the Perseverance rover back to Earth.",
      
      // Technology
      "latest iphone": "The iPhone 17 series is Apple's latest smartphone line, released in September 2025.",
      "latest android": "Android 16 is the latest version of Google's mobile operating system as of 2025.",
      "latest playstation": "The PlayStation 5 Pro is Sony's latest gaming console, released in late 2024.",
      "latest xbox": "The Xbox Series X Slim is Microsoft's latest gaming console, released in 2024.",
      "latest tesla": "The Tesla Model 3 Highland and Tesla Cybercab are among Tesla's latest vehicle offerings as of 2025.",
      "spacex starship": "SpaceX's Starship has completed multiple orbital flights and is preparing for missions to the Moon as part of NASA's Artemis program.",
      "meta latest": "Meta's latest AR glasses with neural interface capabilities were released in 2024.",
      "ai regulation": "The EU AI Act, which went into effect in 2024, is the world's first comprehensive AI regulation framework.",
      "largest tech company": "NVIDIA became the world's most valuable company in 2024, surpassing Apple and Microsoft.",
      "crypto market cap": "The total cryptocurrency market capitalization is approximately $4 trillion as of April 2025.",
      "bitcoin price": "Bitcoin's price is approximately $75,000 as of April 2025.",
      "ethereum price": "Ethereum's price is approximately $4,500 as of April 2025.",
      
      // Sports
      "2024 super bowl": "The Kansas City Chiefs won Super Bowl LVIII in February 2024, defeating the San Francisco 49ers.",
      "2025 super bowl": "The Detroit Lions won Super Bowl LIX in February 2025, defeating the Buffalo Bills for their first championship.",
      "2024 world series": "The Los Angeles Dodgers won the 2024 World Series.",
      "2024 nba champions": "The Boston Celtics won the 2024 NBA Championship.",
      "2024 uefa champions league": "Real Madrid won the 2024 UEFA Champions League.",
      "2024 formula 1 champion": "Max Verstappen won the 2024 Formula 1 World Championship.",
      "wimbledon 2024": "Carlos Alcaraz won the men's singles and Iga Świątek won the women's singles at Wimbledon 2024.",
      "fifa world cup 2022": "Argentina won the 2022 FIFA World Cup, defeating France in the final.",
      "ballon d'or 2024": "Jude Bellingham won the 2024 Ballon d'Or.",
      
      // Entertainment
      "best picture oscar 2024": "'Oppenheimer' won the Academy Award for Best Picture in 2024.",
      "best picture oscar 2025": "'Anora' won the Academy Award for Best Picture in 2025.",
      "best actress 2024": "Emma Stone won the Academy Award for Best Actress in 2024 for 'Poor Things'.",
      "best actor 2024": "Cillian Murphy won the Academy Award for Best Actor in 2024 for 'Oppenheimer'.",
      "best actress 2025": "Zendaya won the Academy Award for Best Actress in 2025.",
      "best actor 2025": "Michael Keaton won the Academy Award for Best Actor in 2025.",
      "top grossing movie 2024": "'Deadpool & Wolverine' was the highest-grossing film of 2024.",
      "top grossing movie 2025": "'Avatar 3: Fire and Ash' is the highest-grossing film of 2025 so far.",
      "grammy album of the year 2024": "Taylor Swift's 'Midnights' won Album of the Year at the 2024 Grammy Awards.",
      "grammy album of the year 2025": "Beyoncé's 'Renaissance Act II' won Album of the Year at the 2025 Grammy Awards.",
      "netflix most watched": "'Squid Game Season 2' became Netflix's most watched series in 2024.",
      "latest marvel movie": "'Captain America: Brave New World' is the latest Marvel Cinematic Universe film released in 2025.",
      "latest star wars": "'The Acolyte' and 'Skeleton Crew' are the latest Star Wars series released on Disney+.",
      
      // Science & Health
      "nobel prize physics 2024": "The 2024 Nobel Prize in Physics was awarded for breakthroughs in quantum computing.",
      "nobel prize medicine 2024": "The 2024 Nobel Prize in Medicine was awarded for advancements in RNA technology applied to disease treatment.",
      "latest space telescope": "The Nancy Grace Roman Space Telescope was launched in 2025, succeeding the James Webb Space Telescope.",
      "latest cancer treatment": "CAR T-cell therapy expanded to solid tumors in 2024, marking a breakthrough in cancer treatment.",
      "latest fusion energy": "The UK's STEP fusion reactor project achieved net energy gain in 2024, advancing nuclear fusion technology.",
      "latest climate report": "The IPCC's Seventh Assessment Report (AR7) in 2024 indicated accelerating climate change impacts.",
      "antarctica ice": "Antarctica's Thwaites Glacier continued its concerning retreat in 2024, potentially threatening global sea levels.",
      "latest vaccine": "Universal flu vaccines providing multi-year protection became available in 2024.",
      "latest pandemic": "The H5N1 bird flu strain has shown increased mammalian transmission in 2024-2025, prompting monitoring but not yet causing a human pandemic.",
      
      // Economy
      "us inflation rate": "The US inflation rate is approximately 2.8% as of April 2025.",
      "us unemployment rate": "The US unemployment rate is approximately 4.1% as of April 2025.",
      "dow jones": "The Dow Jones Industrial Average is trading around 43,000 points as of April 2025.",
      "s&p 500": "The S&P 500 is trading around 6,200 points as of April 2025.",
      "nasdaq": "The Nasdaq Composite is trading around 21,500 points as of April 2025.",
      "us interest rate": "The US Federal Reserve benchmark interest rate is 4.25% as of April 2025.",
      "uk interest rate": "The Bank of England base rate is 4.0% as of April 2025.",
      "eu interest rate": "The European Central Bank interest rate is 3.25% as of April 2025.",
      "oil price": "The price of Brent crude oil is approximately $85 per barrel as of April 2025.",
      "gold price": "The price of gold is approximately $2,800 per ounce as of April 2025.",
      "us national debt": "The US national debt exceeds $36 trillion as of April 2025.",
      
      // Demographics & Statistics
      "world population": "The world population is approximately 8.1 billion people as of 2025.",
      "us population": "The United States population is approximately 335 million people as of 2025.",
      "china population": "China's population is approximately 1.4 billion people as of 2025, with a continuing decline due to low birth rates.",
      "india population": "India's population is approximately 1.44 billion people as of 2025, having surpassed China as the world's most populous country.",
      "life expectancy us": "The life expectancy in the United States is approximately 77.5 years as of 2025.",
      "tallest building": "The Burj Khalifa in Dubai remains the tallest building in the world at 828 meters (2,717 feet).",
      "richest person": "Elon Musk is currently the richest person in the world with a net worth of approximately $280 billion.",
      
      // Historical Facts (for reference)
      "us independence": "The United States declared independence on July 4, 1776.",
      "usa independence": "The United States declared independence on July 4, 1776.",
      "moon landing": "Neil Armstrong and Buzz Aldrin first landed on the Moon on July 20, 1969, during NASA's Apollo 11 mission.",
      "berlin wall fall": "The Berlin Wall fell on November 9, 1989, marking the beginning of the end of the Cold War.",
      "wwii end": "World War II ended in Europe on May 8, 1945 (VE Day) and in the Pacific on September 2, 1945 (VJ Day).",
      "internet invented": "The Internet evolved from ARPANET, which was first connected in 1969, with the World Wide Web being invented by Tim Berners-Lee in 1989.",
      
      // Dynamic responses
      "current date": () => {
        return `Today is ${this.currentDate.fullDate}.`;
      },
      "what date": () => {
        return `Today is ${this.currentDate.fullDate}.`;
      },
      "what is today": () => {
        return `Today is ${this.currentDate.fullDate}.`;
      },
      "today date": () => {
        return `Today is ${this.currentDate.fullDate}.`;
      },
      "current year": () => {
        return `The current year is ${this.currentDate.year}.`;
      },
      "what year": () => {
        return `The current year is ${this.currentDate.year}.`;
      }
    };
    
    // Basic response patterns for common queries
    this.patterns = [
      // Format: [regex pattern, response function or string]
      [/^hi$|^hello$|^hey$/i, () => this.pickRandom([
        "Hi there! How can I help you today?",
        "Hello! What can I do for you?",
        "Hey! Nice to chat with you!"
      ])],
      
      [/^how are you$/i, () => this.pickRandom([
        "I'm doing great, thanks for asking! How about you?",
        "I'm good! Thanks for asking. What can I help with today?",
        "All systems operational! How can I assist you?"
      ])],
      
      [/^your name$/i, "I'm your friendly chatbot assistant!"],
      
      [/^thank you$|^thanks$/i, () => this.pickRandom([
        "You're welcome!",
        "Happy to help!",
        "Anytime! Need anything else?"
      ])],
      
      [/^bye$|^goodbye$|^see you$/i, () => this.pickRandom([
        "Goodbye! Have a great day!",
        "See you next time!",
        "Take care! Come back anytime."
      ])],
      
      [/^help$/i, "I can answer questions and help with tasks. What would you like to know?"],
      
      [/^what time|^current time$/i, "I don't have access to the current time, but your device should show it!"],
      
      [/^tell.*joke$/i, () => this.getJoke()],
      
      [/^ok$|^okay$/i, "Great! What else would you like to talk about?"],
      
      // New pattern for math calculations
      [/^(\d+)\s*[\*xX×]\s*(\d+)$|^(\d+)\s*[\*xX×]\s*(\d+)\s*(?:equal|equals|is)$/i, (match) => {
        // Extract the numbers from the regex match
        const num1 = parseInt(match[1] || match[3]);
        const num2 = parseInt(match[2] || match[4]);
        return `${num1} × ${num2} = ${num1 * num2}`;
      }],
      
      // Add more math operations
      [/^(\d+)\s*[+]\s*(\d+)$|^(\d+)\s*[+]\s*(\d+)\s*(?:equal|equals|is)$/i, (match) => {
        const num1 = parseInt(match[1] || match[3]);
        const num2 = parseInt(match[2] || match[4]);
        return `${num1} + ${num2} = ${num1 + num2}`;
      }],
      
      [/^(\d+)\s*[-]\s*(\d+)$|^(\d+)\s*[-]\s*(\d+)\s*(?:equal|equals|is)$/i, (match) => {
        const num1 = parseInt(match[1] || match[3]);
        const num2 = parseInt(match[2] || match[4]);
        return `${num1} - ${num2} = ${num1 - num2}`;
      }],
      
      [/^(\d+)\s*[\/÷]\s*(\d+)$|^(\d+)\s*[\/÷]\s*(\d+)\s*(?:equal|equals|is)$/i, (match) => {
        const num1 = parseInt(match[1] || match[3]);
        const num2 = parseInt(match[2] || match[4]);
        if (num2 === 0) return "Cannot divide by zero!";
        return `${num1} ÷ ${num2} = ${(num1 / num2).toFixed(2)}`;
      }]
    ];
    
    // Joke collection
    this.jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "What do you call a fake noodle? An impasta!",
      "How does a penguin build its house? Igloos it together!",
      "Why don't eggs tell jokes? They'd crack each other up!",
      "What's the best time to go to the dentist? Tooth-hurty!",
      "What did one wall say to the other wall? I'll meet you at the corner!"
    ];
    
    // Fallback responses for when AI fails
    this.fallbackResponses = [
      "I'm not sure I understand. Could you explain differently?",
      "That's an interesting question. Let me think about it.",
      "I'm not sure about that. Could you try asking in a different way?",
      "I'm still learning! Could you try asking something else?",
      "I don't have enough information to answer that question properly."
    ];
  }
  
  // Helper to pick a random response
  pickRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
  }
  
  // Get a random joke
  getJoke() {
    return this.pickRandom(this.jokes);
  }
  
  // Improved fact query checker with better partial matching
  checkFactQuery(message) {
    const normalizedMessage = message.toLowerCase().trim();
    
    // Check for exact matches first
    if (this.facts[normalizedMessage]) {
      return typeof this.facts[normalizedMessage] === 'function'
        ? this.facts[normalizedMessage].call(this) // Use .call(this) to ensure 'this' context is preserved
        : this.facts[normalizedMessage];
    }
  
    // Check for partial matches with improved word-by-word matching
    for (const factKey in this.facts) {
      // If the user message contains all the words from a fact key
      const factKeyWords = factKey.split(' ');
      const messageWords = normalizedMessage.split(' ');
  
      // Check if each word in the fact key is present in the message
      // (This allows for extra words in the user message)
      if (factKeyWords.every(word => messageWords.includes(word))) {
        return typeof this.facts[factKey] === 'function'
          ? this.facts[factKey].call(this)
          : this.facts[factKey];
      }
  
      // Also check if the message contains the entire factKey as a substring
      if (normalizedMessage.includes(factKey)) {
        return typeof this.facts[factKey] === 'function'
          ? this.facts[factKey].call(this)
          : this.facts[factKey];
      }
    }
  
    // Enhanced partial matching for leaders (handling variations like "president france")
    if (normalizedMessage.includes("president") || normalizedMessage.includes("prime minister")) {
      // Extract country references
      const countries = [
        { name: "us", variations: ["us", "usa", "america", "united states", "american"] },
        { name: "uk", variations: ["uk", "britain", "england", "british", "united kingdom"] },
        { name: "france", variations: ["france", "french"] },
        { name: "russia", variations: ["russia", "russian"] },
        { name: "china", variations: ["china", "chinese"] },
        { name: "india", variations: ["india", "indian"] },
        { name: "japan", variations: ["japan", "japanese"] },
        { name: "australia", variations: ["australia", "australian"] },
        { name: "brazil", variations: ["brazil", "brazilian"] },
        { name: "mexico", variations: ["mexico", "mexican"] },
        { name: "germany", variations: ["germany", "german"] },
        { name: "italy", variations: ["italy", "italian"] },
        { name: "spain", variations: ["spain", "spanish"] },
        { name: "canada", variations: ["canada", "canadian"] },
        { name: "korea", variations: ["korea", "korean", "south korea"] }
      ];
  
      // Check for each country in the user message
      for (const country of countries) {
        if (country.variations.some(variation => normalizedMessage.includes(variation))) {
          // Check for president or prime minister
          if (normalizedMessage.includes("president")) {
            const factKey = `${country.name} president`;
            if (this.facts[factKey]) {
              return this.facts[factKey];
            }
          }
          if (normalizedMessage.includes("prime") || normalizedMessage.includes("minister")) {
            const factKey = `${country.name} prime minister`;
            if (this.facts[factKey]) {
              return this.facts[factKey];
            }
          }
        }
      }
    }
  
    return null;
  }
  
  // Process message with pattern matching first
  processLocalMessage(message) {
    // Check for facts first
    const factResponse = this.checkFactQuery(message);
    if (factResponse) {
      return {
        reply: factResponse,
        source: 'local'
      };
    }
    
    // Check for exact pattern matches
    for (const [pattern, response] of this.patterns) {
      const match = message.match(pattern);
      if (match) {
        return {
          reply: typeof response === 'function' ? response(match) : response,
          source: 'local'
        };
      }
    }
    
    // No pattern match, use AI
    return { source: 'ai' };
  }
  
  // Get fallback response when AI fails
  getFallbackResponse() {
    return this.pickRandom(this.fallbackResponses);
  }
}

// Create chatbot instance
const chatbot = new HybridChatbot();

// Route for handling chat requests
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  console.log("User message:", userMessage);
  
  // First try local pattern matching
  const result = chatbot.processLocalMessage(userMessage);
  
  // If local match found, return it
  if (result.source === 'local') {
    return res.json({ reply: result.reply });
  }
  
  // Otherwise, use Mistral AI (more reliable than DeepSeek)
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000', // Add referer for OpenRouter
        'X-Title': 'Simple Chatbot' // Add title for OpenRouter
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free', // Use Mistral instead of DeepSeek
        messages: [
          { role: 'system', content: 'You are a helpful assistant. Keep your responses concise, accurate, and friendly. Respond in English only. Limit responses to 1-3 sentences for simple questions.' },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 150,
        temperature: 0.7
      }),
    });

    const data = await response.json();
    console.log('AI raw response:', JSON.stringify(data, null, 2));

    if (data && data.choices && data.choices.length > 0) {
      const aiReply = data.choices[0].message.content;
      
      // Validate response (ensure it's English and reasonable length)
      if (aiReply && aiReply.length > 0 && aiReply.length < 500) {
        return res.json({ reply: aiReply });
      }
    }
    
    // If we get here, the AI response wasn't valid
    return res.json({ reply: chatbot.getFallbackResponse() });
    
  } catch (error) {
    console.error('Error during AI fetch:', error);
    // Return a fallback response when AI fails
    return res.json({ reply: chatbot.getFallbackResponse() });
  }
});

// Healthcheck endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
