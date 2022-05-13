export const checkout = (email, price) => {
  if (!(/^\w@\w.com$/).test(email)){
    alert("wrong email format")
    throw("Wrong email format")
  }
  let handler = PaystackPop.setup({
    key: 'YOUR_PUBLIC_KEY',
    email: email,
    amount: price*100,
    currency: 'GHS',
    ref: 'YOUR_REFERENCE',
    callback: function(response) {
      //this happens after the payment is completed successfully
      var reference = response.reference;
      alert('Payment complete! Reference: ' + reference);
      // Make an AJAX call to your server with the reference to verify the transaction
      fetch("https://shelfmade.netlify.app verify_transaction?reference="+response.reference)
        .then(res=>{
          if (!response.ok) {
            throw ("Error ")
          }
          res.json()
        })
        .then(data=>console.log(data))
    },
    onClose: function() {
      alert('Transaction was not completed, window closed.');
    },
  });
  handler.openIframe();
  
}
