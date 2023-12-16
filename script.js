// Function to calculate the greatest common divisor (gcd)
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function calculate() {
    const coefficients = document.getElementById('coefficientsInput').value.split(' ').map(Number);
    const a = coefficients[0];
    const b = coefficients[1];
    const c = coefficients[2];
    const d = coefficients[3];

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
        let X = ((((a * d) - (b * c) % modValue) ** (modValue - 2)) * ((d % modValue) + (-b % modValue))) % modValue;
        let Y = ((((a * d) - (b * c) % modValue) ** (modValue - 2)) * ((-c % modValue) + (a % modValue))) % modValue;

        for (let i = 0; i < Math.log2(powerValue); i++) {
            const X1 = X * (2 + X * (c * b - a * d));
            const Y1 = Y - X * (d * a * Y - b * c * Y + c - a);
            X = X1;
            Y = Y1;
        }

        result = `X = ${X} + ((${modValue}^${powerValue}) * m) = ${X} + ${Math.pow(modValue, powerValue)}m\nY = ${Y} + ((${modValue}^${powerValue}) * m) = ${Y} + ${Math.pow(modValue, powerValue)}m`;
    }

    document.getElementById('result').innerText = result;
}
