'use strict';

function parseConfig(input) {
  if (typeof input !== 'string') {
    throw new TypeError('La configurazione deve essere una stringa');
  }

  const config = Object.create(null);
  const lines = input.split(/\r\n|\n|\r/);

  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const trimmed = line.trim();

    if (trimmed === '' || trimmed.startsWith('#')) return;

    const separator = line.indexOf('=');
    if (separator === -1) {
      throw new Error(`Riga ${lineNumber}: separatore '=' mancante`);
    }

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();

    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) {
      throw new Error(`Riga ${lineNumber}: chiave non valida: ${JSON.stringify(key)}`);
    }

    if (Object.hasOwn(config, key)) {
      throw new Error(`Riga ${lineNumber}: chiave duplicata: ${JSON.stringify(key)}`);
    }

    config[key] = value;
  });

  return config;
}

module.exports = { parseConfig };
