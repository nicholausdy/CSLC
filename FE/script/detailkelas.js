const createRowDetails = (i,idKuliah, mataKuliah,hari,jamMulai,jamSelesai) => {
	let id = window.localStorage.getItem('idKelas');

	let numCell = document.createElement('td');
	numCell.innerText = i;

	let idKuliahCell = document.createElement('td');
	idKuliahCell.innerText = idKuliah;

	let mataKuliahCell = document.createElement('td');
	mataKuliahCell.innerText = mataKuliah;

	let hariCell = document.createElement('td');
	hariCell.innerText = hari;

	let jamMulaiCell = document.createElement('td');
	jamMulaiCell.innerText = jamMulai;

	let jamSelesaiCell = document.createElement('td');
	jamSelesaiCell.innerText = jamSelesai;

	let editCell = document.createElement('td');
	editCell.innerHTML = `<span class="label label-info pull-left" onclick="updateJadwal(${id})">edit</span>`

	let deleteCell = document.createElement('td');
	deleteCell.innerHTML = `<span class="label label-danger pull-left" onclick="hapusJadwal(${id},${idKuliah},${hari})">hapus</span>`
	
	let row = document.createElement('tr');
	row.appendChild(numCell);
	row.appendChild(idKuliahCell);
	row.appendChild(mataKuliahCell);
	row.appendChild(hariCell);
	row.appendChild(jamMulaiCell);
	row.appendChild(jamSelesaiCell);
	row.appendChild(editCell);
	row.appendChild(deleteCell);

	let table = document.getElementById('tabelDetailKelas');
	table.appendChild(row);
};

const getClassDetailsById = async () => {
	let id_kelas = localStorage.getItem('idClass');
    let result = await fetch(`http://52.76.55.94:3000/api/v1/jadwal/list?idkelas=${id_kelas}`,{
  	method: 'GET', // *GET, POST, PUT, DELETE, etc.
     mode: 'cors', // no-cors, *cors, same-origin
     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     headers: ({
       'Content-Type': 'application/json',
       'authorization': window.localStorage.getItem('token'),
       // 'Content-Type': 'application/x-www-form-urlencoded',
     })
 	})
    let data = await result.json();
    let item = data.Message;
    window.localStorage.setItem('namaMatkul',item)
	console.log(data);
	let i = 1;
	for (let item of data.Message) {
		console.log(item.idkelas);
		createRowDetails(i, item.idkuliah, item.namakuliah, item.hari, item.jammulai, item.jamselesai);
		i++;
	}
};

const updateJadwal = async () => {
  let kapasitasKelasElem = document.getElementById('edit-kapasitasKelas');
  let jumlahLampuElem = document.getElementById('edit-jumlahLampu');
  let gedungElem = document.getElementById('edit-gedung');
  let lantaiElem = document.getElementById('edit-lantai');

  let id = window.localStorage.getItem('idClass');
  console.log(id);
  let result = await fetch(`http://52.76.55.94:3000/api/v1/kelas/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': window.localStorage.getItem('token'),
    },
    body: JSON.stringify({
	   "idkelas": id,
      "kapasitaskelas": parseInt(kapasitasKelasElem.value), 
      "jumlahlampu": parseInt(jumlahLampuElem.value), 
      "idgedung": gedungElem.value, 
      "lantai": parseInt(lantaiElem.value),
    }),
  });
  let resp = await result.json();
  console.log(resp);
  let urlPart = window.location.href.split('/');
  window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/detailkelas.html';
};

const hapusJadwal = async (idKelas,idKuliah,hari) => {
	let id = window.localStorage.getItem('idClass');
	let matkul = window.localStorage.getItem('namaMatkul');
   let result = await fetch(`http://52.76.55.94:3000/api/v1/jadwal/remove/${id}/II4096/Selasa`, {
    method: 'DELETE',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: ({
       'Content-Type': 'application/json',
       'authorization': window.localStorage.getItem('token'),
       // 'Content-Type': 'application/x-www-form-urlencoded',
     })
  })
  let resp = await result.json();
  console.log(resp);
  let urlPart = window.location.href.split('/');
  window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/detailkelas.html';
};