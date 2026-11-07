'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { parseConfig } = require('./config-parser');

test('input valido: chiavi e valori sono ripuliti ai bordi', () => {
  const result = parseConfig(' host = localhost \n PORT_2 = 8080 ');
  assert.equal(result.host, 'localhost');
  assert.equal(result.PORT_2, '8080');
  assert.equal(Object.keys(result).length, 2);
});

test('commenti e righe vuote sono ignorati', () => {
  const result = parseConfig('\n   # commento\n \t\nmode = dev # testo del valore\n# fine');
  assert.equal(result.mode, 'dev # testo del valore');
  assert.equal(Object.keys(result).length, 1);
});

test('il valore conserva ulteriori caratteri =', () => {
  const result = parseConfig('url = proto://host?a=b=c');
  assert.equal(result.url, 'proto://host?a=b=c');
});

test('chiave non valida: errore con numero di riga', () => {
  assert.throws(
    () => parseConfig('# commento\n9chiave = x'),
    { message: 'Riga 2: chiave non valida: "9chiave"' },
  );
});

test('separatore mancante: errore con numero di riga', () => {
  assert.throws(
    () => parseConfig('ok = x\nnessun_separatore'),
    { message: "Riga 2: separatore '=' mancante" },
  );
});

test('chiave duplicata: errore con numero di riga', () => {
  assert.throws(
    () => parseConfig('  name = primo\n# commento\n name=secondo'),
    { message: 'Riga 3: chiave duplicata: "name"' },
  );
});

test('chiavi speciali valide non alterano il prototipo', () => {
  const result = parseConfig('__proto__ = sicuro\nconstructor = valore');
  assert.equal(result.__proto__, 'sicuro');
  assert.equal(result.constructor, 'valore');
  assert.equal(Object.getPrototypeOf(result), null);
});

test('terminatori CRLF e valore vuoto sono supportati', () => {
  const result = parseConfig('a=\r\nb = valore\r\n');
  assert.equal(result.a, '');
  assert.equal(result.b, 'valore');
});
