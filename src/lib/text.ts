export function repeatIncrementedText(text: string): (i: number) => string {
  const splittedText: string[] = text.split(/\d+/);
  const matched = text.match(/\d+/g);
  const numbers: number[] = matched ? matched.map(Number) : [];
  const numbersLength: number = numbers.length;

  function getIncementedText(i: number): string {
    const incrementedNumbers = numbers.map(n => n + i);

    let result = "";
    for (let j = 0; j < numbersLength; j++) {
      result += splittedText[j];
      result += incrementedNumbers[j];
    }
    result += splittedText[splittedText.length - 1];
    return result;
  }

  const fn = (repeatCount: number): string => {
    let result = "";
    for (let i = 0; i < repeatCount; i++) {
      result += getIncementedText(i);

      if (i < repeatCount - 1) {
        result += "\n";
      }
    }

    return result;
  };

  return fn;
}
