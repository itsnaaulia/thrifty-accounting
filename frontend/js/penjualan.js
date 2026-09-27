const pilihanBarang = document.getElementById("barang");
const pilihanPelanggan = document.getElementById("pelanggan");
const inputQty = document.getElementById("qty");
const inputTotal = document.getElementById("total");

async function tampilkanPilihanBarang() {

    const { data, error } = await supabaseClient
        .from("barang")
        .select("*")
        .order("nama_barang");

    if (error) {
        console.error("Error:", error);
        return;
    }

    data.forEach(function (barang) {

        const pilihan = document.createElement("option");

        pilihan.value = barang.id;

        pilihan.textContent =
            barang.nama_barang + " - Rp " +
            Number(barang.harga_jual).toLocaleString("id-ID") +
            " (Stok: " + barang.stok + ")";

        pilihanBarang.appendChild(pilihan);
    });
}

tampilkanPilihanBarang();
async function tampilkanPilihanPelanggan() {

    const { data, error } = await supabaseClient
        .from("pelanggan")
        .select("*")
        .order("nama");

    if (error) {
        console.error("Error:", error);
        return;
    }

    data.forEach(function (pelanggan) {

        const pilihan = document.createElement("option");

        pilihan.value = pelanggan.id;

        pilihan.textContent = pelanggan.nama;

        pilihanPelanggan.appendChild(pilihan);
    });
}

tampilkanPilihanPelanggan();
pilihanBarang.addEventListener("change", async function () {

    const barangId = pilihanBarang.value;

    if (!barangId) return;

    const { data: barang, error } = await supabaseClient
        .from("barang")
        .select("harga_jual")
        .eq("id", barangId)
        .single();

    if (error) {
        console.error("Error:", error);
        return;
    }

    console.log("Harga jual:", barang.harga_jual);

    document.getElementById("hargaJual").value =
        "Rp " + Number(barang.harga_jual).toLocaleString("id-ID");
});
inputQty.addEventListener("input", function () {

    const hargaJual = Number(
        document.getElementById("hargaJual").value.replace(/\D/g, "")
    );

    const qty = Number(inputQty.value);

    const total = hargaJual * qty;

    inputTotal.value =
        "Rp " + total.toLocaleString("id-ID");
});
const formPenjualan = document.getElementById("formPenjualan");
formPenjualan.addEventListener("submit", async function (event) {

    event.preventDefault();

const tanggal = document.getElementById("tanggal").value;
const pelangganId = document.getElementById("pelanggan").value;
const barangId = document.getElementById("barang").value;
const qty = Number(document.getElementById("qty").value);

const hargaJual = Number(
    document.getElementById("hargaJual").value.replace(/\D/g, "")
);

const total = hargaJual * qty;

const { data, error } = await supabaseClient
    .from("penjualan")
    .insert([
        {
            tanggal: tanggal,
            pelanggan_id: pelangganId,
            total: total
        }
    ])
    .select()
    .single();

if (error) {
    console.error("Error:", error);
    alert("❌ Gagal menyimpan penjualan.");
    return;
}

alert("✅ Penjualan berhasil disimpan!");

console.log("Penjualan tersimpan:", data);
const { data: barang, error: barangError } = await supabaseClient
    .from("barang")
    .select("stok, harga_beli")
    .eq("id", barangId)
    .single();

if (barangError) {
    console.error("Error mengambil data barang:", barangError);
    alert("❌ Gagal mengambil data barang.");
    return;
}
const { error: detailError } = await supabaseClient
    .from("detail_penjualan")
    .insert([
        {
            penjualan_id: data.id,
            barang_id: barangId,
            qty: qty,
            harga_jual: hargaJual,
            harga_beli: barang.harga_beli,
            subtotal: total
        }
    ]);

if (detailError) {
    console.error("Error detail:", detailError);
    alert("❌ Detail penjualan gagal disimpan.");
    return;
}

const stokBaru = barang.stok - qty;

if (stokBaru < 0) {
    alert("❌ Stok barang tidak mencukupi.");
    return;
}

const { error: stokError } = await supabaseClient
    .from("barang")
    .update({
        stok: stokBaru
    })
    .eq("id", barangId);

if (stokError) {
    console.error("Error mengurangi stok:", stokError);
    alert("❌ Gagal mengurangi stok.");
    return;
}

alert("✅ Stok berhasil diperbarui!");
});
async function tampilkanPenjualan() {

    const { data, error } = await supabaseClient
        .from("detail_penjualan")
        .select(`
            qty,
            harga_jual,
            harga_beli,
            subtotal,
            penjualan (
                tanggal,
                pelanggan (
                    nama
                )
            ),
            barang (
                nama_barang
            )
        `)
        .order("id", { ascending: false });

    if (error) {
        console.error("Error mengambil data penjualan:", error);
        return;
    }

    const tabelPenjualan = document.getElementById("tabelPenjualan");

    if (data.length === 0) {
        tabelPenjualan.innerHTML =
            "<tr><td colspan='5'>Belum ada transaksi.</td></tr>";
        return;
    }

    tabelPenjualan.innerHTML = "";

    data.forEach(function (detail) {

        const baris = `
            <tr>
                <td>${detail.penjualan.tanggal}</td>
                <td>${detail.penjualan.pelanggan.nama}</td>
                <td>${detail.barang.nama_barang}</td>
                <td>${detail.qty}</td>
                <td>Rp ${Number(detail.harga_jual).toLocaleString("id-ID")}</td>
                <td>Rp ${Number(detail.harga_beli * detail.qty).toLocaleString("id-ID")}</td>
                <td>Rp ${Number((detail.harga_jual - detail.harga_beli) * detail.qty).toLocaleString("id-ID")}</td>
                                "id-ID")}</td>
            </tr>
        `;

        tabelPenjualan.innerHTML += baris;
    });
}

tampilkanPenjualan();