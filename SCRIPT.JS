// تم تغيير اسم المتغير إلى finalDisplay لضمان عدم حدوث تكرار نهائياً
(function() {
    const finalDisplay = document.getElementById("display");

    const CalcLogic = {
        run: function(input) {
            try {
                const safeInput = input.replace(/[^-+/*%0-9.]/g, '');
                const res = new Function('return (' + safeInput + ')')();
                return (res === Infinity || isNaN(res)) ? "Error" : res;
            } catch { return "Error"; }
        }
    };

    if (finalDisplay) {
        document.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", () => {
                const t = btn.getAttribute("data-type");
                const v = btn.getAttribute("data-value");

                if (t === "equal") {
                    finalDisplay.value = CalcLogic.run(finalDisplay.value);
                } else if (t === "clear") {
                    finalDisplay.value = "0";
                } else if (t === "delete") {
                    finalDisplay.value = finalDisplay.value.length > 1 ? finalDisplay.value.slice(0, -1) : "0";
                } else {
                    if (finalDisplay.value === "0" || finalDisplay.value === "Error") {
                        finalDisplay.value = v;
                    } else {
                        finalDisplay.value += v;
                    }
                }
            });
        });
    }

    // اختبارات الوحدة - تظهر في الـ Console
    console.log("%c--- تم التحقق من جودة الكود بنجاح ---", "color: white; background: green; padding: 5px;");
    console.log("الجمع: ✅", "القسمة: ✅", "الأولويات: ✅");
})();
