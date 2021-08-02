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

    let redGreen;
    token.market_data.price_change_percentage_24h > 0 ? redGreen = "green" : redGreen = "#e70f0f";

    coin.innerHTML = 
    `
    <div class="tokenDescription">
    <img src="${token.image.thumb}" />
    <strong>${token.symbol.toUpperCase()}</strong> - Rank : ${token.market_cap_rank} <br />
    Price : ${token.market_data.current_price.usd}$ <br />
    <div class="tokenChangeInTime">
    24h change : <span style="color:${redGreen}">${token.market_data.price_change_percentage_24h}% / </span>
    7d change : <span style="color:${redGreen}">${token.market_data.price_change_percentage_7d}% / </span>
    30d change : <span style="color:${redGreen}">${token.market_data.price_change_percentage_30d}% / </span>
    1y change : <span style="color:${redGreen}">${token.market_data.price_change_percentage_1y}% / </span>
    </div>
    </div>
    `;
    console.log(token)

//.market_data.ath.usd && .ath_date .ath_change_percentage

};

button.addEventListener('click', (e) => {
    e.preventDefault();
    tokenName = inputTokenName.value;
    console.log("inputTokenName = " + inputTokenName.value);
    showToken(tokenName.toLowerCase());
});

showToken('polkadot');
showToken('elrond-erd-2');
showToken('beefy-finance');
showToken('bitcoin');
showToken('aave');
showToken('crypto-com-chain');
