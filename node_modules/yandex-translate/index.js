var request = require('request');
var endpoint = 'https://translate.yandex.net/api/v1.5/tr.json';

var jsonRequest = function(url, params, cb) {
  var handler = function(err, res) {
    if (err)
      return cb(err);
    var obj;
    try {
      obj = JSON.parse(res.body);
    } catch(e) {
      cb(e);
    }
    cb(null, obj);
  };
  if (params.get === true)
    request.get(url, handler);
  else
    request.post(url, params, handler);
};

module.exports = function(apiKey) {

  var translate = function translate(text, opts, cb) {
    var topts = typeof opts;
    if (topts == 'function' || topts == 'undefined') {
      if (topts == 'function')
        cb = opts;
      opts = {
        to: 'en',
        format: 'text'
      };
    }
    opts.key = apiKey;
    if (!opts.to)
      opts.to = 'en';
    if (!opts.format)
      opts.format = 'text';
    jsonRequest(endpoint + '/translate', {
        form: {
          text: text,
          key: opts.key,
          format: opts.format,
          lang: opts.from ? opts.from + '-' + opts.to : opts.to
        }
    }, cb);
  };

  var getLanguages = function getLanguages(opts, cb) {
    if (typeof opts == 'function') {
      cb = opts;
      opts = {};
    }
    opts.key = apiKey;
    var qs = require('querystring');
    jsonRequest(endpoint + '/getLangs?' + qs.stringify(opts), { get: true }, cb);
  };

  var detect = function detect(text, opts, cb) {
    var topts = typeof opts;
    if (topts == 'function' || topts == 'undefined') {
      if (topts == 'function')
        cb = opts;
      opts = {
        format: 'text'
      };
    }
    if (!opts.format)
      opts.format = 'text';
    opts.key = apiKey;
    jsonRequest(endpoint + '/detect', {
          form: {
            text: text,
            key: opts.key,
            format: opts.format
          }
       }, cb);
  };

  return {
    translate: translate,
    getLanguages: getLanguages,
    detect: detect
  };
}

// simple inline test
if (require.main === module) {

  var yandex = module.exports(process.env.YANDEXKEY);

  yandex.translate('Граждане Российской Федерации имеют право собираться мирно без оружия, проводить собрания, митинги и демонстрации, шествия и пикетирование', function(err, res) {
    console.assert(err === null, "Got transport level errors");
    console.assert(res.code === 200, "Non 200 HTTP code");
    console.assert(res.lang === "ru-en", "Language autodetected incorrectly");
    console.log(res.text.join());
  });
}
