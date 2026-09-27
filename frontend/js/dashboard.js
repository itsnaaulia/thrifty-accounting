async function tampilkanDashboard() {

    const { data, error } = await supabaseClient
        .from("detail_penjualan")
        .select("qty, harga_jual, harga_beli");

    if (error) {
        console.error("Error mengambil data dashboard:", error);
        return;
    }

    let totalOmzet = 0;
    let totalTransaksi = 0;
    let barangTerjual = 0;
    let totalHPP = 0;
    let labaKotor = 0;

    data.forEach(function (detail) {

        totalOmzet += Number(detail.harga_jual) * Number(detail.qty);

        barangTerjual += Number(detail.qty);

        totalHPP += Number(detail.harga_beli) * Number(detail.qty);

        labaKotor +=
            (Number(detail.harga_jual) - Number(detail.harga_beli))
            * Number(detail.qty);
    });

    totalTransaksi = data.length;

    document.getElementById("totalOmzet").textContent =
        "Rp " + totalOmzet.toLocaleString("id-ID");

    document.getElementById("totalTransaksi").textContent =
        totalTransaksi;

    document.getElementById("barangTerjual").textContent =
        barangTerjual;

    document.getElementById("totalHPP").textContent =
        "Rp " + totalHPP.toLocaleString("id-ID");

    document.getElementById("labaKotor").textContent =
        "Rp " + labaKotor.toLocaleString("id-ID");
}

tampilkanDashboard();