export async function resizeImg(file:File, src:string, maxSize:number) {
const fileSize = file.size
    if(+fileSize > +maxSize) {
        return new Promise((resolve,reject) => {
            const image = new Image()
            image.src = URL.createObjectURL(file)
            image.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                if(!ctx) return;
                const scale = Math.sqrt(maxSize / fileSize);
                const newWidth = image.width * scale;
                const newHeight = image.height * scale;
                canvas.width = newWidth;
                canvas.height = newHeight;
                ctx.drawImage(image, 0, 0, newWidth, newHeight);
                const dataURL = canvas.toDataURL()
                const base64Data = dataURL.split(',')[1];
                const binary = window.atob(base64Data);
                const arrayBuffer = new ArrayBuffer(binary.length);
                const uint8Array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < binary.length; i++) {
                    uint8Array[i] = binary.charCodeAt(i);
                }
                const newFile = new File([uint8Array], file.name, { type: file.type });
                resolve({newFile, dataURL} as {newFile:File, dataURL:string})
            }
            image.onerror = (err) => reject(err)
        })
    } else {
        return {newFile:file, dataURL:src}
    }
}