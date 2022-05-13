import {v4 as uuid} from 'uuid'
export const checkout = (email, price) => {
  if (!(/^\w@\w.com$/).test(email)){
    alert("wrong email format")
    throw("Email format not supported")
  }
  let handler = PaystackPop.setup({
    key: "pk_test_a1d509399e526b08ee746fe6c1160670b86f44d4",
    email: email,
    amount: price*100,
    currency: 'GHS',
    ref: uuid(),
    callback: function(response) {
      //this happens after the payment is completed successfully
      var reference = response.reference;
      alert('Payment complete! Reference: ' + reference);
      // Make an AJAX call to your server with the reference to verify the transaction
      fetch("https://shelfmade.netlify.app verify_transaction?reference="+response.reference)
        .then(res=>{
          if (!response.ok) {
            throw ("Error verification unsuccesful")
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
