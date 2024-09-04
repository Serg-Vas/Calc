// Ініціалізація змінних
const creditAmountInput = document.getElementById('creditAmount');
const creditAmountSlider = document.getElementById('creditAmountSlider');
const paymentPeriodInput = document.getElementById('paymentPeriod');
const paymentPeriodSlider = document.getElementById('paymentPeriodSlider');
const dailyPaymentOutput = document.getElementById('dailyPayment');
const totalPaymentOutput = document.getElementById('totalPayment');
const resultDiv = document.getElementById('result');
const takeCreditButton = document.getElementById('takeCredit');
const creditAmountError = document.getElementById('creditAmountError');
const paymentPeriodError = document.getElementById('paymentPeriodError');

// Ініціалізація значень слайдерів при завантаженні сторінки
window.addEventListener('DOMContentLoaded', function () {
    creditAmountSlider.value = creditAmountInput.value;
    paymentPeriodSlider.value = paymentPeriodInput.value;
    validate();
});

// Функція синхронізації
function syncAndValidate(input, slider) {
    input.addEventListener('input', function () {
        slider.value = input.value;
        validate();
    });

    slider.addEventListener('input', function () {
        input.value = slider.value;
        validate();
    });
}

// Синхронізація
syncAndValidate(creditAmountInput, creditAmountSlider);
syncAndValidate(paymentPeriodInput, paymentPeriodSlider);



// Функція обрахунку
function calculate(creditAmount, paymentPeriod) {
    const interestRate = 2.2;
    const dailyRepayment = calculateDailyRepayment(creditAmount, paymentPeriod, interestRate);
    const totalRepayment = calculateTotalRepayment(dailyRepayment, paymentPeriod);

    updateResults(dailyRepayment, totalRepayment);
}

// Обчислення денного погашення
function calculateDailyRepayment(creditAmount, paymentPeriod, interestRate) {
    return (creditAmount + (creditAmount * (interestRate / 100) * paymentPeriod)) / paymentPeriod;
}

// Обчислення загальної суми погашення
function calculateTotalRepayment(dailyRepayment, paymentPeriod) {
    return dailyRepayment * paymentPeriod;
}

// Оновлення результатів
function updateResults(dailyRepayment, totalRepayment) {
    dailyPaymentOutput.innerText = dailyRepayment.toFixed(2);
    totalPaymentOutput.innerText = totalRepayment.toFixed(2);
    resultDiv.style.display = 'block';
}



// Валідація
function validate() {
    const creditAmount = parseFloat(creditAmountInput.value);
    const paymentPeriod = parseInt(paymentPeriodInput.value);
    
    const isCreditAmountValid = validateCreditAmount(creditAmount);
    const isPaymentPeriodValid = validatePaymentPeriod(paymentPeriod);

    const isValid = isCreditAmountValid && isPaymentPeriodValid;

    if (isValid) {
        calculate(creditAmount, paymentPeriod);
    } else {
        resultDiv.style.display = 'none';
    }

    takeCreditButton.disabled = !isValid;
}

// Перевірка суми кредиту
function validateCreditAmount(creditAmount) {
    if (isNaN(creditAmount) || creditAmount < 1000 || creditAmount > 50000) {
        creditAmountError.innerText = 'Сума кредиту має бути між 1000 та 50000.';
        creditAmountError.style.display = 'block';
        return false;
    } else {
        creditAmountError.style.display = 'none';
        return true;
    }
}

// Перевірка періоду погашення
function validatePaymentPeriod(paymentPeriod) {
    if (isNaN(paymentPeriod) || paymentPeriod < 7 || paymentPeriod > 60) {
        paymentPeriodError.innerText = 'Період погашення має бути між 7 та 60 днями.';
        paymentPeriodError.style.display = 'block';
        return false;
    } else {
        paymentPeriodError.style.display = 'none';
        return true;
    }
}



// Псевдообробка відправки форми при натисканні на кнопку
takeCreditButton.addEventListener('click', function () {
    if (takeCreditButton.disabled) {
        return false;
    }
});

takeCreditButton.disabled = true;
