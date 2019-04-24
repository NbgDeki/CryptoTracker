import '../styles/index.scss';

const proxyurl = 'https://cors-anywhere.herokuapp.com/',
  apiKey = '6958609d-7fcc-44ef-8996-71ea12a520e9',
  start = 1,
  limit = 50,
  url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apiKey}&start=${start}&limit=${limit}&convert=USD`;

const getData = () => {
  // Fetching and outputing data
  fetch(proxyurl + url)
    .then(res => res.json())
    .then(data => {
      document.querySelector('.loader').style.display = 'none';
      let output = '';

      data.data.forEach(doc => {
        let num =
          doc.quote.USD.percent_change_24h > 0 ? 'text-success' : 'text-danger';

        output += `
        <tr>
          <td><a class="text-primary" href="#">${doc.name}</a></td>
          <td>${doc.symbol}</td>
          <td>$ ${doc.quote.USD.price}</td>
          <td class="crypto-value" style="display:none;">${
            doc.quote.USD.price
          }</td>
          <td class="${num}">${doc.quote.USD.percent_change_24h} %</td>
          <td>
            <div class="input-group input-group-sm">
              <input type="number" class="form-control mb-2" />
              <button class="btn btn-success btn-block btn-sm" disabled>
                Submit
              </button>
            </div>
          </td>
          <td class="myCoin"></td>
        </tr>
      `;

        document.getElementById('table-js').innerHTML = output;
      });

      //Counting crypto amount you own
      // Getting array of buttons
      let buttons = document
        .getElementById('table-js')
        .getElementsByClassName('btn');

      // Adding Event listeners to every button
      Array.from(buttons).forEach(button => {
        button.addEventListener('click', e => {
          // Finding closest table row
          const selectedRow = e.target.closest('tr');
          let amount = selectedRow.querySelector('.myCoin');

          // Parse String to number
          const cryptoValue = parseFloat(
            selectedRow.querySelector('.crypto-value').textContent
          );
          const myValue = parseFloat(selectedRow.querySelector('input').value);

          amount.innerHTML = `${cryptoValue * myValue}$`;
        });
      });

      // Enabling buttons and input values submited on ENTER
      // Getting array of inputs
      let inputs = document
        .getElementById('table-js')
        .getElementsByClassName('form-control');

      // Adding Event listeners for every button
      Array.from(inputs).forEach(input => {
        input.addEventListener('keyup', e => {
          // Finding closes input
          const selectedInput = e.target.closest('input');
          let buttons = document
            .getElementById('table-js')
            .getElementsByClassName('btn');
          const selectedRow = e.target.closest('tr');
          let amount = selectedRow.querySelector('.myCoin');

          const button = e.target.parentElement.querySelector('button');

          if (selectedInput.value) {
            button.removeAttribute('disabled');
          } else {
            button.setAttribute('disabled', true);
            // Clearing value of your coin after clearing input
            amount.innerHTML = '';
          }

          // Button clicks when ENTER is pressed
          if (e.keyCode === 13) {
            button.click();
          }
        });
      });
    })
    .catch(err => console.log(err));
};

getData();

// Set refresh interval
setInterval(() => {
  getData();
  console.log('reload!');
}, 60000);
