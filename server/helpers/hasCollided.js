const hasCollided = (paddleRect, ballRect) => {
  if (
    ballRect.left <= paddleRect.right &&
    ballRect.right >= paddleRect.left &&
    ballRect.top <= paddleRect.bottom &&
    ballRect.bottom >= paddleRect.top
  ) {
    return true;
  }
  return false;
};

module.exports = { hasCollided };
