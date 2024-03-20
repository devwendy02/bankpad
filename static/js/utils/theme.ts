const GRAVATAR_COLOR_RANGE = 9;

export function gravatarColor(name = '') {
  let text = name || 'U';
  let sum = 0;
  if (text) {
    for (let i = 0; i < text.length; i++) {
      sum += text.charCodeAt(i);
    }
    return 'gravatar--' + sum % GRAVATAR_COLOR_RANGE;
  }
  return text
}
