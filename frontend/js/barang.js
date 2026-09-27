// mengambil form dari halaman barang.html
const formBarang = document.getElementById("formBarang");

// mengambil tabel untuk menampilkan data
const tabelBarang = document.getElementById("tabelBarang");


// ===============================
// MENAMBAH DATA BARANG
// ===============================

formBarang.addEventListener("submit", async function (event) {

    // mencegah halaman reload
    event.preventDefault();

    // mengambil isi form
    const kode_barang = document.getElementById("kode_barang").value;
    const nama_barang = document.getElementById("nama_barang").value;
    const kategori = document.getElementById("kategori").value;
    const harga_beli = document.getElementById("harga_beli").value;
    const harga_jual = document.getElementById("harga_jual").value;
    const stok = document.getElementById("stok").value;

    // memasukkan data ke Supabase
    const { data, error } = await supabaseClient
        .from("barang")
        .insert([
            {
                kode_barang: kode_barang,
                nama_barang: nama_barang,
                kategori: kategori,
                harga_beli: harga_beli,
                harga_jual: harga_jual,
                stok: stok
            }
        ])
        .select();

    // kalau terjadi error
    if (error) {
        console.error("Error:", error);
        alert("❌ Gagal menambahkan barang.");
        return;
    }

    // kalau berhasil
    alert("✅ Barang berhasil ditambahkan!");

    // kosongkan form
    formBarang.reset();

    // tampilkan data terbaru
    tampilkanBarang();
});


// ===============================
// MENAMPILKAN DATA BARANG
// ===============================

async function tampilkanBarang() {

    const { data, error } = await supabaseClient
        .from("barang")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        console.error("Error:", error);
        tabelBarang.innerHTML =
            "<tr><td colspan='6'>❌ Gagal mengambil data.</td></tr>";
        return;
    }

    // kalau belum ada data
    if (data.length === 0) {
        tabelBarang.innerHTML =
            "<tr><td colspan='6'>Belum ada data barang.</td></tr>";
        return;
    }

    // mengosongkan tabel
    tabelBarang.innerHTML = "";

    // memasukkan setiap barang ke tabel
    data.forEach(function (barang) {

        const baris = `
    <tr>
        <td>${barang.kode_barang}</td>
        <td>${barang.nama_barang}</td>
        <td>${barang.kategori}</td>
        <td>Rp ${Number(barang.harga_beli).toLocaleString("id-ID")}</td>
        <td>Rp ${Number(barang.harga_jual).toLocaleString("id-ID")}</td>
        <td>${barang.stok}</td>
        <td>
            <button onclick="editBarang(${barang.id})">Edit</button>
            <button onclick="hapusBarang(${barang.id})">Hapus</button>
        </td>
    </tr>
`;

        tabelBarang.innerHTML += baris;
    });
}


// ===============================
// MENJALANKAN SAAT HALAMAN DIBUKA
// ===============================

tampilkanBarang();
async function editBarang(id) {

    const { data: barang, error } = await supabaseClient
        .from("barang")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error:", error);
        alert("❌ Gagal mengambil data barang.");
        return;
    }

    const namaBaru = prompt("Nama barang:", barang.nama_barang);

    if (namaBaru === null) return;

    const kategoriBaru = prompt("Kategori:", barang.kategori);

    if (kategoriBaru === null) return;

    const hargaBeliBaru = prompt("Harga beli:", barang.harga_beli);

    if (hargaBeliBaru === null) return;

    const hargaJualBaru = prompt("Harga jual:", barang.harga_jual);

    if (hargaJualBaru === null) return;

    const stokBaru = prompt("Stok:", barang.stok);

    if (stokBaru === null) return;

    const { error: updateError } = await supabaseClient
        .from("barang")
        .update({
            nama_barang: namaBaru,
            kategori: kategoriBaru,
            harga_beli: Number(hargaBeliBaru),
            harga_jual: Number(hargaJualBaru),
            stok: Number(stokBaru)
        })
        .eq("id", id);

    if (updateError) {
        console.error("Error:", updateError);
        alert("❌ Gagal mengubah barang.");
        return;
    }

    alert("✅ Barang berhasil diubah!");

    tampilkanBarang();
}
async function hapusBarang(id) {

    const yakin = confirm("Yakin ingin menghapus barang ini?");

    if (!yakin) return;

    const { error } = await supabaseClient
        .from("barang")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error:", error);
        alert("❌ Gagal menghapus barang.");
        return;
    }

    alert("✅ Barang berhasil dihapus!");

    tampilkanBarang();
}