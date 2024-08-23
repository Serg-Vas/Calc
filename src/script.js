// Синхронізація значень між числовим полем і слайдером
document.getElementById('creditAmount').addEventListener('input', function() {
    document.getElementById('creditAmountSlider').value = this.value;
    validate();
});

document.getElementById('creditAmountSlider').addEventListener('input', function() {
    document.getElementById('creditAmount').value = this.value;
    validate();
});

document.getElementById('paymentPeriod').addEventListener('input', function() {
    document.getElementById('paymentPeriodSlider').value = this.value;
    validate();
});

document.getElementById('paymentPeriodSlider').addEventListener('input', function() {
    document.getElementById('paymentPeriod').value = this.value;
    validate();
});

// Функція обрахунку
function calculate(creditAmount, paymentPeriod) {
    const interestRate = 2.2;

    const dailyRepayment = (creditAmount + (creditAmount * (interestRate / 100) * paymentPeriod)) / paymentPeriod;
    const totalRepayment = dailyRepayment * paymentPeriod;

        document.getElementById('dailyPayment').innerText = dailyRepayment.toFixed(2);
        document.getElementById('totalPayment').innerText = totalRepayment.toFixed(2);
        document.getElementById('result').style.display = 'block';
}

// Валідація
function validate() {
    const creditAmount = parseFloat(document.getElementById('creditAmount').value);
    const paymentPeriod = parseInt(document.getElementById('paymentPeriod').value);
    let disabled = false;

    if (isNaN(creditAmount) || creditAmount < 1000 || creditAmount > 50000) {
        document.getElementById('creditAmountError').innerText = 'Сума кредиту має бути між 1000 та 50000.';
        document.getElementById('creditAmountError').style.display = 'block';
        disabled = true;
    } else {
        document.getElementById('creditAmountError').style.display = 'none';
    }

    if (isNaN(paymentPeriod) || paymentPeriod < 7 || paymentPeriod > 60) {
        document.getElementById('paymentPeriodError').innerText = 'Період погашення має бути між 7 та 60 днями.';
        document.getElementById('paymentPeriodError').style.display = 'block';
        disabled = true;
    } else {
        document.getElementById('paymentPeriodError').style.display = 'none';
    }

    if (!disabled) {
        calculate(creditAmount, paymentPeriod);
    } else {
        document.getElementById('result').style.display = 'none';
    }

    document.getElementById('takeCredit').disabled = disabled;
}

// Псевдообробка відправки форми при натисканні на кнопку
document.getElementById('takeCredit').addEventListener('click', function() {
    if (document.getElementById('takeCredit').disabled) {
        return false;
    }
});

document.getElementById('takeCredit').disabled = true;
