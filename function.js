let selectedCrop = '';
        
// Function to show the correct price input based on crop type
function showPriceInput(cropType) {
    const weight = parseFloat(document.getElementById('weight').value);
    const errorMessage = document.getElementById('error-message');
    const priceBox = document.getElementById('priceBox');
    const defaultMessage = document.getElementById('default-message');
    const buttonSection = document.getElementsByClassName('button-section');

    // First check if weight is valid
    if (isNaN(weight) || weight <= 0) {
        errorMessage.textContent = "কত ওজন হলো, সেটা আগে লিখুন, তারপর কাজ করবে।";
        document.getElementById('priceInput').style.display = 'none';
        document.getElementById('calculateButton').style.display = 'none';
        document.getElementById('priceBox').style.display = 'none';
        document.getElementById('clearBtn').style.display = 'none';
        defaultMessage.style.display = 'none';
        return;
    }

    // Hide the result and error message
    document.getElementById('result').style.display = 'none';
    document.getElementById('error-message').textContent = '';
    document.getElementById('result').style.display = 'none';

    // Display the price input field
    const priceInput = document.getElementById('priceInput');
    const cropName = document.getElementById('cropName');
    priceInput.style.display = 'block';
    priceBox.style.display = 'block';
    defaultMessage.style.display = 'none';

    // Set the placeholder and value based on the selected crop
    if (cropType === 'paddy') {
        // priceInput.placeholder = '১ কেজি ধানের দাম';
        cropName.textContent = 'ধান';
        priceInput.value = '0.65';
    } else if (cropType === 'wheat') {
        // priceInput.placeholder = '১ কেজি গমের দাম';
        cropName.textContent = 'গম';
        priceInput.value = '5';
    } else if (cropType === 'mustard') {
        // priceInput.placeholder = '১ কেজি সরিষার দাম';
        cropName.textContent = 'সরিষা';
        priceInput.value = '6';
    } else if (cropType === 'rice') {
        // priceInput.placeholder = '১ কেজি চালের দাম';
        cropName.textContent = 'চাল';
        priceInput.value = '0.90';
    } else if (cropType === 'wetRice') {
        // priceInput.placeholder = '১ কেজি ভেজা চালের দাম';
        cropName.textContent = 'ভেজা_চাল';
        priceInput.value = '5';
    } else if (cropType === 'corn') {
        // priceInput.placeholder = '১ কেজি ভুট্টার দাম';
        cropName.textContent = 'ভুট্টা';
        priceInput.value = '5';
    } else if (cropType === 'husk') {
        // priceInput.placeholder = '১ কেজি গুড়ার দাম';
        cropName.textContent = 'গুড়া';
        priceInput.value = '5';
    } else if (cropType === 'mustardCake') {
        // priceInput.placeholder = '১ কেজি খোলের দাম';
        cropName.textContent = 'খোল';
        priceInput.value = '22';
    }

    // Set the selected crop for calculation
    selectedCrop = cropType;

    // Show the calculate button
    document.getElementById('calculateButton').style.display = 'block';
    document.getElementById('clearBtn').style.display = 'block';
    defaultMessage.style.display = 'block';
    buttonSection[0].style.display = 'none';
    buttonSection[1].style.display = 'none';
}

