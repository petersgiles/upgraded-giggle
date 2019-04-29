export const hashCode = str => {
    let hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }
  
export const pickColor = str =>
    `hsl(${hashCode(str) % 360}, 100%, 80%)`