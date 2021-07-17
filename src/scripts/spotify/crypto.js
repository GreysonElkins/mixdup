const randomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const createCodeVerifier = () => {
  let verifier = []
  const options = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`
  let limit = randomNumberBetween(43, 128)
  for (let i = 0; i <= limit; i++) {
    verifier[i] = options[randomNumberBetween(0, options.length - 1)]
  }
  return verifier.join('')
}

export const createVerifierAndChallenge = async () => {
  const verifier = createCodeVerifier()
  const challenge = await pkce_challenge_from_verifier(verifier)
  localStorage.setItem('spotifyCodes', JSON.stringify({ challenge, verifier }))
}

export const retrieveVerifierAndChallenge = () => {
  return JSON.parse(localStorage.getItem('spotifyCodes'))
}

// FUNCTIONS FROM https://stackoverflow.com/questions/59911194/how-to-calculate-pckes-code-verifier/59913241#59913241
function sha256(plain) {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

function base64urlencode(a) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

async function pkce_challenge_from_verifier(v) {
  const hashed = await sha256(v)
  const base64encoded = base64urlencode(hashed)
  return base64encoded
}
