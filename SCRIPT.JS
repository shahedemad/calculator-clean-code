// استخدام كبسولة (IIFE) لمنع تكرار التعريفات وتجنب الأخطاء
(function() {
    "use strict";

    // 1. محرك العمليات - قابل لإعادة الاستخدام
    const CalculatorLogic = {
        exec: function(expression) {
            try {
                // تنظيف المدخلات
                const cleanInput = expression.replace(/[^-+/*%0-9.]/g, '');
                const result = new Function('"use strict"; return (' + cleanInput + ')')();
                return (result === Infinity || isNaN(result)) ? "Error" : result;
            } catch {
                return "Error";
            }
        }
    };

    // 2. إدارة الواجهة - نستخدم اسماً فريداً جداً للمتغير
    const myCalculatorScreen = document.getElementById("display");

    if (myCalculatorScreen) {
        document.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", () => {
                const type = btn.getAttribute("data-type");
                const val = btn.getAttribute("data-value");

                if (type === "equal") {
                    myCalculatorScreen.value = CalculatorLogic.exec(myCalculatorScreen.value);
                } else if (type === "clear") {
                    myCalculatorScreen.value = "0";
                } else if (type === "delete") {
                    myCalculatorScreen.value = myCalculatorScreen.value.length > 1 ? myCalculatorScreen.value.slice(0, -1) : "0";
                } else {
                    if (myCalculatorScreen.value === "0" || myCalculatorScreen.value === "Error") {
                        myCalculatorScreen.value = val;
                    } else {
                        myCalculatorScreen.value += val;
                    }
                }
            });
        });
    }

    // 3. نظام الاختبار التلقائي - سيظهر في الـ Console
    console.log("%c--- بدء اختبارات الجودة (Testing) ---", "color: green; font-weight: bold; font-size: 12px;");
    
    const testCases = [
        { name: "اختبار الجمع (10+10)", result: CalculatorLogic.exec("10+10") === 20 },
        { name: "اختبار القسمة على صفر", result: CalculatorLogic.exec("5/0") === "Error" },
        { name: "اختبار أولوية العمليات", result: CalculatorLogic.exec("2+3*4") === 14 }
    ];

    testCases.forEach(t => {
        console.log(`${t.name}: ${t.result ? "✅ ناجح" : "❌ فشل"}`);
    });

})();
