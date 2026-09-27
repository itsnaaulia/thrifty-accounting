const formPelanggan = document.getElementById("formPelanggan");
const tabelPelanggan = document.getElementById("tabelPelanggan");

formPelanggan.addEventListener("submit", async function (event) {

    event.preventDefault();

    const nama = document.getElementById("nama").value;
    const no_hp = document.getElementById("no_hp").value;
    const alamat = document.getElementById("alamat").value;

    const { error } = await supabaseClient
        .from("pelanggan")
        .insert([
            {
                nama: nama,
                no_hp: no_hp,
                alamat: alamat
            }
        ]);

    if (error) {
        console.error("Error:", error);
        alert("❌ Gagal menambahkan pelanggan.");
        return;
    }

    alert("✅ Pelanggan berhasil ditambahkan!");

    formPelanggan.reset();

    tampilkanPelanggan();
});


async function tampilkanPelanggan() {

    const { data, error } = await supabaseClient
        .from("pelanggan")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        console.error("Error:", error);
        tabelPelanggan.innerHTML =
            "<tr><td colspan='3'>❌ Gagal mengambil data.</td></tr>";
        return;
    }

    if (data.length === 0) {
        tabelPelanggan.innerHTML =
            "<tr><td colspan='3'>Belum ada data pelanggan.</td></tr>";
        return;
    }

    tabelPelanggan.innerHTML = "";

    data.forEach(function (pelanggan) {

        const baris = `
            <tr>
                <td>${pelanggan.nama}</td>
                <td>${pelanggan.no_hp || "-"}</td>
                <td>${pelanggan.alamat || "-"}</td>
            </tr>
        `;

        tabelPelanggan.innerHTML += baris;
    });
}


tampilkanPelanggan();