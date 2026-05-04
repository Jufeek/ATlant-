(function() {
    var priceInput = document.getElementById('carPrice');
    var feeInput = document.getElementById('initialFee');
    var termSelect = document.getElementById('leaseTerm');
    var rateInput = document.getElementById('rate');
    var calcBtn = document.getElementById('calcBtn');
    var resultDiv = document.getElementById('calcResult');

    function calculateLease() {
        var price = parseFloat(priceInput.value);
        var feePercent = parseFloat(feeInput.value);
        var months = parseInt(termSelect.value);
        var annualRate = parseFloat(rateInput.value);

        if (isNaN(price) || price <= 0) price = 2000000;
        if (isNaN(feePercent) || feePercent < 0) return;
        if (isNaN(annualRate)) annualRate = 9.5;
        if (months <= 0) return;

        var initialAmount = price * (feePercent / 100);
        var loanAmount = price - initialAmount;
        
        if (loanAmount <= 0) {
            resultDiv.innerHTML = 'Ежемесячный платёж: <strong>0 ₽ (полная оплата)</strong>';
            return;
        }
        
        var monthlyRate = (annualRate / 100) / 12;
        var monthlyPayment;
        
        if (monthlyRate === 0) {
            monthlyPayment = loanAmount / months;
        } else {
            var factor = monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
            monthlyPayment = loanAmount * factor;
        }
        
        var rounded = Math.round(monthlyPayment);
        resultDiv.innerHTML = 'Ежемесячный платёж: <strong>' + rounded.toLocaleString('ru-RU') + ' ₽</strong><br><span style="font-size:0.8rem;">Первоначальный взнос: ' + initialAmount.toLocaleString('ru-RU') + ' ₽</span>';
    }

    if (calcBtn) {
        calcBtn.addEventListener('click', calculateLease);
        calculateLease();
    }
})();