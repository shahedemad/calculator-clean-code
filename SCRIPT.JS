(function() {
    "use strict";

    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button");

    // محرك حسابي مستقل وقابل لإعادة الاستخدام
    const calculator = {
        getResult(expression) {
            try {
                // استخدام Function بدلاً من eval للأمان
                const result = new Function('"use strict"; return (' + expression + ')')();
                return (result === Infinity || isNaN(result)) ? "Infinity" : result;
            } catch {
                return "Infinity";
            }
        }
    };

    // مراقب الأحداث: يطبق مبدأ إعادة الاستخدام (دالة واحدة لكل الأزرار)
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const type = btn.getAttribute("data-type");
            const value = btn.getAttribute("data-value");

            if (type === "equal") {
                display.value = calculator.getResult(display.value);
            } else if (type === "clear") {
                display.value = "";
            } else if (type === "delete") {
                display.value = display.value.slice(0, -1);
            } else {
                // إذا كان العرض "0" أو "Error"، استبدله بالقيمة الجديدة
                if (display.value === "Error") display.value = "";
                display.value += value;
            }
        });
    });
})();
