export type QariKey = string & { readonly brand: unique symbol };

export type Qari = {
  id: QariKey;
  name: string;
  urlPath: string;
};

type Qaris = {
  [key: QariKey]: Qari;
};

const qaris: Qaris = {
  ["mishary" as QariKey]: {
    id: "mishary" as QariKey,
    name: "Mishary",
    urlPath: "Alafasy_128kbps",
  },
  ["hudhaify" as QariKey]: {
    id: "hudhaify" as QariKey,
    name: "Hudhaify",
    urlPath: "Hudhaify_128kbps",
  },
  ["husary" as QariKey]: {
    id: "husary" as QariKey,
    name: "Husary",
    urlPath: "Husary_128kbps",
  },
};

export const defaultQariKey = "husary" as QariKey;

export default qaris;
