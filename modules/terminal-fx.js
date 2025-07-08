class TerminalFX {
  static typewriter(element, text, speed = 50) {
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, speed);
  }
}