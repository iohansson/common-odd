import Splitting from "splitting";

const CHARS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "!",
  "@",
  "#",
  "$",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "+",
  "=",
  "/",
  "[",
  "]",
  "{",
  "}",
  ";",
  ":",
  "<",
  ">",
  ",",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

const MAX_CELL_ITERATIONS = 15;
const COLORS = ["#ff4539", "#ffdca3", "#ffb3dc"];
const LINE_DELAY = 80;

const makeCell = ({
  el,
  position,
  previousCellPosition,
}: {
  el: HTMLElement;
  position?: number;
  previousCellPosition?: number;
}) => {
  const originalValue = el.innerHTML;
  const originalColor = window.getComputedStyle(el).color;
  return {
    set value(value) {
      el.innerHTML = value;
    },
    get value() {
      return el.innerHTML;
    },
    set color(color) {
      el.style.color = color;
    },
    get color() {
      return el.style.color;
    },
    get original() {
      return originalValue;
    },
    get originalColor() {
      return originalColor;
    },
  };
};

type Cell = ReturnType<typeof makeCell>;

const makeLine = ({
  position,
  cells,
}: {
  position: number;
  cells: Cell[];
}) => ({
  cells: cells ?? [],
  position,
});

type Line = ReturnType<typeof makeLine>;

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

type ShuffleOptions = {
  el: HTMLElement;
  colors?: string[];
  chars?: string[];
  maxIterations?: number;
  lineDelay?: number;
};

export function makeShuffle({
  el,
  colors = COLORS,
  chars = CHARS,
  maxIterations = MAX_CELL_ITERATIONS,
  lineDelay = LINE_DELAY,
}: ShuffleOptions) {
  const lines: Line[] = [];
  let totalChars = 0;
  const results = Splitting({
    target: el,
    by: "lines",
  }) as unknown as Splitting.Result[];
  results.forEach((s) => Splitting({ target: s.words }));

  if (!results.length) {
    return;
  }

  for (const [linePosition, lineArr] of results[0].lines?.entries() ?? []) {
    let cells = [];
    let charCount = 0;
    // for every word of each line
    for (const word of lineArr) {
      for (const char of [...word.querySelectorAll<HTMLElement>(".char")]) {
        cells.push(
          makeCell({
            el: char,
            position: charCount,
            previousCellPosition: charCount === 0 ? -1 : charCount - 1,
          })
        );
        ++charCount;
      }
    }

    lines.push(makeLine({ position: linePosition, cells }));
    totalChars += charCount;
  }

  function getRandomChar() {
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function shuffle() {
    return new Promise<void>((resolve) => {
      let finished = 0;
      const loop = (line: Line, cell: Cell, iteration = 0) => {
        if (iteration === maxIterations - 1) {
          cell.value = cell.original;
          cell.color = cell.originalColor;

          ++finished;
          if (finished === totalChars) {
            resolve();
          }
        } else {
          cell.value = getRandomChar();
          cell.color = colors[randomNumber(0, colors.length - 1)];
        }

        ++iteration;
        if (iteration < maxIterations) {
          setTimeout(() => loop(line, cell, iteration), randomNumber(30, 110));
        }
      };

      for (const line of lines) {
        for (const cell of line.cells) {
          setTimeout(() => loop(line, cell), line.position * lineDelay);
        }
      }
    });
  }

  return shuffle;
}
