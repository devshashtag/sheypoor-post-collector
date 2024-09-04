# Sheypoor Post Collector

This Node.js application simplifies the process of gathering **_publicly available_** Sheypoor posts, converting them into a structured JSON format for easy analysis and use.
<br />
<br />

![home](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/home.png)

<br />

![collector status-done view](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/collector-status-done-view.png)

<br />

![collector status-done view](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/collected-data.png)

# Requirements

- Node.js: Download and install Node.js from https://nodejs.org/
- npm (Node Package Manager): Comes bundled with Node.js.

## NPM Dependencies

- axios
- cheerio
- express

# Installation

1.download and install node.js and dependencies

```bash
git clone "https://github.com/devshashtag/sheypoor-post-collector.git"
cd sheypoor-post-collector
npm install
npm run server
```

<br />

2.open your web browser and visit: http://127.0.0.1:8080

<br />

3.Use the dropdown menu to choose the city you want to collect data from <br />

![home dropdown](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/home-dropdown.png)
<br />

4.Enter the starting and ending page numbers (minimum 1, maximum 10000) <br />

![home page-numbers valid-ranges](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/home-page-numbers-valid-ranges.png)
<br />

5.Click the "جستجو" (Search) button. The app will begin downloading posts <br />

![collector view](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/collector-view.png)
<br />

6.ou can see the progress of the download for each page <br />

![collector post link](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/collector-post-link.png)
<br />

7.Once the download is complete or at any time during the process, click the "Download" button to save the data in JSON format <br />

![collector download](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/collector-download.png)
<br />

8.You can go back to the home screen and begin a new data collection. However, any posts downloaded during the previous session will be lost unless you've saved them as a JSON file.

## Error Handling

**API rate limits:** Due to API limitations, you may encounter an error message every 10 pages. To continue downloading, you need to change your IP address. <br />

1.If you're using Wi-Fi, restart your router.
2.If you're using mobile data, turn your mobile data off and on again.

and then click **continue button** to download the remaining pages.

![collector alert limit](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/collector-alert-limit.png)

<br />

**No internet connection**: If you don't have an internet connection, you'll receive an error message. Ensure your internet connection is active before starting the download. <br />

![collector alert error](https://github.com/devshashtag/sheypoor-post-collector-nodejs/blob/main/screenshot/collector-alert-error.png)
