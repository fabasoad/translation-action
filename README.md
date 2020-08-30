# Translation action
![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/fabasoad/translation-action?include_prereleases) ![CI (latest)](https://github.com/fabasoad/translation-action/workflows/CI%20(latest)/badge.svg) ![CI (main)](https://github.com/fabasoad/translation-action/workflows/CI%20(main)/badge.svg) ![YAML Lint](https://github.com/fabasoad/translation-action/workflows/YAML%20Lint/badge.svg) [![Total alerts](https://img.shields.io/lgtm/alerts/g/fabasoad/translation-action.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fabasoad/translation-action/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/fabasoad/translation-action.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fabasoad/translation-action/context:javascript) [![Maintainability](https://api.codeclimate.com/v1/badges/84bb3beceb9503272bc9/maintainability)](https://codeclimate.com/github/fabasoad/translation-action/maintainability) [![Known Vulnerabilities](https://snyk.io/test/github/fabasoad/translation-action/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fabasoad/translation-action?targetFile=package.json)

This action translates any text to any language supported by chosen provider. There is a list of providers that can be used for text translation. Please find more details for each provider below.

## Contents
- [Providers](#providers)
  - [Linguatools](#linguatools)
  - [Microsoft](#microsoft)
  - [MyMemory](#mymemory)
  - [Yandex](#yandex)
- [Inputs](#inputs)
- [Outputs](#outputs)
- [Example usage](#example-usage)

## Providers

### Linguatools
Identifier is `linguatools`. API Key is not needed for this provider.
#### Supported translation directions
```json
"de-en","de-es","de-nl","de-pl","de-it","de-cs","en-de","es-de","nl-de","pl-de","it-de","cs-de"
```

### Microsoft
Identifier is `microsoft`.
#### Supported translation directions
```json
"af","ar","bg","bn","bs","ca","cs","cy","da","de","el","en","es","et","fa","fi","fr","he","hi","hr","ht","hu","id","is","it","ja","ko","lt","lv","ms","mt","mww","nb","nl","pl","pt","ro","ru","sk","sl","sr-Latn","sv","sw","ta","th","tlh-Latn","tr","uk","ur","vi","zh-Hans"
```
#### How to get API key
Please follow the steps described in [this](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/translator-text-how-to-signup) article.

You will also need to provide the region of the key using the `api_additional_parameter` eg

```YAML
with:
  api_additional_parameter: canadacentral
```

### MyMemory
Identifier is `mymemory`.
#### Supported translation directions
Language direction should be separated by `|` character. For example, `en|it` (from English to Italian). More details [here](https://mymemory.translated.net/doc/spec.php).
#### How to get API key
API Key is _optional_. Visit [Usage Limit Page](https://mymemory.translated.net/doc/usagelimits.php) to see the usage limit for free accounts. In case you want to use your API KEY, you should go to [Registration Page](https://www.translated.net/top/) and register a new account. Then go to [API Key Generator Page](https://mymemory.translated.net/doc/keygen.php) and generate a new key.

### Yandex
Identifier is `yandex`.
#### Supported translation directions
```json
"az-ru","be-bg","be-cs","be-de","be-en","be-es","be-fr","be-it","be-pl","be-ro","be-ru","be-sr","be-tr","bg-be","bg-ru","bg-uk","ca-en","ca-ru","cs-be","cs-en","cs-ru","cs-uk","da-en","da-ru","de-be","de-en","de-es","de-fr","de-it","de-ru","de-tr","de-uk","el-en","el-ru","en-be","en-ca","en-cs","en-da","en-de","en-el","en-es","en-et","en-fi","en-fr","en-hu","en-it","en-lt","en-lv","en-mk","en-nl","en-no","en-pt","en-ru","en-sk","en-sl","en-sq","en-sv","en-tr","en-uk","es-be","es-de","es-en","es-ru","es-uk","et-en","et-ru","fi-en","fi-ru","fr-be","fr-de","fr-en","fr-ru","fr-uk","hr-ru","hu-en","hu-ru","hy-ru","it-be","it-de","it-en","it-ru","it-uk","lt-en","lt-ru","lv-en","lv-ru","mk-en","mk-ru","nl-en","nl-ru","no-en","no-ru","pl-be","pl-ru","pl-uk","pt-en","pt-ru","ro-be","ro-ru","ro-uk","ru-az","ru-be","ru-bg","ru-ca","ru-cs","ru-da","ru-de","ru-el","ru-en","ru-es","ru-et","ru-fi","ru-fr","ru-hr","ru-hu","ru-hy","ru-it","ru-lt","ru-lv","ru-mk","ru-nl","ru-no","ru-pl","ru-pt","ru-ro","ru-sk","ru-sl","ru-sq","ru-sr","ru-sv","ru-tr","ru-uk","sk-en","sk-ru","sl-en","sl-ru","sq-en","sq-ru","sr-be","sr-ru","sr-uk","sv-en","sv-ru","tr-be","tr-de","tr-en","tr-ru","tr-uk","uk-bg","uk-cs","uk-de","uk-en","uk-es","uk-fr","uk-it","uk-pl","uk-ro","uk-ru","uk-sr","uk-tr"
```
#### How to get API key
Go to the [Developer's page](https://translate.yandex.com/developers) and click on `Login`->`Register` and register a new account. Then go to the [API keys page](https://translate.yandex.com/developers/keys) and copy API key:

![Result](https://raw.githubusercontent.com/fabasoad/translation-action/main/screenshots/screenshot-yandex-api-key.png)

## Inputs
| Name     | Required | Description                                                                                      | Default | Possible values                                                   |
|----------|----------|--------------------------------------------------------------------------------------------------|---------|-------------------------------------------------------------------|
| source   | Yes      | Can be text or path to the file for translation.                                                 |         | _&lt;Path&gt;_,_&lt;String&gt;_                             |
| provider | Yes      | Provider identifier                                                                              |         | [microsoft](#microsoft), [mymemory](#mymemory), [yandex](#yandex) |
| api_key  | No       | API key that should be used for chosen [provider](#providers)                                    | null    | _&lt;String&gt;_                                                  |
| lang     | Yes      | The translation direction. Should be one of the option proposed by chosen [provider](#providers) |         | _&lt;String&gt;_                                                  |

## Outputs
| Name | Required | Description     |
|------|----------|-----------------|
| text | Yes      | Translated text |

## Example usage

### Workflow configuration

```yaml
name: Translation

on: push

jobs:
  translation:
    name: Run translation
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: fabasoad/translation-action@v1.0.0
        id: translation
        with:
          provider: yandex
          api_key: ${{ secrets.YANDEX_API_KEY }}
          lang: 'en-ru'
          source: 'This is awesome project! Thank you.'
      - name: Print translation result
        run: echo "${{ steps.translation.outputs.text }}"
```

### Result
![Result](https://raw.githubusercontent.com/fabasoad/translation-action/main/screenshots/screenshot-yandex-result.png)
