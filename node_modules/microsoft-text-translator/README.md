
# Microsoft Text Translate API V3 module for nodejs

[Microsoft Translator API Reference](https://docs.microsoft.com/en-gb/azure/cognitive-services/translator/reference/v3-0-reference)

### Methods

* `getLanguages`. Gets the set of languages currently supported by other operations of the Translator Text API.
* `translate`. Translates text.
* `transliterate`. Converts text in one language from one script to another script.
* `detectLanguage`. Identifies the language of a piece of text.
* `breakSentence`. Identifies the positioning of sentence boundaries in a piece of text.
* `lookupDictionary`. Provides alternative translations for a word and a small number of idiomatic phrases.
* `dictionaryExamples`. Provides examples that show how terms in the dictionary are used in context. 

### Installation

$ npm i microsoft-text-translator

An API key from portal.azure.com is needed to initialize client.

### Example usage - Translate

```js
const translator = new MsTextTranslator({ credentials: { subscriptionKey: '' } });
const translation = await translator.translate([{ text: 'Hello, what is your name?' }], {
  from: 'en',
  to: 'zh-Hans',
});
```

### Example usage - Transliterate

```js
const translator = new MsTextTranslator({ credentials: { subscriptionKey: '' } });
const transliteration = await translator.transliterate([{
	text: 'こんにちは',
},], {
    language: 'ja',
    fromScript: 'jpan',
    toScript: 'latn',
   });
```

### Example usage - Detect language

```js
const translator = new MsTextTranslator({ credentials: { subscriptionKey: '' } });
const detect = await translator.detectLanguage([
	{ text: 'Ich würde wirklich gern Ihr Auto um den Block fahren ein paar Mal.' },
]);
```

### Example usage - Break sentence

```js
const translator = new MsTextTranslator({ credentials: { subscriptionKey: '' } });
const breaksentence = await translator.breakSentence([
	{ text: 'How are you? I am fine. What did you do today?' },
]);
```

### Example usage - Dictionary Lookup

```js
const translator = new MsTextTranslator({ credentials: { subscriptionKey: '' } });
const lookup = await translator.lookupDictionary([{ text: 'rahaa' }], { from: 'fi', to: 'en' });
```


### Example usage - Dictionary examples

```js
const translator = new MsTextTranslator({ credentials: { subscriptionKey: '' } });
const examples = await translator.dictionaryExamples([{ text: 'fly', translation: 'volar' }], {
  from: 'en',
  to: 'es',
});
```