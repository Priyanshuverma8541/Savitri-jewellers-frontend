export const handlePayment = async (amount) => {
    const res = await fetch("http://localhost:8080/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
  
    const data = await res.json();
  
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      name: "Savitri Jewellers",
      description: "Purchase from Savitri Jewellers",
      order_id: data.id,
      handler: async (response) => {
        const verifyRes = await fetch("http://localhost:8080/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
  
        const result = await verifyRes.json();
        alert(result.message);
      },
      theme: { color: "#F37254" },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  