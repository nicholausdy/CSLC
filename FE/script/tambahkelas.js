let token = window.localStorage.getItem('token');
console.log(token);

const postKelas = async () => {

  let idKelasElem = document.getElementById('idKelas');
  let kapasitasKelasElem = document.getElementById('kapasitasKelas');
  let jumlahLampuElem = document.getElementById('jumlahLampu');
  let gedungElem = document.getElementById('gedung');
  let lantaiElem = document.getElementById('lantai')

   console.log(
    JSON.stringify({
        "idkelas": idKelasElem.value,
        "idgedung": gedungElem.value,
        "lantai": parseInt(lantaiElem.value),
        "jumlahlampu": parseInt(jumlahLampuElem.value),
        "kapasitaskelas": parseInt(kapasitasKelasElem.value),
      })
    )

  let result = await fetch(`http://52.76.55.94:3000/api/v1/kelas/add`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: ({
      'Content-Type': 'application/json',
      'authorization': window.localStorage.getItem('token'),
    }),
    body: JSON.stringify({
        "idkelas": idKelasElem.value,
        "idgedung": gedungElem.value,
        "lantai": parseInt(lantaiElem.value),
        "jumlahlampu": parseInt(jumlahLampuElem.value),
        "kapasitaskelas": parseInt(kapasitasKelasElem.value),
    })
  })
  const res = await result.json();
  console.log(res);
};