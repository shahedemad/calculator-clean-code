// 1. محرك العمليات (Logic) - الجزء القابل لإعادة الاستخدام
const MathEngine = {
    calculate: function(expression) {
        try {
            // تنظيف المدخلات لضمان الأمان
            const sanitized = expression.replace(/[^-+/*%0-9.]/g, '');
            const result = new Function('"use strict"; return (' + sanitized + ')')();
            return (result === Infinity || isNaN(result)) ? "Error" : result;
        } catch {
            return "Error";
        }
    }
};

// 2. إدارة الواجهة (UI Controller)
const display = document.getElementById("display");

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        const type = button.getAttribute("data-type");
        const value = button.getAttribute("data-value");

        if (type === "equal") {
            display.value = MathEngine.calculate(display.value);
        } else if (type === "clear") {
            display.value = "0";
        } else if (type === "delete") {
            display.value = display.value.length > 1 ? display.value.slice(0, -1) : "0";
        } else {
            // تحديث الشاشة للأرقام والعمليات
            if (display.value === "0" || display.value === "Error") {
                display.value = value;
            } else {
                display.value += value;
            }
        }
    });
});

// 3. نظام الاختبار البسيط (Simple Testing)
function runTests() {
    console.log("%c--- بدء اختبارات النظام ---", "color: blue; font-weight: bold;");
    
    const results = [
        { test: "الجمع (10+10)", pass: MathEngine.calculate("10+10") === 20 },
        { test: "القسمة على صفر", pass: MathEngine.calculate("5/0") === "Error" },
        { test: "أولوية الضرب", pass: MathEngine.calculate("2+2*2") === 6 }
    ];

    results.forEach(r => {
        console.log(`${r.test}: ${r.pass ? "✅ ناجح" : "❌ فشل"}`);
    });
}

// تشغيل الاختبار تلقائياً لرؤيته في الـ Console
runTests(); 
