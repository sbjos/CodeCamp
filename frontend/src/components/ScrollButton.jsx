function ScrollButton() {
  return (
    <div>
      <button type="button" onClick={() => scroll(-20)}>
        left
      </button>
      <button type="button" onClick={() => scroll(-20)}>
        right
      </button>
    </div>
  );
}

export default ScrollButton;
