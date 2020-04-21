 const createRow = (i,idKelas,kapasitasKelas,jumlahLampu,gedung,lantai,detail,edit,hapus) => {
	let numCell = document.createElement('td');
	numCell.innerText = i;

	let idKelasCell = document.createElement('td');
	idKelasCell.innerText = idKelas;

	let kapasitasKelasCell = document.createElement('td');
	kapasitasKelasCell.innerText = kapasitasKelas;

	let jumlahLampuCell = document.createElement('td');
	jumlahLampuCell.innerText = jumlahLampu;

	let gedungCell = document.createElement('td');
	gedungCell.innerText = gedung;

	let lantaiCell = document.createElement('td');
	lantaiCell.innerText = lantai;

	let detailCell = document.createElement('td');
	//detailCell.innerHTML = `<span class="label label-info pull-left" onclick="detail(${idMahasiswa})">lihat detail</span>`

	let editCell = document.createElement('td');
	//detailCell.innerHTML = `<span class="label label-info pull-left" onclick="edit(${idMahasiswa})">edit</span>`

	let hapusCell = document.createElement('td');
	//hausCell.innerHTML = `<span class="label label-info pull-left" onclick="hapus(${idMahasiswa})">hapus</span>`
	
	let row = document.createElement('tr');
	row.appendChild(numCell);
	row.appendChild(idKelasCell);
	row.appendChild(kapasitasKelasCell);
	row.appendChild(jumlahLampuCell);
	row.appendChild(gedungCell);
	row.appendChild(lantaiCell);
	row.appendChild(detailCell);
	row.appendChild(editCell);
	row.appendChild(hapusCell);

	let table = document.getElementById('tabelDaftarKelas');
	table.appendChild(row);
};

const loadData = async () => {
	let result = await fetch(`http://52.76.55.94:3000/api/v1/kelas/list`,{
	method: 'GET', // *GET, POST, PUT, DELETE, etc.
     mode: 'cors', // no-cors, *cors, same-origin
     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     headers: ({
       'Content-Type': 'application/json',
       'authorization': window.localStorage.getItem('token'),
       // 'Content-Type': 'application/x-www-form-urlencoded',
     }),
     });
	let data = await result.json();
	console.log(data);
	let i = 1;
	for (let item of data.Message) {
		console.log(item.idkelas);
		createRow(i, item.idkelas, item.idgedung, item.lantai, item.jumlahlampu, item.kapasitaskelas, item.lampumenyala);
		i++;
	}
};
