const createRowDetails = (i,idKuliah, mataKuliah,hari,jamMulai,jamSelesai) => {
	let id = window.localStorage.getItem('idClass');
	console.log(id);

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
	editCell.innerHTML = `<span class="label label-info pull-left">edit</span>`

	let deleteCell = document.createElement('td');
	deleteCell.innerHTML = `<span class="label label-danger pull-left">hapus</span>`

	deleteCell.addEventListener('click', () => hapusJadwal(id,idKuliah,hari));
	editCell.addEventListener('click', () => getUpdateJadwal());
	
	
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

const hapusJadwal = async (idKelas,idKuliah,hari) => {
	let id = window.localStorage.getItem('idClass');
   window.localStorage.setItem('idMatkul',idKuliah);
   window.localStorage.setItem('hariMatkul',hari);
   let id_kuliah = window.localStorage.getItem('idMatkul');
   let hari_kuliah = window.localStorage.getItem('hariMatkul');
   console.log(id_kuliah);
   console.log(hari_kuliah);	
   let result = await fetch(`http://52.76.55.94:3000/api/v1/jadwal/remove/${id}/${id_kuliah}/${hari_kuliah}`, {
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

const getUpdateJadwal = async () => {
  let urlPart1 = window.location.href.split('/');
  window.location = urlPart1.splice(0, urlPart1.length-1).join('/') + '/editjadwal.html';
}

const getJadwalById = async () => {
  let idKelas = window.localStorage.getItem('idClass');
  console.log(idKelas);
  let result = await fetch(`http://52.76.55.94:3000/api/v1/jadwal/list?idkelas=${idKelas}`,{
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
     mode: 'cors', // no-cors, *cors, same-origin
     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     headers: ({
       'Content-Type': 'application/json',
       'authorization': window.localStorage.getItem('token'),
       // 'Content-Type': 'application/x-www-form-urlencoded',
     }),
     })
  let data = await result.json();
  console.log(data);
  let item = data.Message[0];
  window.localStorage.setItem('idCourse',item.idkuliah);
  window.localStorage.setItem('days',item.hari);
  console.log(item.idkuliah);

  let idKuliahElem = document.getElementById('edit-idKuliah');
  let namaKuliahElem = document.getElementById('edit-namaKuliah');
  let hariElem = document.getElementById('edit-hari');
  let jamMulaiElem = document.getElementById('edit-jamMulai');
  let jamSelesaiElem = document.getElementById('edit-jamSelesai');
  
  idKuliahElem.value = item.idkuliah;
  namaKuliahElem.value = item.namakuliah;
  hariElem.value = item.hari;
  jamMulaiElem.value = item.jammulai;
  jamSelesaiElem.value = item.jamselesai;
};

const updateJadwal = async () => {
  let idKuliahElem = document.getElementById('edit-idKuliah');
  let namaKuliahElem = document.getElementById('edit-namaKuliah');
  let hariElem = document.getElementById('edit-hari');
  let jamMulaiElem = document.getElementById('edit-jamMulai');
  let jamSelesaiElem = document.getElementById('edit-jamSelesai');

  let id = window.localStorage.getItem('idClass');
  console.log(id);
   let id_kuliah = window.localStorage.getItem('idCourse');
   let hari_kuliah = window.localStorage.getItem('days');
  let result = await fetch(`http://52.76.55.94:3000/api/v1/jadwal/edit/${id}/${id_kuliah}/${hari_kuliah}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': window.localStorage.getItem('token'),
    },
    body: JSON.stringify({
      "idkelas":id,
	  "idkuliah": idKuliahElem.value,
      "namakuliah": namaKuliahElem.value, 
      "hari": hariElem.value, 
      "jammulai": jamMulaiElem.value, 
      "jamselesai": jamSelesaiElem.value,
    }),
  });
  let resp = await result.json();
  console.log(resp);
  let urlPart = window.location.href.split('/');
  window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/detailkelas.html';
};