export const reader = (file: File) =>
  new Promise((resolve, _reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(",")[1];
      const dataURL = `data:image/jpeg;base64,${base64Data}`;
      resolve(dataURL);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
};

export const isBase64 = (image: string) => {
  return image.startsWith("data:image");
};

export const urlToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("Failed to convert the image to base64.");
      }
    };
    reader.onerror = () => {
      reject("Failed to read the image file.");
    };
    reader.readAsDataURL(blob);
  });
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
