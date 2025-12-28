// 1. محرك العمليات - الجزء القابل لإعادة الاستخدام
const MathEngine = {
    calculate: function(expression) {
        try {
            const sanitized = expression.replace(/[^-+/*%0-9.]/g, '');
            const result = new Function('"use strict"; return (' + sanitized + ')')();
            return (result === Infinity || isNaN(result)) ? "Error" : result;
        } catch { return "Error"; }
    }
};

// 2. إدارة الواجهة
const calculatorDisplay = document.getElementById("display"); // غيرنا الاسم هنا لضمان عدم التكرار

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        const type = button.getAttribute("data-type");
        const value = button.getAttribute("data-value");

        if (type === "equal") {
            calculatorDisplay.value = MathEngine.calculate(calculatorDisplay.value);
        } else if (type === "clear") {
            calculatorDisplay.value = "0";
        } else if (type === "delete") {
            calculatorDisplay.value = calculatorDisplay.value.length > 1 ? calculatorDisplay.value.slice(0, -1) : "0";
        } else {
            if (calculatorDisplay.value === "0" || calculatorDisplay.value === "Error") {
                calculatorDisplay.value = value;
            } else {
                calculatorDisplay.value += value;
            }
        }
    });
});

// 3. نظام الاختبار التلقائي
(function runTests() {
    console.log("%c--- بدء اختبارات النظام ---", "color: blue; font-weight: bold;");
    const tests = [
        { name: "الجمع (10+10)", pass: MathEngine.calculate("10+10") === 20 },
        { name: "القسمة على صفر", pass: MathEngine.calculate("5/0") === "Error" },
        { name: "أولوية الضرب", pass: MathEngine.calculate("2+2*2") === 6 }
    ];
    tests.forEach(t => console.log(`${t.name}: ${t.pass ? "✅ ناجح" : "❌ فشل"}`));
})();
