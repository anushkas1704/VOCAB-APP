import React, { useState } from 'react';

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
    const randomWords = ["study", "abstract", "innovation", "technology", "react"];
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
              <h4>{definition}</h4>
              {example && (
                <div>
                  <h2>Example</h2>
                  <h4>{example}</h4>
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
          <h4>{word}</h4>
          <h2>Definition</h2>
          <h4>{definition}</h4>
          {example && (
            <div>
              <h2>Example</h2>
              <h4>{example}</h4>
            </div>
          )}
          <button className="fetch-button" onClick={() => setIsRandom(false)}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default App;
