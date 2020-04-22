const createRowDetails = (i,mataKuliah,hari,jamMulai,jamSelesai) => {
	let numCell = document.createElement('td');
	numCell.innerText = i;

	let mataKuliahCell = document.createElement('td');
	mataKuliahCell.innerText = mataKuliah;

	let hariCell = document.createElement('td');
	hariCell.innerText = hari;

	let jamMulaiCell = document.createElement('td');
	jamMulaiCell.innerText = jamMulai;

	let jamSelesaiCell = document.createElement('td');
	jamSelesaiCell.innerText = jamSelesai;
	
	let row = document.createElement('tr');
	row.appendChild(numCell);
	row.appendChild(mataKuliahCell);
	row.appendChild(hariCell);
	row.appendChild(jamMulaiCell);
	row.appendChild(jamSelesaiCell);

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
	console.log(data);
	let i = 1;
	for (let item of data.Message) {
		console.log(item.idkelas);
		createRowDetails(i, item.namakuliah, item.hari, item.jammulai, item.jamselesai);
		i++;
	}
};