const checkout = () => {
  let handler = PaystackPop.setup({
    key: 'YOUR_PUBLIC_KEY',
    currency: 'GHS',
    ref: 'YOUR_REFERENCE',
    callback: function(response) {
      //this happens after the payment is completed successfully
      var reference = response.reference;
      alert('Payment complete! Reference: ' + reference);
      // Make an AJAX call to your server with the reference to verify the transaction

    },
    onClose: function() {
      alert('Transaction was not completed, window closed.');
    },
  });
  handler.openIframe();
  }
}
