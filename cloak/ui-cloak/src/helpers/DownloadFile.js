export const downloadFile = (url) => {
    const element = document.createElement("a");
    const file = new Blob([url], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "DRM key.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}