export const colorConverter = (colorCode: string): string => {
  if (colorCode === "trang") {
    return "trắng";
  }
  if (colorCode === "xam") {
    return "xám";
  }
  if (colorCode === "den") {
    return "đen";
  }
  return colorCode;
}

export const colorConverterBack = (color: string): string => {
  if (color === "trắng") {
    return "trang";
  }
  if (color === "xám") {
    return "xam";
  }
  if (color === "đen") {
    return "den";
  }
  return color;
}