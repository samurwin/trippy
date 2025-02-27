export function formatDate(start:string, end:string){
  let formattedDate = ''
  const startArr = start.split("-");
  const endArr = end.split("-");
  const startFormatted = startArr[1] + "/" + startArr[2] + "/" + startArr[0];
  const endFormatted = endArr[1] + "/" + endArr[2] + "/" + endArr[0];
  formattedDate = startFormatted + " to " + endFormatted;
  return formattedDate;
}