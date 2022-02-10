(function () {
    this.LocalPicker = function () {
        'use strict';
        const {
            province = 'province',
            district = 'district',
            ward = 'ward'
        } = arguments[0] && typeof arguments[0] === 'object'
            ? arguments[0]
            : {};

        const apiUrl = 'https://provinces.open-api.vn/api';

        const getProvinces = async () =>
            await fetch(`${apiUrl}/?depth=1`).then((res) => res.json());
        const getDistricts = async (provinceCode) =>
            await fetch(`${apiUrl}/p/${provinceCode}/?depth=2`).then((res) =>
                res.json()
            );
        const getWards = async (districtCode) =>
            await fetch(`${apiUrl}/d/${districtCode}/?depth=2`).then((res) =>
                res.json()
            );

        const init = async () => {
            let provincesEl, districtsEl, wardsEl;
            try {
                provincesEl = document.querySelector(
                    `select[name="${province}"]`
                );
                districtsEl = document.querySelector(
                    `select[name="${district}"]`
                );
                wardsEl = document.querySelector(`select[name="${ward}"]`);
                if (!provincesEl || !districtsEl || !wardsEl)
                    return console.error(
                        'One or more selectors cannot be found'
                    );
            } catch (error) {
                return console.error(
                    `One or more selectors cannot be found at ${error}`
                );
            }

            provincesEl.innerHTML =
                '<option value selected disabled hidden>Chọn Tỉnh / Thành phố</option>';
            districtsEl.innerHTML =
                '<option value selected disabled hidden>Chọn Quận / Huyện</option>';
            wardsEl.innerHTML =
                '<option value selected disabled hidden>Chọn Phường / Xã</option>';

            try {
                const provincesData = await getProvinces();
                const provincesHtml = provincesData
                    .map((el) => `<option value=${el.code}>${el.name}</option>`)
                    .join('');

                provincesEl.innerHTML = `<option value selected disabled hidden>Chọn Tỉnh / Thành phố</option>${provincesHtml}`;
            } catch (error) {
                console.log(error);
            }

            provincesEl.addEventListener('change', async (e) => {
                districtsEl.innerHTML =
                    '<option value selected disabled hidden>Chọn Quận / Huyện</option>';
                wardsEl.innerHTML =
                    '<option value selected disabled hidden>Chọn Phường / Xã</option>';

                try {
                    const districtsData = await getDistricts(e.target.value);
                    const districtsHtml = districtsData.districts
                        .map(
                            (el) =>
                                `<option value=${el.code}>${el.name}</option>`
                        )
                        .join('');

                    districtsEl.innerHTML += districtsHtml;
                } catch (error) {
                    console.log(error);
                }
            });

            districtsEl.addEventListener('change', async (e) => {
                wardsEl.innerHTML = `<option value selected disabled hidden>Chọn Phường / Xã</option>`;

                try {
                    const wardsData = await getWards(e.target.value);
                    const wardsHtml = wardsData.wards
                        .map(
                            (el) =>
                                `<option value=${el.code}>${el.name}</option>`
                        )
                        .join('');

                    wardsEl.innerHTML += wardsHtml;
                } catch (error) {
                    console.log(error);
                }
            });
        };

        window.addEventListener('load', init);
    };
})();
