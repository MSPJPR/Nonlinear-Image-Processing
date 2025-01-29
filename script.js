// Function to simulate Salt and Pepper noise
function simulateNoise() {
    let imgElement = document.getElementById("uploadedImage");
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = imgElement.width;
    canvas.height = imgElement.height;

    ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    // Adding Salt and Pepper noise
    for (let i = 0; i < data.length; i += 4) {
        let random = Math.random();
        if (random < 0.02) {
            let noise = Math.random() < 0.5 ? 0 : 255;
            data[i] = noise; // R
            data[i + 1] = noise; // G
            data[i + 2] = noise; // B
        }
    }

    ctx.putImageData(imageData, 0, 0);
    imgElement.src = canvas.toDataURL();
}

// Function to apply selected filter
function applyFilter(filterType) {
    let imgElement = document.getElementById("uploadedImage");
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = imgElement.width;
    canvas.height = imgElement.height;

    ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    switch (filterType) {
        case 'median':
            applyMedianFilter(data, canvas.width, canvas.height);
            break;
        case 'weightedMedian':
            applyWeightedMedianFilter(data, canvas.width, canvas.height);
            break;
        case 'erosion':
            applyErosion(data, canvas.width, canvas.height);
            break;
        case 'dilation':
            applyDilation(data, canvas.width, canvas.height);
            break;
        default:
            break;
    }

    ctx.putImageData(imageData, 0, 0);
    imgElement.src = canvas.toDataURL();
}

// Median Filter Implementation
function applyMedianFilter(data, width, height) {
    let newData = new Uint8ClampedArray(data);
    let kernelSize = 3; // 3x3 Kernel
    let halfKernel = Math.floor(kernelSize / 2);

    for (let y = halfKernel; y < height - halfKernel; y++) {
        for (let x = halfKernel; x < width - halfKernel; x++) {
            let pixelValues = [];
            for (let ky = -halfKernel; ky <= halfKernel; ky++) {
                for (let kx = -halfKernel; kx <= halfKernel; kx++) {
                    let index = ((y + ky) * width + (x + kx)) * 4;
                    pixelValues.push(data[index]);
                }
            }
            pixelValues.sort();
            let median = pixelValues[Math.floor(pixelValues.length / 2)];
            let index = (y * width + x) * 4;
            newData[index] = median;
            newData[index + 1] = median;
            newData[index + 2] = median;
        }
    }

    for (let i = 0; i < data.length; i++) {
        data[i] = newData[i];
    }
}

// Weighted Median Filter Implementation
function applyWeightedMedianFilter(data, width, height) {
    // Placeholder for Weighted Median Filter Logic
    alert("Weighted Median Filter logic needs to be implemented.");
}

// Erosion Filter Implementation
function applyErosion(data, width, height) {
    // Placeholder for Erosion Filter Logic
    alert("Erosion filter logic needs to be implemented.");
}

// Dilation Filter Implementation
function applyDilation(data, width, height) {
    // Placeholder for Dilation Filter Logic
    alert("Dilation filter logic needs to be implemented.");
}

// Handle Image Upload
document.getElementById("imageUpload").addEventListener("change", function (e) {
    let reader = new FileReader();
    reader.onload = function (event) {
        let imgElement = document.createElement('img');
        imgElement.id = "uploadedImage";
        imgElement.src = event.target.result;

        imgElement.onload = function () {
            let imageContainer = document.getElementById("imageContainer");
            imageContainer.innerHTML = "";
            imageContainer.appendChild(imgElement);
        };
    };
    reader.readAsDataURL(e.target.files[0]);
});
