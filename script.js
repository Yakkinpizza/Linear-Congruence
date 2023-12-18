// Function to calculate the greatest common divisor (gcd)
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function calculate() {
    const coefficientsInput = document.getElementById('coefficientsInput').value;

    // Extract coefficients without spaces
    const a = parseInt(coefficientsInput.charAt(0));
    const b = parseInt(coefficientsInput.charAt(1));
    const c = parseInt(coefficientsInput.charAt(2));
    const d = parseInt(coefficientsInput.charAt(3));

    const modValue = parseInt(document.getElementById('modInput').value);
    const powerValue = parseInt(document.getElementById('powerInput').value);

    let result = '';
    let foundError = false;

    // Check if a * d - b * c is zero or if the absolute difference is not 1 or if gcd(ad - bc, p) is not 1
    if (a * d - b * c === 0 || Math.abs(d) - Math.abs(b) !== 1 || gcd(a * d - b * c, modValue) !== 1) {
        result = 'ERROR';
        foundError = true;
    }

    if (!foundError) {
        let X = parseInt(((((a * d) - (b * c)) ** (modValue - 2)) * ((d % modValue) + (-b % modValue))) % modValue);
        let Y = parseInt(((((a * d) - (b * c)) ** (modValue - 2)) * ((-c % modValue) + (a % modValue))) % modValue);

        for (let i = 0; i < Math.log2(powerValue); i++) {
            const X1 = parseInt(X * (2 + X * (c * b - a * d)));
            const Y1 = parseInt(Y - X * (d * a * Y - b * c * Y + c - a));
            X = X1;
            Y = Y1;
        }

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
