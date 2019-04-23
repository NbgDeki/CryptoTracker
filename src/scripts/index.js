import '../styles/index.scss';
import { parse } from 'path';

const proxyurl = 'https://cors-anywhere.herokuapp.com/';
let apiKey = '6958609d-7fcc-44ef-8996-71ea12a520e9';
let start = 1;
let limit = 50;
let url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apiKey}&start=${start}&limit=${limit}&convert=USD`;

// Fetching and outputing data
fetch(proxyurl + url)
  .then(res => res.json())
  .then(data => {
    document.querySelector('.loader').style.display = 'none';
    // console.log(data.data);
    let output = '';

    data.data.forEach(doc => {
      let num =
        doc.quote.USD.percent_change_24h > 0 ? 'text-success' : 'text-danger';

      output += `
        <tr>
          <td>${doc.name}</td>
          <td>${doc.symbol}</td>
          <td>$ ${doc.quote.USD.price}</td>
          <td class="crypto-value" style="display:none;">${
            doc.quote.USD.price
          }</td>
          <td class="${num}">${doc.quote.USD.percent_change_24h} %</td>
          <td>
            <div class="input-group input-group-sm">
              <input type="number" class="form-control mb-2" />
              <button class="btn btn-success btn-block btn-sm disabled">
                Submit
              </button>
            </div>
          </td>
          <td class="myCoin"></td>
        </tr>
      `;

      document.getElementById('table-js').innerHTML = output;
    });

    //Bind event handler
    let buttons = document
      .getElementById('table-js')
      .getElementsByClassName('btn');

    Array.from(buttons).forEach(button => {
      button.addEventListener('click', event => {
        const selectedRow = event.target.closest('tr');
        let amount = selectedRow.querySelector('.myCoin');

        // Parse String to number
        const cryptoValue = parseFloat(
          selectedRow.querySelector('.crypto-value').textContent
        );
        const myValue = parseFloat(selectedRow.querySelector('input').value);

        if (isNaN(myValue) || myValue <= 0) {
          console.log('Please enter a valid number');
          amount.style.color = 'red';
          amount.innerHTML = 'Please enter a valid number';
          selectedRow.querySelector('input').style.border = '2px solid red';
        } else {
          amount.innerHTML = cryptoValue * myValue;
          selectedRow.querySelector('input').style.border = '1px solid #ced4da';
          amount.style.color = 'black';
        }
      });
    });
  })
  .catch(err => console.log(err));
