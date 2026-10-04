async function tampilkanDashboard() {

    const { data: barang, error: errorBarang } = await supabaseClient
        .from("barang")
        .select("*");

    if (errorBarang) {
        console.error("Error mengambil data barang:", errorBarang);
        return;
    }

    const { data: detailPenjualan, error: errorPenjualan } =
        await supabaseClient
            .from("detail_penjualan")
            .select("*");

    if (errorPenjualan) {
        console.error("Error mengambil data penjualan:", errorPenjualan);
        return;
    }

    let totalOmzet = 0;
    let barangTerjual = 0;
    let totalHPP = 0;
    let labaKotor = 0;
    let totalPersediaan = 0;

    let totalItems = barang.length;
    let availableItems = 0;
    let lowStock = 0;
    let outStock = 0;

    detailPenjualan.forEach(function (detail) {

        const qty = Number(detail.qty);
        const hargaJual = Number(detail.harga_jual);
        const hargaBeli = Number(detail.harga_beli);

        totalOmzet += hargaJual * qty;
        barangTerjual += qty;
        totalHPP += hargaBeli * qty;
        labaKotor += (hargaJual - hargaBeli) * qty;
    });

    barang.forEach(function (item) {

        const stok = Number(item.stok);

        totalPersediaan += stok;

        if (stok > 0) {
            availableItems++;
        }

        if (stok > 0 && stok <= 2) {
            lowStock++;
        }

        if (stok === 0) {
            outStock++;
        }
    });

    const marginLaba = totalOmzet > 0
        ? (labaKotor / totalOmzet) * 100
        : 0;

    document.getElementById("totalOmzet").textContent =
        "Rp " + totalOmzet.toLocaleString("id-ID");

    document.getElementById("totalTransaksi").textContent =
        detailPenjualan.length;

    document.getElementById("barangTerjual").textContent =
        barangTerjual;

    document.getElementById("totalPersediaan").textContent =
        totalPersediaan;

    document.getElementById("totalHPP").textContent =
        "Rp " + totalHPP.toLocaleString("id-ID");

    document.getElementById("labaKotor").textContent =
        "Rp " + labaKotor.toLocaleString("id-ID");

    document.getElementById("marginLaba").textContent =
        marginLaba.toFixed(1) + "%";

    document.getElementById("totalItems").textContent =
        totalItems;

    document.getElementById("availableItems").textContent =
        availableItems;

    document.getElementById("lowStock").textContent =
        lowStock;

    document.getElementById("outStock").textContent =
        outStock;
}

tampilkanDashboard();