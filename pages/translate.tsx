import { useState } from 'react';
import { useTranslation } from '../contexts/TranslationContext';

const TranslatePage = () => {
  const { t, changeLocale } = useTranslation();
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = () => {
    setTranslatedText(t(inputText));
  };

  const handleChangeLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLocale(e.target.value);
  };

  return (
    <div>
      <select onChange={handleChangeLocale}>
        <option value="gooniyandi">Gooniyandi</option>
        <option value="kriol">Kriol</option>
        {/* Add languages */}
      </select>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <button onClick={handleTranslate}>Translate</button>
      {translatedText && (
        <div>
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslatePage;