// Function to calculate total amount
function calculate() {
    const weight = parseFloat(document.getElementById('weight').value);
    const priceInput = parseFloat(document.getElementById('priceInput').value);
    const errorMessage = document.getElementById('error-message');
    const resultSection = document.getElementById('result');
    const cropName = document.getElementById('cropName').textContent;
    const defaultMessage = document.getElementById('default-message');
    const weightBox = document.getElementById('weightBox');
    const priceBox = document.getElementById('priceBox');
    const buttonSection = document.getElementsByClassName('button-section');
    const billAmountBox = document.getElementById('billAmountBox');
    const calculateButton = document.getElementById('calculateButton');
    const calculateBillButton = document.getElementById('calculateBillButton');

    // Validate input fields
    if (isNaN(weight) || weight <= 0) {
        errorMessage.textContent = "কত ওজন হলো, সেটা আগে লিখুন, তারপর কাজ করবে।";
        resultSection.style.display = 'none';
        defaultMessage.style.display = 'none';
        return;
    } else if (isNaN(priceInput) || priceInput <= 0) {
        errorMessage.textContent = `১ কেজি ${cropName} এর দামটা আগে লিখুন, তারপর কাজ করবে।`;
        resultSection.style.display = 'none';
        defaultMessage.style.display = 'none';
        return;
    }

    // Clear error message
    errorMessage.textContent = '';

    // Calculate total price
    const totalAmount = weight * priceInput;
    document.querySelector('.result-value').textContent = totalAmount;
    resultSection.style.display = 'block';
    defaultMessage.style.display = 'none';
    weightBox.style.display = 'none';
    priceBox.style.display = 'none';
    buttonSection[0].style.display = 'none';
    buttonSection[1].style.display = 'none';
    calculateButton.style.display = 'none';
    calculateBillButton.style.display = 'block';
    billAmountBox.style.display = 'block';
}

// Function to calculate bill amount
function calculateBill() {
    const resultValue = document.querySelector('.result-value').textContent;
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const resultBillAmount = document.getElementById('resultBillAmount');
    const result = document.getElementById('result');
    const defaultMessage = document.getElementById('default-message');

    // Validate input fields
    if (isNaN(billAmount) || billAmount <= 0) {
        resultBillAmount.innerHTML = "<p style='color:red;'>কত টাকা দিলো, সেটা আগে লিখুন, তারপর কাজ করবে।</p>";
        resultBillAmount.style.display = "block";
        result.style.display = "none";
        defaultMessage.style.display = "none";
        return;
    }

    // Bill amount wise message dispay
    if(billAmount > resultValue) {
        const billResult = billAmount - resultValue;
        resultBillAmount.innerHTML = `<p class='bill-value-border'>₹ <b style='color:red;'>${billResult}</b> টাকা ফেরত দিন।</p>`;
    } else if (billAmount < resultValue) {
        const billResult = resultValue - billAmount;
        resultBillAmount.innerHTML = `<p class='bill-value-border'>₹ <b style='color:blue;'>${billResult}</b> টাকা আরো পাবেন।</p>`;
    } else if (billAmount == resultValue) {
        resultBillAmount.innerHTML = `<p class='bill-value-border'>সঠিক টাকা দিয়েছে যেতে দিন</p>`;
    }
    resultBillAmount.style.display = "block";
    result.style.display = "none";
}

// All clear after click the clear button
function clearBtn() {
    const weight = document.getElementById("weight");
    const weightBox = document.getElementById("weightBox");
    const priceInput = document.getElementById("priceInput");
    const errorMessage = document.getElementById('error-message');
    const resultSection = document.getElementById('result');
    const defaultMessage = document.getElementById('default-message');
    const priceBox = document.getElementById('priceBox');
    const cropName = document.getElementById('cropName');
    const resultBillAmount = document.getElementById('resultBillAmount');
    const calculateBillButton = document.getElementById('calculateBillButton');
    const billAmountBox = document.getElementById('billAmountBox');
    const billAmount = document.getElementById('billAmount');
    const buttonSection = document.getElementsByClassName('button-section');
    
    // Clear the weight and price input fields
    weight.value = '';
    priceInput.value = '';
    billAmount.value = '';

    // Clear the crop type and reset messages
    cropName.textContent = '';
    errorMessage.textContent = '';
    
    // Hide the result and price box
    resultSection.style.display = 'none';
    priceBox.style.display = 'none';
    defaultMessage.style.display = 'block';
    resultBillAmount.style.display = 'none';
    calculateBillButton.style.display = 'none';
    billAmountBox.style.display = 'none';
    buttonSection[0].style.display = 'flex';
    buttonSection[1].style.display = 'flex';
    weight.style.display = 'block';
    weightBox.style.display = 'flex';

    // Hide the calculate button and price input field
    document.getElementById('calculateButton').style.display = 'none';
    document.getElementById('clearBtn').style.display = 'none';
}