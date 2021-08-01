const main =  document.getElementById('main');
const watchList = document.getElementById('watchList');
const inputTokenName = document.getElementById('inputTokenName');
const button = document.getElementById('button');

let token;
let tokenName = 'bitcoin';

const fetchToken = async(name) => {
    //API
    token = await fetch(
        "https://api.coingecko.com/api/v3/coins/" + name + "?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false"
    ).then(res => res.json());
};

const showToken = async(tokenName) => {
    await fetchToken(tokenName);

    const coin = document.createElement('div');
    coin.classList.add('card');
    watchList.appendChild(coin);
    coin.innerHTML = 
    `
    <img src="${token.image.thumb}" />
    <strong>${token.symbol.toUpperCase()}</strong> - Rank : ${token.market_cap_rank} <br />
    Price : ${token.market_data.current_price.usd}$ <br />
    24h change : ${token.market_data.price_change_percentage_24h}%
    `;
    console.log(token)



};

button.addEventListener('click', (e) => {
    e.preventDefault();
    tokenName = inputTokenName.value;
    console.log("inputTokenName = " + inputTokenName.value);
    showToken(tokenName.toLowerCase());
});

showToken('polkadot');
