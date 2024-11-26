import React, { useState } from 'react';
import './App.css'
const App = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');

  const fetchWord = async (word) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      setDefinition(data[0].meanings[0].definitions[0].definition);
      setExample(data[0].meanings[0].definitions[0].example);
    } catch (error) {
      setDefinition('Word not found');
      setExample('');
    }
  };

  const handleRandomWord = async () => {
    const randomWords = [
      "abash", "abate", "abdicate", "aberration", "abstain", "abstruse", "acknowledgment", "adequate", "adjudicate",
      "adroit", "adversity", "amicable", "analogous", "annul", "applause", "apprehension", "aquatic", "arbitrary",
      "arid", "aristocracy", "articulation", "aspiration", "assessment", "assimilate", "asylum", "available", "avert",
      "basin", "bemoan", "benevolent", "bewildered", "bias", "boisterous", "boondoggle", "brazen", "brusque", "canny",
      "capability", "capacious", "capitulate", "caveat", "chaff", "chronic", "circumvent", "clairvoyant", "classic",
      "cognitive", "coherence", "collaborate", "combat", "commemorate", "commission", "comply", "concept", "concomitant",
      "condescending", "condition", "conjunction", "conspicuous", "constrain", "context", "controversy", "corollary",
      "corrugated", "covert", "decipher", "defunct", "delineate", "diversity", "dominant", "effective", "efficacy",
      "efficient", "elliptical", "eloquent", "embellish", "emission", "encompass", "endow", "engender", "enhancement",
      "enormous", "environment", "ethnic", "eventually", "evident", "expanse", "explicit", "export", "extravagant",
      "facilitate", "fiduciary", "finance", "framework", "frugality", "gregarious", "habitat", "harass", "harassment",
      "hereditary", "heritage", "hone", "hybrid", "illegitimate", "immerse", "immigrant", "imperative", "implicit",
      "improbable", "inalienable", "incident", "income", "indict", "indigenous", "infrastructure", "inimical",
      "innovative", "integrate", "intransigence", "jurisdiction", "jurisprudence", "kaleidoscope", "laud", "laudatory",
      "legacy", "legislate", "livelihood", "malediction", "mandate", "mayhem", "methodology", "migratory", "motivate",
      "muster", "nonetheless", "notorious", "obliterate", "omnipotent", "outwit", "pandemic", "paradigm", "parameter",
      "participation", "pecuniary", "perceive", "percent", "perception", "perpetual", "phenomenon", "pledge", "plight",
      "plummet", "poise", "precipice", "predict", "premise", "prestige", "promulgate", "quench", "reciprocal",
      "recrimination", "rehabilitation", "reliance", "reliant", "rupture", "saga", "scold", "seasoned", "sector",
      "segment", "sheer", "spatial", "spur", "stagnant", "stipulate", "strategy", "sustainable", "swamp", "swindler",
      "thesis", "threshold", "tradition", "trajectory", "transformation", "transition", "trivia", "unequivocal",
      "untenable", "verdict", "vicinity", "vulnerable", "widespread", "wrought", "xenophobia", "yearn", "yeoman",
      "zenith"
    ];
  
    const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    setWord(randomWord);
    fetchWord(randomWord);
  };

  const handleSearch = () => {
    setIsSearch(true);
    setIsRandom(false);
  };

  const handleRandom = () => {
    setIsRandom(true);
    setIsSearch(false);
    handleRandomWord();
  };

  return (
    <div className="app-container">
      <img src='images/logo.png' alt="Logo" className="logo" />
      <h1 className="main-heading">LEARN A NEW WORD EVERYDAY</h1>

      {!isSearch && !isRandom && (
        <div>
          <button className="fetch-button" onClick={handleSearch}>Search a Word</button>
          <button className="fetch-button" onClick={handleRandom}>Random Word of the Day</button>
        </div>
      )}

      {/* Search Word Screen */}
      {isSearch && (
        <div className="search">
          <input
            type="text"
            placeholder="Enter a word"
            className="input-field"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button className="fetch-button" onClick={() => fetchWord(word)}>Search</button>
          {definition && (
            <div>
              <h2>Definition</h2>
              <p>{definition}</p>
              {example && (
                <div>
                  <h2>Example</h2>
                  <p>{example}</p>
                </div>
              )}
            </div>
          )}
          <button className="fetch-button" onClick={() => setIsSearch(false)}>Go Back</button>
        </div>
      )}

      {/* Random Word Screen */}
      {isRandom && (
        <div className="random">
          <h2>Word of the Day</h2>
          <p>{word}</p>
          <h2>Definition</h2>
          <p>{definition}</p>
          {example && (
            <div>
              <h2>Example</h2>
              <p>{example}</p>
            </div>
          )}
          <button className="fetch-button" onClick={() => setIsRandom(false)}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default App;
