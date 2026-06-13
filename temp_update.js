import fs from 'fs';
const games = ['pips', 'wordle', 'strands'];
games.forEach(game => {
    const file = 'scripts/content-generator/' + game + '-auto-fetch-generate.js';
    let content = fs.readFileSync(file, 'utf-8');
    const Name = game.charAt(0).toUpperCase() + game.slice(1);
    const seoBlock = `### SEO Keyword Injection (MANDATORY BUT MUST BE NATURAL)
You should try to weave 1 or 2 (NOT ALL) of the following phrases into your conversational hints:
- "NYT ${Name} hints today"
- "${Name} solver"
- "${Name} answer today"
- "today's ${Name} solution"
WARNING: DO NOT keyword stuff. Google penalizes robotic keyword stuffing. Pick a maximum of 2 phrases and spread them out organically so they sound like natural gamer chatter (e.g. "If you're looking for the full ${Name} answer today, this first hint is..."). If it feels forced, leave it out.

### The Stages (CRITICAL SEO REQUIREMENT)`;
    content = content.replace('### The Stages (CRITICAL SEO REQUIREMENT)', seoBlock);
    fs.writeFileSync(file, content);
});
console.log('SEO blocks injected into generator scripts.');
