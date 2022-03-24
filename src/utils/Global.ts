const GlobalUtils = {
  capitalise: (value: string): string => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  },
  callIfFunction: (...args: any[]): void => {
    if (typeof args[0] === "function") {
      args[0](...args.splice(1));
    }
  },
  getValue: (
    target: any,
    path: string,
    defaultValue: any,
    pathSeparator = "."
  ): any => {
    if (!target || typeof path !== "string") {
      return defaultValue;
    } else {
      return path
        .split(pathSeparator)
        .reduce((p, c) => (p && p[c]) || defaultValue, target);
    }
  },
  randomInt: (from: number, to: number): number => {
    return Math.round(from + Math.random() * (to - from));
  },
  pluralize: (text: string, n: number): string => {
    return n === 1 ? text : text + "s";
  },
  toDisplayDate: (date: string | Date): string => {
    if (typeof date === "string") {
      date = new Date(date);
    }
    if (date instanceof Date) {
      const minutes = date.getMinutes();
      return date.toLocaleDateString() + ", " + date.getHours() + ":" + (minutes < 10 ? "0" : "") + minutes;
    } else {
      return "No date";
    }
  }
};

export default GlobalUtils;
