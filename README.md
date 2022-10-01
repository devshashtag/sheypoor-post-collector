# about

\*this app helps you to collect **_PUBLIC DATA_** from sheypoor posts with json format\* <br />

<br />

![home](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/home.png)

<br />

![collector status-done view](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/collector-status-done-view.png)

<br />

![collector status-done view](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/collected-data.png)

# requirements

- npm
- nodejs

## npm dependencies

- axios
- cheerio
- express

# install

```bash

git clone "https://github.com/DevsHashtag/sheypoor-post-collector.git"

cd sheypoor-post-collector

npm install

npm run server

```

<br />

**goto**: http://localhost:8080/

<br />

## how to use

1. select a city <br />

![home dropdown](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/home-dropdown.png)
<br />

2. set start page, end page that you want to download posts ( min: 1, max: 10000) <br />

![home page-numbers valid-ranges](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/home-page-numbers-valid-ranges.png)
<br />

3. click on جستجو(search) and wait for app to download data <br />

![collector view](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/collector-view.png)
<br />

4. after a while you can see data loaded for each page <br />

![collector post link](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/collector-post-link.png)
<br />

5. you can click on download button at any moment or you can wait for app to finish downloading <br />

![collector download](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/collector-download.png)
<br />

6. you can go back if you want and start over but all downloaded posts will be lost unless you downloaded it as json <br /><br />

## Errors

**due to api limit after a while you'll get a error message ( every 10 page ) and you have to change your ip to continue**: <br />

- if you are with wifi you have to restart you'r wifi to get new ip
- if you are with mobile networks you have to simply turn off and turn on your mobile data

_click on continue to download other pages_

![collector alert limit](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/collector-alert-limit.png)

<br />

**if you dont have internet turn on, you'll get this error and app is waiting for you to turn it on** <br />

![collector alert error](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/collector-alert-error.png)

# screenshots

[more screenshots](https://github.com/DevsHashtag/sheypoor-post-collector/tree/main/screenshot)
