async function tampilkanLaporan() {

    const { data: detailPenjualan, error } = await supabaseClient
        .from("detail_penjualan")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error("Error mengambil data laporan:", error);
        return;
    }

    let totalOmzet = 0;
    let totalBarangTerjual = 0;
    let totalHPP = 0;
    let labaKotor = 0;

    detailPenjualan.forEach(function (detail) {

        const qty = Number(detail.qty);
        const hargaJual = Number(detail.harga_jual);
        const hargaBeli = Number(detail.harga_beli);

        totalOmzet += hargaJual * qty;
        totalBarangTerjual += qty;
        totalHPP += hargaBeli * qty;
        labaKotor += (hargaJual - hargaBeli) * qty;

    });

    const totalTransaksi = detailPenjualan.length;

    const marginLaba = totalOmzet > 0
        ? (labaKotor / totalOmzet) * 100
        : 0;


    document.getElementById("laporanOmzet").textContent =
        "Rp " + totalOmzet.toLocaleString("id-ID");

    document.getElementById("laporanTransaksi").textContent =
        totalTransaksi;

    document.getElementById("laporanBarangTerjual").textContent =
        totalBarangTerjual;

    document.getElementById("laporanHPP").textContent =
        "Rp " + totalHPP.toLocaleString("id-ID");

    document.getElementById("laporanLaba").textContent =
        "Rp " + labaKotor.toLocaleString("id-ID");

    document.getElementById("laporanMargin").textContent =
        marginLaba.toFixed(1) + "%";


    const tabel = document.getElementById("tabelLaporan");

    tabel.innerHTML = "";


    if (detailPenjualan.length === 0) {

        tabel.innerHTML = `
            <tr>
                <td colspan="4">
                    Belum ada data penjualan.
                </td>
            </tr>
        `;

        return;
    }


    detailPenjualan.forEach(function (detail) {

        const tanggal = detail.created_at
            ? new Date(detail.created_at).toLocaleDateString("id-ID")
            : "-";

        const hargaJual =
            Number(detail.harga_jual) * Number(detail.qty);

        const hpp =
            Number(detail.harga_beli) * Number(detail.qty);

        const laba =
            hargaJual - hpp;


        const baris = document.createElement("tr");

        baris.innerHTML = `
            <td>${tanggal}</td>

            <td>
                Rp ${hargaJual.toLocaleString("id-ID")}
            </td>

            <td>
                Rp ${hpp.toLocaleString("id-ID")}
            </td>

            <td>
                Rp ${laba.toLocaleString("id-ID")}
            </td>
        `;

        tabel.appendChild(baris);

    });

}


tampilkanLaporan();