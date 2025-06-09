export const rupiahFormatter = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export const dateFormatter = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const parts = new Intl.DateTimeFormat("id-ID", options).formatToParts(date);
  const getParts = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  const dateFormatted = `${getParts("day")} ${getParts("month")} ${getParts("year")} ${getParts("hour")}:${getParts("minute")} ${getParts("dayPeriod")}`;

  return dateFormatted;
};

export const birthDateFormater = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  return `${year}-${formattedMonth}-${formattedDay}`;
};

export const generateOrderCode = (fullName: string): string => {
  const names = fullName.trim().split(/\s+/);
  const initials = names
    .slice(0, 3)
    .map((n) => n[0].toUpperCase())
    .join("");
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2);
  const second = String(now.getSeconds()).padStart(2, "0");
  return `${initials}-${day}${month}${year}-${second}`;
};
