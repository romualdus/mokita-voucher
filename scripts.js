function toggleList() {
  const listElement = document.getElementById('voucherList')
  listElement.classList.toggle('hide')
}

function customSelectOption(e) {
  const voucherIdElement = document.getElementById('voucherId')
  const currentVoucherId = voucherIdElement.value
  const voucherId = e.attributes['data-voucherId'].value
  const voucherTitle = e.firstElementChild.textContent

  voucherIdElement.value = voucherId
  document.getElementById('voucherTitle').value = voucherTitle

  if(currentVoucherId !== "") {
    document.querySelector(`[data-voucherId='${currentVoucherId}']`).classList.remove('selected')
  }

  e.classList.add('selected')

  const formGroup = voucherIdElement.parentElement.parentElement
  formGroup.classList.remove('form-group--error')
}

function onValueChange(e) {
  e.parentElement.classList.remove('form-group--error')
}

function onYearChange(e) {
  const year = e.value
  const typeElement = document.getElementById('typeField')
  typeElement.value = '<option value="" disabled selected>Loading...<option>'

  fetch(`/url/${year}`, {
    method: 'GET'
  })
  .then(res =>  res.json())
  .then(result => {
    if(result.data) {
      renderTypeOptions(result.data.rows)
    }
  })
  .catch(error => {
    typeElement.innerHTML = '<option value="" disabled selected>-- Pilih Tipe Motor --</option>'
    console.error(error)}
  );
}

function renderTypeOptions(data) {
  const typeElement = document.getElementById('typeField')
  typeElement.innerHTML = '<option value="" disabled selected>-- Pilih Tipe Motor --</option>'

  data.map(option => {
    typeElement.innerHTML += 
      `<option value="${option.id}">${option.name}</option>`
  })
}