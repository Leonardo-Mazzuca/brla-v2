export default function formatDate(dateString: string): string {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth returns 0-11
    const year = date.getUTCFullYear();
    const monthName = monthNames[date.getUTCMonth()]; // Use getUTCMonth for month name index

    return `${year}-${monthName}-${day}`;
}


