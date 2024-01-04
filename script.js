function calculate() {
    const coefficientsInput = document.getElementById('coefficientsInput').value;

    // Remove spaces and split coefficients using commas or spaces
    let coefficientsArray = coefficientsInput.replace(/\s/g, '').split(',');

    // If the input doesn't contain commas, try splitting using spaces
    if (coefficientsArray.length !== 4) {
        coefficientsArray = coefficientsInput.split(/\s+/);
    }

    // Extract coefficients
    const a = parseInt(coefficientsArray[0]);
    const b = parseInt(coefficientsArray[1]);
    const c = parseInt(coefficientsArray[2]);
    const d = parseInt(coefficientsArray[3]);

    const modValue = parseInt(document.getElementById('modInput').value);
    const powerValue = parseInt(document.getElementById('powerInput').value);

    let result = '';
    let foundError = false;

    // Calculate initial values of X and Y
    let X = parseInt(((((a * d) - (b * c)) ** (modValue - 2)) * ((d % modValue) + (-b % modValue))) % modValue);
    let Y = parseInt(((((a * d) - (b * c)) ** (modValue - 2)) * ((-c % modValue) + (a % modValue))) % modValue);

    // Iterate for the specified powerValue
    for (let i = 0; i < Math.log2(powerValue); i++) {
        const X1 = parseInt(X * (2 + X * (c * b - a * d)));
        const Y1 = parseInt(Y - X * (d * a * Y - b * c * Y + c - a));
        X = X1;
        Y = Y1;
    }

    // Check if both X and Y are equal to 0
    if (X === 0 && Y === 0) {
        result = 'ERROR';
    } else {
        // Check if the final result of X or Y is more than P^n or less than zero
        if (X < 0 || X >= Math.pow(modValue, powerValue) || Y < 0 || Y >= Math.pow(modValue, powerValue)) {
            // Calculate new X and Y based on the specified format
            const X1 = parseInt(X + Math.pow(modValue, powerValue) / Math.pow(modValue, powerValue) * Math.pow(modValue, powerValue));
            const Y1 = parseInt(Y + Math.pow(modValue, powerValue) / Math.pow(modValue, powerValue) * Math.pow(modValue, powerValue));

            // Calculate the output based on the specified format
            const outputX = parseInt(X1 + Math.pow(modValue, powerValue) * Math.ceil(-X1 / Math.pow(modValue, powerValue)));
            const outputY = parseInt(Y1 + Math.pow(modValue, powerValue) * Math.ceil(-Y1 / Math.pow(modValue, powerValue)));

            result = `Adjusted Result:\nX = ${outputX} + ${Math.pow(modValue, powerValue)}m\nY = ${outputY} + ${Math.pow(modValue, powerValue)}m`;
        } else {
            result = `Final Result:\nX = ${X} + ${Math.pow(modValue, powerValue)}m\nY = ${Y} + ${Math.pow(modValue, powerValue)}m`;
        }
    }

    document.getElementById('result').innerText = result;
}
