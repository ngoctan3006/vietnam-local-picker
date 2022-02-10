# Vietnam local selector - JavaScript plugin

_Create HTML Select element for Vietnam province, district and ward._

API: [https://provinces.open-api.vn/](https://provinces.open-api.vn/)

## Usage

HTML:

```html
<select name="province"></select>
<select name="district"></select>
<select name="ward"></select>
```

Link js file to html and use:

```html
<script src="local-picker.min.js"></script>
<script>
    const localPicker = new LocalPicker({
        province: 'province',
        district: 'district',
        ward: 'ward'
    });
</script>
```
