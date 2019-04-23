import '../styles/index.scss';

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
    console.log(data.data);
    let output = '';
    setInterval(() => {}, 10000);
    data.data.forEach(doc => {
      let num =
        doc.quote.USD.percent_change_24h > 0 ? 'text-success' : 'text-danger';

      output += `
        <tr>
          <td>${doc.name}</td>
          <td>${doc.symbol}</td>
          <td>$ ${doc.quote.USD.price}</td>
          <td class="${num}">${doc.quote.USD.percent_change_24h} %</td>
          <td>
            <div class="input-group input-group-sm">
              <input type="number" class="form-control mb-1" />
              <button class="btn btn-success btn-block btn-sm disabled">
                Submit
              </button>
            </div>
          </td>
          <td class="myCoin"></td>
        </tr>
      `;

      // Sta sam ovde uradio...
      document.addEventListener('click', e => {
        if (e.target.className.includes('btn')) {
          let amount = document.querySelectorAll('.myCoin');
          amount.forEach(number => {
            number.innerHTML =
              e.target.previousSibling.previousSibling.value *
              doc.quote.USD.price;
          });
        }

        e.preventDefault();
      });
      document.getElementById('table-js').innerHTML = output;
    });
  })
  .catch(err => console.log(err));
