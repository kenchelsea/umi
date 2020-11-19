function isKey(key:string) {
  // eslint-disable-next-line no-useless-escape
  return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
}

export default {
  put(key: string, value: string, {
    domain = '.dstcar.com',
    path = '/',
    expireTimes = ''
  } = {}) {
    let val = value
    if (value && value.constructor === Object) {
      val = JSON.stringify(value);
    }
    // new Date('2030-12-24 00:00:00').toGMTString()
    let expires = ''
    if (expireTimes) {
      expires = `expires=${expireTimes};`
    }
    if (process.env.NODE_ENV !== 'production') {
      domain = ``
    }
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(val)};path=${path};${expires}domain=${domain}`;
  },
  get(key: string) {
    var value =
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            '(?:(?:^|.*;)\\s*' +
            // eslint-disable-next-line no-useless-escape
            encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') +
            '\\s*\\=\\s*([^;]*).*$)|^.*$'
          ),
          '$1'
        )
      ) || null

    if (value && value.startsWith('{') && value.endsWith('}')) {
      try {
        value = JSON.parse(value)
      } catch (e) {
        return value
      }
    }
    return value
    // return '6115fcc69c9e46eb9fb2101cd091cd3a'
  },
  clear(key: string, { domain = '.dstcar.com', path = '/' } = {}) {
    if (!key || !isKey(key)) {
      return false;
    }
    if (process.env.NODE_ENV !== 'production') {
      domain = ``
    }
    document.cookie = `${encodeURIComponent(key)}=;expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${domain};path=${path}`;
  }
}
