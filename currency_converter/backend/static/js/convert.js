function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from_currency").value;
    const toCurrency = document.getElementById("to_currency").value;

    // Perform client-side validation
    if (isNaN(parseFloat(amount))) {
      return;
    }

    try {
      const convertUrl = document.getElementById('convert-url').dataset.url;
      const response = await fetch(convertUrl   , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie('csrftoken'),
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