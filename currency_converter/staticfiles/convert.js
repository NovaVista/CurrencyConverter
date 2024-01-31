async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from_currency").value;
    const toCurrency = document.getElementById("to_currency").value;

    // Perform client-side validation
    if (isNaN(parseFloat(amount))) {
      return;
    }

    try {
      const response = await fetch('{% url "convert_currency" %}', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": "{{ csrf_token }}",
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          from_currency: fromCurrency,
          to_currency: toCurrency,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error converting currency:", errorData.error);
        return;
      }

      const data = await response.json();
      const convertedAmount = data.converted_amount;

      document.getElementById(
        "convertedAmount"
      ).textContent = `Converted Amount: ${convertedAmount} ${toCurrency}`;
      document.getElementById("resultContainer").style.display = "block";
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  }