export const shuffle = (arr: any) =>
  [...arr].sort(() => 0.5 - Math.random());

export const buildUrl = (url: string, params: object) => {
  let urlWithParams = url;

  Object.entries(params).forEach(([key, value], i) => {
    const sing = !i ? "?" : "&";
    urlWithParams += `${sing}${key}=${value}`;
  });

  return urlWithParams;
};

export const sumBy = (arr: Array<number>) =>
  arr.reduce((prev, cur) => prev + cur, 0);
