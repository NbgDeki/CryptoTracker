import '../styles/index.scss';

const proxyurl = 'https://cors-anywhere.herokuapp.com/';
let apiKey = '6958609d-7fcc-44ef-8996-71ea12a520e9';
let start = 1;
let limit = 50;
let url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apiKey}&start=${start}&limit=${limit}&convert=USD`;

setInterval(() => {}, 60000);

fetch(proxyurl + url)
  .then(res => res.json())
  .then(data => {
    document.querySelector('.loader').style.display = 'none';
    console.log(data.data);
    let output = '';

    data.data.forEach(doc => {
      output += `
        <tr>
          <td>${doc.name}</td>
          <td>${doc.symbol}</td>
          <td>$ ${doc.quote.USD.price}</td>
          <td>${doc.quote.USD.percent_change_24h}</td>
          <td>
            <div class="input-group input-group-sm">
              <input type="number" class="form-control mb-1" />
              <button class="btn btn-success btn-block btn-sm disabled">
                Submit
              </button>
            </div>
          </td>
        </tr>
      `;

      document.getElementById('table-js').innerHTML = output;
    });
  })
  .catch(err => console.log(err));
