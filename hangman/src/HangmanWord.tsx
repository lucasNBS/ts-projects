type HangmanWordProps = {
  reveal: boolean;
  guessedLetters: string[];
  wordToGuess: string;
};

export function HangmanWord({
  reveal,
  guessedLetters,
  wordToGuess,
}: HangmanWordProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.25rem",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess.split("").map((letter, index) => {
        return (
          <span style={{ borderBottom: "0.1em solid black" }} key={index}>
            <span
              style={{
                visibility:
                  guessedLetters.includes(letter) || reveal
                    ? "visible"
                    : "hidden",
                color:
                  !guessedLetters.includes(letter) && reveal ? "red" : "black",
              }}
            >
              {letter}
            </span>
          </span>
        );
      })}
    </div>
  );
}
