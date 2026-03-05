
//format timestamp into a nicedate(10 min from now) 
export default function getExpiryTimeFormatted() {
  const future = new Date(Date.now() + 10 * 60 * 1000);

  const hours = String(future.getHours()).padStart(2, "0");
  const minutes = String(future.getMinutes()).padStart(2, "0");
  const seconds = String(future.getSeconds()).padStart(2, "0");

  const day = String(future.getDate()).padStart(2, "0");
  const month = String(future.getMonth() + 1).padStart(2, "0");
  const year = future.getFullYear();

  return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
}


//format date
export function formatDate(dateString){
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };