export const reader = (file: File) =>
  new Promise((resolve, reject) => {
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
