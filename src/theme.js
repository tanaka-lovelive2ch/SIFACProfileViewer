function rgba(r, g, b, a) {
  return ('rgba(' + r + ',' + g + ',' + b + ',' + a +')')
}

const Theme = {
  button: {
    primary: '#393e7a',
    disabled: '#ccc'
  },
  header: {
    style: {
      backgroundColor: '#393e7a'
    },
    tintColor: '#fff'
  },
  primary: {
    rgba: rgba.bind(null, 57, 62, 122)
  }
}

export default Theme
