function calculate() {
    const coefficientsInput = document.getElementById('coefficientsInput').value;

    // Remove spaces and split coefficients using commas or spaces
    let coefficientsArray = coefficientsInput.replace(/\s/g, '').split(',');

    // If the input doesn't contain commas, try splitting using spaces
    if (coefficientsArray.length !== 4) {
        coefficientsArray = coefficientsInput.split(/\s+/);
    }

    // Extract coefficients
    const a = BigInt(coefficientsArray[0]);
    const b = BigInt(coefficientsArray[1]);
    const c = BigInt(coefficientsArray[2]);
    const d = BigInt(coefficientsArray[3]);

    // Calculate the GCD of (ad - bc) and p^n
    const modValue = BigInt(document.getElementById('modInput').value);
    const powerValue = BigInt(document.getElementById('powerInput').value);

    const gcdResult = gcd(BigInt(Math.abs((a * d) - (b * c))), modValue ** powerValue);

    // Check if the GCD is not equal to 1
    if (gcdResult !== BigInt(1)) {
        document.getElementById('result').innerText = 'ERROR';
        return;
    }

    let result = '';
    let foundError = false;

    // Calculate initial values of X and Y
    let X = ((((a * d) - (b * c)) ** (modValue - BigInt(2))) * ((d % modValue) + (-b % modValue))) % modValue;
    let Y = ((((a * d) - (b * c)) ** (modValue - BigInt(2))) * ((-c % modValue) + (a % modValue))) % modValue;

    // Iterate for the specified powerValue
    for (let i = BigInt(0); i < powerValue; i += BigInt(1)) {
        const X1 = X * (BigInt(2) + X * (c * b - a * d));
        const Y1 = Y - X * (d * a * Y - b * c * Y + c - a);
        X = X1 % modValue;
        Y = Y1 % modValue;
    }

    // Check if both X and Y are equal to 0
    if (X === BigInt(0) && Y === BigInt(0)) {
        result = 'ERROR';
    } else {
        // Check if the final result of X or Y is more than P^n or less than zero
        if (X < BigInt(0) || X >= modValue ** powerValue || Y < BigInt(0) || Y >= modValue ** powerValue) {
            // Calculate new X and Y based on the specified format
            const X1 = X + modValue ** powerValue / modValue ** powerValue * modValue ** powerValue;
            const Y1 = Y + modValue ** powerValue / modValue ** powerValue * modValue ** powerValue;

            // Calculate the output based on the specified format
            const outputX = X1 + modValue ** powerValue * (BigInt(Math.ceil(-X1 / modValue ** powerValue)));
            const outputY = Y1 + modValue ** powerValue * (BigInt(Math.ceil(-Y1 / modValue ** powerValue)));

            result = `Adjusted Result:\nX = ${outputX} + ${modValue ** powerValue}m\nY = ${outputY} + ${modValue ** powerValue}m`;
        } else {
            result = `Final Result:\nX = ${X} + ${modValue ** powerValue}m\nY = ${Y} + ${modValue ** powerValue}m`;
        }
    }

    document.getElementById('result').innerText = result;
}

// Function to calculate the Greatest Common Divisor (GCD) using Euclidean algorithm
function gcd(a, b) {
    while (b !== BigInt(0)) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
