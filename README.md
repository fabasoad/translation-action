# Translation action

[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://stand-with-ukraine.pp.ua)
![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/fabasoad/translation-action?include_prereleases)
![unit-tests](https://github.com/fabasoad/translation-action/actions/workflows/unit-tests.yml/badge.svg)
![test-providers](https://github.com/fabasoad/translation-action/actions/workflows/test-providers.yml/badge.svg)
![test-source](https://github.com/fabasoad/translation-action/actions/workflows/test-source.yml/badge.svg)
![security](https://github.com/fabasoad/translation-action/actions/workflows/security.yml/badge.svg)
![linting](https://github.com/fabasoad/translation-action/actions/workflows/linting.yml/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/84bb3beceb9503272bc9/maintainability)](https://codeclimate.com/github/fabasoad/translation-action/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/84bb3beceb9503272bc9/test_coverage)](https://codeclimate.com/github/fabasoad/translation-action/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/fabasoad/translation-action/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fabasoad/translation-action?targetFile=package.json)

This action translates any text to any language supported by chosen provider.
There is a list of providers that can be used for text translation. Please find
more details for each provider below.

## Contents

<!-- TOC -->
* [Translation action](#translation-action)
  * [Contents](#contents)
  * [Inputs](#inputs)
  * [Outputs](#outputs)
  * [Providers](#providers)
    * [DeepL](#deepl)
    * [Google](#google)
    * [LibreTranslate](#libretranslate)
    * [Linguatools](#linguatools)
    * [Microsoft](#microsoft)
    * [MyMemory](#mymemory)
    * [FunTranslations](#funtranslations)
<!-- TOC -->

## Inputs

| Name                     | Required | Description                                                                                      | Default | Possible values                                                                                                                                                                         |
|--------------------------|----------|--------------------------------------------------------------------------------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| source                   | Yes      | Can be text or path to the file for translation                                                  |         | _&lt;Path&gt;_,_&lt;String&gt;_                                                                                                                                                         |
| provider                 | Yes      | Provider identifier                                                                              |         | [deepl](#deepl), [google](#google), [libretranslate](#libretranslate), [linguatools](#linguatools), [microsoft](#microsoft), [mymemory](#mymemory), [funtranslations](#funtranslations) |
| api_key                  | No       | API key that should be used for chosen [provider](#providers)                                    | `""`    | _&lt;String&gt;_                                                                                                                                                                        |
| api_additional_parameter | No       | Additional parameter for the API. eg the region for Microsoft: `canadacentral`                   | `""`    | _&lt;String&gt;_                                                                                                                                                                        |
| lang                     | Yes      | The translation direction. Should be one of the option proposed by chosen [provider](#providers) |         | _&lt;String&gt;_                                                                                                                                                                        |

## Outputs

| Name | Required | Description     |
|------|----------|-----------------|
| text | Yes      | Translated text |

## Providers

### DeepL

* Identifier is `deepl`.
* Supported translation directions can be found [here](https://www.deepl.com/docs-api/general/get-languages/).
  * Be aware that source and target languages should be separated by `-` (hyphen)
  character while using them in `lang` input. For example, `en-uk` should be used
  in case you want to translate text from English into Ukrainian. See example
  below for more details.
* How to get API key:
  * Sign up to [DeepL](https://www.deepl.com) (free plan is fine).
  * Go to `Account -> Account -> Authentication Key for DeepL API` section

Example of translating "Love" word from English into Ukrainian:

```yaml
jobs:
  deepl:
    name: DeepL
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: fabasoad/translation-action@main
        id: deepl-step
        with:
          provider: deepl
          lang: en-uk
          source: Love
          api_key: ${{ secrets.DEEPL_API_KEY }}
      - name: Print the result
        run: echo "Translation is '${{ steps.deepl-step.outputs.text }}'"
        shell: sh
```

Output is the following:

```text
> echo "Translation is 'Любов'"
Translation is 'Любов'
```

### Google

* Identifier is `google`.
* Supported translation directions can be found [here](https://github.com/AidanWelch/google-translate-api/blob/master/index.d.ts#L67).
  * Be aware that source and target languages should be separated by `-` (hyphen)
  character while using them in `lang` input. For example, `ms-en` should be used
  in case you want to translate text from Malay into English. See example below
  for more details.

Example of translating "Victory" word from Malay into English:

```yaml
jobs:
  google:
    name: Google
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: fabasoad/translation-action@main
        id: google-step
        with:
          provider: google
          lang: ms-en
          source: Kemenangan
      - name: Print the result
        run: echo "Translation is '${{ steps.google-step.outputs.text }}'"
        shell: sh
```

Output is the following:

```text
> echo "Translation is 'Victory'"
Translation is 'Victory'
```

### LibreTranslate

* Identifier is `libretranslate`.
* Supported translation directions can be found [here](https://libretranslate.com/languages).
  * Be aware that source and target languages should be separated by `-` (hyphen)
    character while using them in `lang` input. For example, `en-es` should be used
    in case you want to translate text from English into Spanish. See example
    below for more details.
* How to get API key:
  * Sign up to [LibreTranslate](https://portal.libretranslate.com/).
  * Go to `Home -> Get API Key` section

Example of translating "Victory" word from English into Ukrainian:

```yaml
jobs:
  libretranslate:
    name: LibreTranslate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: fabasoad/translation-action@main
        id: libretranslate-step
        with:
          provider: libretranslate
          lang: en-uk
          source: Victory
          api_key: ${{ secrets.LIBRETRANSLATE_API_KEY }}
      - name: Print the result
        run: echo "Translation is '${{ steps.libretranslate-step.outputs.text }}'"
        shell: sh
```

Output is the following:

```text
> echo "Translation is 'Перемога'"
Translation is 'Перемога'
```

### Linguatools

* Identifier is `linguatools`. API Key is not needed for this provider.
* Supported translation directions:

```text
"de-en","de-es","de-nl","de-pl","de-it","de-cs","en-de","es-de","nl-de","pl-de","it-de","cs-de"
```

### Microsoft

* Identifier is `microsoft`.
* Supported translation directions:

```text
"af","ar","bg","bn","bs","ca","cs","cy","da","de","el","en","es","et","fa","fi","fr","he","hi","hr","ht","hu","id","is","it","ja","ko","lt","lv","ms","mt","mww","nb","nl","pl","pt","ro","ru","sk","sl","sr-Latn","sv","sw","ta","th","tlh-Latn","tr","uk","ur","vi","zh-Hans"
```

* How to get API key:

Please follow the steps described in [this](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/translator-text-how-to-signup)
article.

You will also need to provide the region of the key using the
`api_additional_parameter`, e.g.:

```YAML
with:
  api_additional_parameter: canadacentral
```

### MyMemory

* Identifier is `mymemory`.
* Supported translation directions:

Language direction should be separated by `|` character. For example, `en|it`
(from English to Italian). More details [here](https://mymemory.translated.net/doc/spec.php).

* How to get API key:

API Key is _optional_. Visit [Usage Limit Page](https://mymemory.translated.net/doc/usagelimits.php)
to see the usage limit for free accounts. In case you want to use your API KEY,
you should go to [Registration Page](https://www.translated.net/top/) and
register a new account. Then go to [API Key Generator Page](https://mymemory.translated.net/doc/keygen.php)
and generate a new key.

### FunTranslations

* Identifier is `funtranslations`.
* Supported translation directions:

`from` direction is English only at this moment, so `lang` parameter can be
found [here](https://funtranslations.com/api/). Example:

```yaml
- uses: fabasoad/translation-action@main
  with:
    provider: funtranslations
    lang: 'klingon'
    source: 'Who are you'
```

## Contributions

![Alt](https://repobeats.axiom.co/api/embed/666b4ed5b82273f6ecae26db931e5c9dd71b65b1.svg "Repobeats analytics image")
