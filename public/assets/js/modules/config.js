// ingore error posts per page
const IGNORE_POSTS_ERROR = 2;

// message timeout
const MESSAGE_TIMEOUT = 10000; // 10 sec

// cities json
const CITIES_JSON_FILE = '/assets/js/data/cities.json';

// messages
const messages = {
  contactLimit: `
<br>
به محدودیت سایت شیپور در گرفتن شماره ها رسیده اید<br><br>
برای ادامه اینترنت خود را خاموش و روشن کنید<br>
سپس از پنل بالا بر روی ادامه فرایند کلیک کنید<br>
<b>نکته</b><br>
اگر از وای فای استفاده میکنید باید وای فای خود را خاموش روشن کنید<br>
<br>`,

  pageError: `
<br>
خطایی در دریافت پست ها رخ داده<br><br>
برای ادامه اینترنت خود را خاموش و روشن کنید<br>
سپس از پنل بالا بر روی ادامه فرایند کلیک کنید<br>
<b>نکته</b><br>
اگر از وای فای استفاده میکنید باید وای فای خود را خاموش روشن کنید<br>
<br>`,

  download: `
<br>
دانلود با موفقیت انجام شد<br>
لطفا پوشه دانلودها را بررسی کنید<br>
<br>`,

  downloadNoData: `
<br>
  داده ای برای دانلود یافت نشد<br>
<br>`,

  back: `
پست های دانلود نشده پاک خواهند شد.
 به صفحه اصلی برمیگردید ؟
`,
}

// functions
const addActive = (elm) => elm.classList.add('active');
const removeActive = (elm) => elm.classList.remove('active');
const toggleActive = (elm) => elm.classList.toggle('active');

export {
  IGNORE_POSTS_ERROR,
  MESSAGE_TIMEOUT,
  CITIES_JSON_FILE,
  messages,
  // function
  addActive,
  removeActive,
  toggleActive,
}
